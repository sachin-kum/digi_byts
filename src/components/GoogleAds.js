// import React, { useEffect } from "react";

// const GoogleAds = () => {
//   useEffect(() => {
//     window.adsbygoogle = window.adsbygoogle || [].push({});
//   }, []);
//   return (
//     <>
//       <ins
//         className="adsbygoogle"
//         style={{display:"block",width:"100%"}}
//         data-ad-format="fluid"
//         data-ad-layout-key="-fb+5w+4e-db+86"
//         data-ad-client="ca-pub-5920808639602708"
//         data-ad-slot="7859020867"
//         data-adtest="on"
//       ></ins>
//     </>
//   );
// };

// export default GoogleAds;


import React, { useEffect,useState } from "react"
import $ from "jquery";


const SideAd = () => {
  const [loaded,setLoaded] = useState(false)
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle
        console.log({ adsbygoogle })
        adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }

    let interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.adsbygoogle) {
        pushAd()
        setLoaded(true)
        //   $(document).ready(function () {
        //     $(".swiper").css("height", $(window).height());
        // });
      
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])
  // useEffect(() => {
  //   $(document).ready(function () {
  //     $(".swiper").css("height", $(window).height());
  //   });
  // });


  return (
    <ins
            className="adsbygoogle"
            style={{display:"block",width:"100%",height:"auto"}}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-5920808639602708"
            data-ad-slot="7859020867"
            data-adtest="on"
          ></ins>
  )
}

export default SideAd