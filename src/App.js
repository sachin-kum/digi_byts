import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SwiperComponent from "./components/SwiperComponent";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Bookmark from "./components/Bookmark";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Contact from "./components/Contact";
import UpdateProfile from "./components/UpdateProfile";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Subscribe from "./components/Subscribe";
import LoginAfterForgetPassword from "./components/LogInAfterForgetPassword";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import ViewAllInsights from "./components/ViewAllInsights";
import NotFound from "./components/NotFound"

//CLient config

const firebaseConfig = {
  apiKey: "AIzaSyCtCv-8rMeSJfu7Ks5ne1_owtTKQSudpkE",
  authDomain: "digibyts-a3e37.firebaseapp.com",
  projectId: "digibyts-a3e37",
  storageBucket: "digibyts-a3e37.appspot.com",
  messagingSenderId: "185973347867",
  appId: "1:185973347867:web:0be56933415ebd67e54abe",
  measurementId: "G-4HED4BT8VV",
};
//test config

// const firebaseConfig = {
//   apiKey: "AIzaSyAC7A_Hu6IxTgXUQQKHdwUTd3luEEc5LXs",
//   authDomain: "fir-f25db.firebaseapp.com",
//   projectId: "fir-f25db",
//   storageBucket: "fir-f25db.appspot.com",
//   messagingSenderId: "499435608505",
//   appId: "1:499435608505:web:bbab0ca62e883abe513e68",
//   measurementId: "G-J0V4Z0JFQL"
// };

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// const messaging = getMessaging(app);
// getToken(messaging, {
//   vapidKey:
//     "BEqGoBOYAmtwYZNDQkKnZRJM6wfN0msxVmaFW0NIYIBr7yxBRgLWK50AtL7d3UOFxk1a00mz3ffAF24MJLNWyuQ",
//     // "BLwmVLbKnzSIykp04vfaZC0dp15ykmL5Gyn1s7Z4uBvPPMQJNzB-TAcG97NuO_4sWRRuXo_RL3bne4ifQedgu-g"
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log(currentToken)
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

function App() {
  const [ipCookieP, setIpCookieP] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("returning")) {
      setIpCookieP(true);
    } else {
      localStorage.setItem("returning", "true");
      setIpCookieP(false);
    }
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />
      <Routes>
        <Route
          exact
          path="/"
          element={!ipCookieP ? <Dashboard /> : <SwiperComponent />}
        />
        <Route exact path="/news" element={<SwiperComponent />} />
        <Route exact path="/news/:slug" element={<SwiperComponent />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/bookmark" element={<Bookmark />} />
        <Route exact path="/bookmark/:slug" element={<Bookmark />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/updateProfile" element={<UpdateProfile />} />
        <Route exact path="/subscribe" element={<Subscribe />} />
        <Route exact path="/home" element={<Dashboard />} />
        <Route exact path="/viewallinsights" element={<ViewAllInsights />} />
        <Route
          exact
          path="/loginafterforgetpassword"
          element={<LoginAfterForgetPassword />}
        />
        <Route path="/*"  element={<NotFound/>}    />
      </Routes>
    </>
  );
}

export default App;
