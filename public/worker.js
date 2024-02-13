var PrecacheConfig = [];
var CacheNamePrefix =
  "sw-precache-v1--" + (self.registration ? self.registration.scope : "") + "-";
var IgnoreUrlParametersMatching = [/^utm_/];
var addDirectoryIndex = function (originalUrl, index) {
  var url = new URL(originalUrl);
  if (url.pathname.slice(-1) === "/") {
    url.pathname += index;
  }
  return url.toString();
};

var getCacheBustedUrl = function (url, param) {
  param = param || Date.now();

  var urlWithCacheBusting = new URL(url);
  urlWithCacheBusting.search +=
    (urlWithCacheBusting.search ? "&" : "") + "sw-precache=" + param;

  return urlWithCacheBusting.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
  if (whitelist.length === 0) {
    return true;
  }

  var path = new URL(absoluteUrlString).pathname;
  return whitelist.some(function (whitelistedPathRegex) {
    return path.match(whitelistedPathRegex);
  });
};

var populateCurrentCacheNames = function (
  precacheConfig,
  cacheNamePrefix,
  baseUrl
) {
  var absoluteUrlToCacheName = {};
  var currentCacheNamesToAbsoluteUrl = {};

  precacheConfig.forEach(function (cacheOption) {
    var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
    var cacheName = cacheNamePrefix + absoluteUrl + "-" + cacheOption[1];
    currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
    absoluteUrlToCacheName[absoluteUrl] = cacheName;
  });

  return {
    absoluteUrlToCacheName: absoluteUrlToCacheName,
    currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl,
  };
};

var stripIgnoredUrlParameters = function (
  originalUrl,
  ignoreUrlParametersMatching
) {
  var url = new URL(originalUrl);

  url.search = url.search
    .slice(1)
    .split("&")
    .map(function (kv) {
      return kv.split("=");
    })
    .filter(function (kv) {
      return ignoreUrlParametersMatching.every(function (ignoredRegex) {
        return !ignoredRegex.test(kv[0]);
      });
    })
    .map(function (kv) {
      return kv.join("=");
    })
    .join("&");

  return url.toString();
};

var mappings = populateCurrentCacheNames(
  PrecacheConfig,
  CacheNamePrefix,
  self.location
);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames.map(function (cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    Promise.all(
      Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function (cacheName) {
        return caches.open(cacheName).then(function (cache) {
          return cache.keys().then(function (keys) {
            if (keys.length === 0) {
              var cacheBustParam = cacheName.split("-").pop();
              var urlWithCacheBusting = getCacheBustedUrl(
                CurrentCacheNamesToAbsoluteUrl[cacheName],
                cacheBustParam
              );

              var request = new Request(urlWithCacheBusting, {
                credentials: "same-origin",
              });
              return fetch(request).then(function (response) {
                if (response.ok) {
                  return cache.put(
                    CurrentCacheNamesToAbsoluteUrl[cacheName],
                    response
                  );
                }

                console.error(
                  "Request for %s returned a response status %d, " +
                    "so not attempting to cache it.",
                  urlWithCacheBusting,
                  response.status
                );
                return caches.delete(cacheName);
              });
            }
          });
        });
      })
    )
      .then(function () {
        return caches.keys().then(function (allCacheNames) {
          return Promise.all(
            allCacheNames
              .filter(function (cacheName) {
                return (
                  cacheName.indexOf(CacheNamePrefix) === 0 &&
                  !(cacheName in CurrentCacheNamesToAbsoluteUrl)
                );
              })
              .map(function (cacheName) {
                return caches.delete(cacheName);
              })
          );
        });
      })
      .then(function () {
        if (typeof self.skipWaiting === "function") {
          self.skipWaiting();
        }
      })
  );
});

if (self.clients && typeof self.clients.claim === "function") {
  self.addEventListener("activate", function (event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener("message", function (event) {
  if (event.data.command === "delete_all") {
    console.log("About to delete all caches...");
    deleteAllCaches()
      .then(function () {
        console.log("Caches deleted.");
        event.ports[0].postMessage({
          error: null,
        });
      })
      .catch(function (error) {
        console.log("Caches not deleted:", error);
        event.ports[0].postMessage({
          error: error,
        });
      });
  }
});

self.addEventListener("fetch", function (event) {
  if (event.request.method === "GET") {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(
      event.request.url,
      IgnoreUrlParametersMatching
    );

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = "index.html";
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(
        urlWithoutIgnoredParameters,
        directoryIndex
      );
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = "/index.html";
    if (
      !cacheName &&
      navigateFallback &&
      event.request.headers.has("accept") &&
      event.request.headers.get("accept").includes("text/html") &&
      isPathWhitelisted([], event.request.url)
    ) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        caches
          .open(cacheName)
          .then(function (cache) {
            return cache.keys().then(function (keys) {
              return cache.match(keys[0]).then(function (response) {
                if (response) {
                  return response;
                }
                throw Error("The cache " + cacheName + " is empty.");
              });
            });
          })
          .catch(function (e) {
            console.warn(
              'Couldn\'t serve response for "%s" from cache: %O',
              event.request.url,
              e
            );
            return fetch(event.request);
          })
      );
    }
  }
});
