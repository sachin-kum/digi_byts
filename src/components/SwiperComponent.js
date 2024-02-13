import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
// import AdSense from "react-adsense";
import {
  top_user_setting,
  top_uer_icon,
  share_icon,
  setupTests,
  menu_icon,
  logoutIcon,
  bookmarked,
  news_icon,
  stories_icon,
  bookmark,
  bellIcon,
  logo,
} from "../images";

import vk from "../assets/images/1.jpg";
import vk2 from "../assets/images/2.jpg";
import vk3 from "../assets/images/3.jpg";
import vk4 from "../assets/images/4.jpg";
import vk5 from "../assets/images/6.jpg";
import { toast } from "react-toastify";
import $ from "jquery";
import Loader from "./Loader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Rating } from "react-simple-star-rating";
import InstallPWA from "./InstallPWA";
import Subscribe from "./Subscribe";
import Share from "./Share";
import ShareApp from "./ShareApp";
import GoogleAds from "./GoogleAds";

function SwiperComponent({ ogData }) {
  const navigate = useNavigate();
  let { slug } = useParams();
  const [slidebardata, setSiderBarData] = useState();
  const [swiperData, setSwiperData] = useState();
  const [book_mark_data, setbook_mark_data] = useState();
  const [book_mark_id, setbook_mark_id] = useState();
  const [showShare, setShowShare] = useState(false);
  const [term_id, setTerm_id] = useState(0);
  const [dybts, setDybts] = useState();
  const [activeSwiperData, setActiveSwiperData] = useState();
  const [activeSwiper, setActiveSwiper] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [toggleId, setToggleId] = useState("");
  const [loader, setloader] = useState(true);
  const [setting, setSetting] = useState(false);
  const [category, setCategory] = useState("All News");
  const [rating, setRating] = useState();
  const [notificationn, setNotificationn] = useState();
  const [count, setCount] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const notfiy = localStorage.getItem("notification");
  const [notificationData, setNotificationData] = useState(notfiy);
  const userid = localStorage.getItem("user_id");
  const username = localStorage.getItem("user_name");
  const [show, setShow] = useState(false);
  const [showSlider, setshowSlider] = useState(false);
  const [positionVar, setPositionVar] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef();
  const headingRef = useRef();
  const descRef = useRef();

  const [currentOgDescription, setCurrentOgDescription] = useState();
  const ApiUrl = "https://news.digibyts.com/api";
  useEffect(() => {
    $(document).ready(function () {
      $(".swiper").css("height", $(window).height());
    });
  });

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (notificationn?.data?.length > 0) {
      setCount(true);
    }
  }, [notificationn]);

  useEffect(() => {
    showNotification();
  }, []);

  useEffect(() => {
    setNotificationData(notfiy);
  }, [notfiy]);

  useEffect(() => {
    for (var i = 0; i < swiperData?.length; i++) {
      setActiveSwiperData(swiperData[activeSwiper]);
      setToggle(false);
      $(".mobile_humbargur_manu").removeClass("topmenu_hover");
      $(".bookmark_section").removeClass("bookmark_share");
    }
  }, [activeSwiper]);

  useEffect(() => {
    for (var i = 0; i < swiperData?.length; i++) {
      setActiveSwiperData(swiperData?.[0]);
    }

    if (swiperData?.length > 0) {
      setloader(false);
    }
  }, [swiperData]);

  useEffect(() => {
    navigate(
      `/news/${
        activeSwiperData?.["slug"] == undefined
          ? ""
          : activeSwiperData?.["slug"]
      }`
    );
    let topStories = new FormData();
    topStories.append("method", "top_story");
    topStories.append("post_id", activeSwiperData?.["id"]);
    axios.post(ApiUrl, topStories).then((res) => {});
  }, [activeSwiperData]);

  useEffect(() => {
    if (book_mark_data?.status == "success") {
      toast.success(book_mark_data?.msg);
    }
  }, [book_mark_data]);

  useEffect(() => {
    axios.get(`${ApiUrl}/?method=get_topic`).then((res) => {
      setSiderBarData(res?.data?.data);
    });

    axios.get(`${ApiUrl}/?method=get_dybts_test`).then((res) => {
      setDybts(res?.data);
    });
  }, []);
  const getAll = () => {
    let formdata = new FormData();
    formdata.append("method", "api");
    formdata.append("paged", 0);
    formdata.append("term_id", 0);

    {
      slug && formdata.append("slug", slug);
    }

    {
      userid == null
        ? formdata.append("user_id", "")
        : formdata.append("user_id", userid);
    }
    axios.post(ApiUrl, formdata).then((res) => {
      setSwiperData(res?.data?.data);
    });
  };

  const showShare2 = () => {
    if (positionVar) {
      setPositionVar(!positionVar);
    } else {
      setPositionVar(!positionVar);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const slideNext = () => {
    $(".swiper-button-next").click();
  };

  const logout = () => {
    localStorage.clear();
    $(".close").click();
    toast.success("Logout successfully");
    navigate("/");
  };

  const bookMark = (id) => {
    setbook_mark_id(id);
    if (userid == null) {
      navigate("/login");
    } else {
      let bookData = new FormData();
      bookData.append("user_id", userid);
      bookData.append("post_id", id);
      bookData.append("method", "bookmark");
      axios.post(ApiUrl, bookData).then((res) => {
        setbook_mark_data(res?.data);
      });
    }
    getAll();
  };

  const showToggle = (id, status) => {
    setToggleId(id);
    setToggle(status);
  };

  useEffect(() => {
    if (toggle === true) {
      $(".mobile_humbargur_manu").addClass("topmenu_hover");
      $(".bookmark_section").addClass("bookmark_share");
    } else {
      $(".mobile_humbargur_manu").removeClass("topmenu_hover");
      $(".bookmark_section").removeClass("bookmark_share");
    }
  }, [toggle, toggleId]);

  useEffect(() => {
    let rating = new FormData();
    rating.append("method", "rate_get");
    rating.append("user_id", userid);

    axios.post(ApiUrl, rating).then((res) => {
      {
        res?.data?.data?.rating && setRating(res?.data?.data?.rating);
      }
    });
  }, []);

  const filerData = (id) => {
    $(".swiper-button-prev").click();
    localStorage.setItem("term_id", id);
    setTerm_id(id);
    let formdata = new FormData();
    formdata.append("method", "api");
    formdata.append("paged", 0);
    formdata.append("term_id", id);
    {
      slug && formdata.append("slug", slug);
    }
    {
      userid == null
        ? formdata.append("user_id", "")
        : formdata.append("user_id", userid);
    }

    axios.post(ApiUrl, formdata).then((res) => {
      setSwiperData(res?.data?.data);
    });
  };

  const allNews = () => {
    setCategory("All News");
    localStorage.removeItem("term_id");

    $(".swiper-button-prev").click();
    let formdata = new FormData();
    formdata.append("method", "api");
    formdata.append("paged", 0);
    formdata.append("term_id", 0);
    {
      slug && formdata.append("slug", slug);
    }
    {
      userid == null
        ? formdata.append("user_id", "")
        : formdata.append("user_id", userid);
    }
    axios.post(ApiUrl, formdata).then((res) => {
      setSwiperData(res?.data?.data);
    });
  };

  const topStories = () => {
    setCategory("Top  Stories");

    $(".swiper-button-prev").click();
    let storydata = new FormData();
    storydata.append("method", "get_top_story");
    axios.post(ApiUrl, storydata).then((res) => {
      setSwiperData(res?.data?.data);
    });
  };

  const SignupSchemaRating = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().required("Message is required"),
  });
  const isLogIn = (type) => {
    if (type === "rate") {
      $("#ratingClick").click();
    } else if (type === "feedback") {
      $("#feedbackClick").click();
    }
  };
  const handleRating = (rate) => {
    setRating(rate / 20);
    let rating = new FormData();
    rating.append("method", "rate");
    rating.append("rating", rate / 20);
    rating.append("user_email", rate?.email);

    axios.post(ApiUrl, rating).then((res) => {
      if (res?.data) {
        toast.success(res?.data?.msg);
        $("#close_modal").click();
      }
    });
  };
  const feedbackSubmit = (values) => {
    let feedback = new FormData();
    feedback.append("method", "feedback");
    feedback.append("user_email", values?.email);
    feedback.append("comment", values?.message);

    axios.post(ApiUrl, feedback).then((res) => {
      if (res?.data?.status === "success") {
        toast.success(res?.data?.msg);
        $("#close_modal2").click();
      }
    });
  };
  const notification = (e) => {
    var toggle;
    if (e.target.checked === false) {
      setNotificationData("off");
      localStorage.setItem("notification", "off");
      toggle = 0;
    } else {
      setNotificationData("on");
      localStorage.setItem("notification", "on");
      toggle = 1;
    }

    let notificationData = new FormData();

    notificationData.append("method", "send_notofication");
    notificationData.append("toggle_val", toggle);
    notificationData.append("user_id", userid);

    axios.post(ApiUrl, notificationData).then((res) => {
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
      }
    });
  };

  const urlPath = (slugVal, post_id) => {
    $(".closeBtn").click();
    navigate(`/news/${slugVal}`);
    const id = localStorage.getItem("term_id");
    let formdata = new FormData();
    formdata.append("method", "api");
    formdata.append("paged", 0);
    {
      slugVal && formdata.append("slug", slugVal);
    }
    {
      userid == null
        ? formdata.append("user_id", "")
        : formdata.append("user_id", userid);
    }
    axios.post(ApiUrl, formdata).then((res) => {
      setSwiperData(res?.data?.data);
    });

    let readData = new FormData();
    readData.append("method", "push_notification");
    readData.append("post_id", post_id);
    readData.append("push_notification", "read");

    axios.post(ApiUrl, readData).then((response) => {});
  };

  const showNotification = () => {
    const data = new FormData();
    data.append("method", "get_notification_data");
    data.append("user_id", userid);

    axios.post(ApiUrl, data).then((res) => {
      setNotificationn(res.data);
      setNotificationCount(notificationn?.count);
    });
    if (notificationn?.status === "Failed") {
      toast.error(notificationn?.msg);
    }
  };
  const closeShareBookmarkTab = () => {
    if (positionVar) {
      setPositionVar(!positionVar);
    }
  };

  const [open, setOpen] = useState();
  const notificationClose = () => {
    setOpen(false);
  };
  // {  console.log("vimal",urlGetImages)}

  const swipersidebar = (
    <>
      <div
        className="mr-auto pl-md-0 px-0 sliderBarSection"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <Helmet>
          <meta http-equiv="cache-control" content="no-cache" />
          <meta http-equiv="expires" content="0" />
          <meta http-equiv="pragma" content="no-cache" />
          <meta property="og:title" content="Digibyts" />

          <meta property="og:url" content="https://digibyts.com" />
          <meta property="og:locale" content="en_GB" />
          <meta
            property="og:description"
            content="The internet is getting rebooted, where are you? Keep up with OGs of Web3 as we bring you the latest news on Cryptos, NFTs, Blockchain, AR/VR and Metaverse. At Digibyts, we deliver you the latest news on Web3."
          />

          <meta property="og:type" content="article" />

          <meta
            id="og-image"
            property="og:image"
            content="https://digibyts.com/images/logo.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="The internet is getting rebooted, where are you? Keep up with OGs of Web3 as we bring you the latest news on Cryptos, NFTs, Blockchain, AR/VR and Metaverse. At Digibyts, we deliver you the latest news on Web3."
          />
          <meta name="twitter:title" content="Digibyts" />
          <meta name="twitter:site" content="@Digibyts" />
          <meta
            name="twitter:image"
            content="https://digibyts.com/images/logo.png"
          />
          <meta name="twitter:creator" content="@Digibyts" />

          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
        </Helmet>
        {!setting && (
          <div className="overflow">
            <div
              className="modal-content d-md-none "
              style={{
                width: "100%",
                height: "auto",
                display: open ? "block" : "none",
                position: "absolute",
                top: "0",
                zIndex: "10",
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#8946c9",
                  color: "#fff",
                }}
              >
                <h1 className="modal-title m-auto w-100" id="exampleModalLabel">
                  Notification
                </h1>
                <button
                  type="button"
                  className="close mt-1 mr-1 text-white closeBtn"
                  onClick={notificationClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {notificationn?.data?.map((data) => {
                return (
                  <div
                    className="modal-body text-left p-0 cursor"
                    onClick={() => {
                      urlPath(data?.slug, data?.id);
                      filerData(data.id);
                    }}
                    key={data?.id}
                  >
                    <div className="media pt-3 pl-4 pb-0">
                      <img
                        src={data?.image}
                        alt="John Doe"
                        className="mr-3 rounded-squre"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                      <div className="media-body">
                        <h5>New Post</h5>
                        <p className="m-0 pr-1">
                          {data?.heading.slice(0, 40)}...
                        </p>
                      </div>
                    </div>

                    <hr className="mb-0" />
                  </div>
                );
              })}
            </div>

            <div className="top_Sec">
              {username != null ? (
                <div className="menu-first">
                  <span>Hello, {username}</span>
                </div>
              ) : (
                <div
                  className="menu-first cursor"
                  onClick={() => navigate("/home")}
                >
                  <img src={logo} alt="logo" className=" logo_white" />
                </div>
              )}

              {userid && (
                <div className="Hearder_Section_Img ml-auto cursor">
                  <span>{notificationCount}</span>
                  <img
                    src={bellIcon}
                    alt="Bell Icon"
                    className="bellIcon ml-auto "
                    data-toggle="modal"
                    data-target="#myModal1"
                    onClick={() => {
                      userid == null ? navigate("/login") : showNotification();
                      setOpen(true);
                    }}
                  />
                </div>
              )}
              <div className="menu-secound">
                <InstallPWA />
                <img
                  alt="Setting"
                  src={top_user_setting}
                  className="cursor"
                  onClick={() => setSetting(!setting)}
                />

                {userid != null ? (
                  <img
                    src={logoutIcon}
                    style={{ marginLeft: "10px" }}
                    alt="logout"
                    className="cursor"
                    data-toggle="modal"
                    data-target="#myModal"
                  />
                ) : (
                  <Link to={"/login"}>
                    <img src={top_uer_icon} alt="login" className="cursor" />
                  </Link>
                )}
              </div>
            </div>
            <div className="news-section mt-3">
              <div className="row justify-content-between ml-md-0 mx-0">
                <div className="col-lg-3 col-md-3 col-3 px-0">
                  {count && (
                    <div
                      className="modal fade"
                      id="myModal1"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" style={{ margin: "unset" }}>
                        <div className="Modal_Section ">
                          <div
                            className="modal-content "
                            style={{
                              maxWidth: "330px",
                              width: "100%",
                              height: "auto",
                            }}
                          >
                            <div
                              className="modal-header"
                              style={{
                                backgroundColor: "#8946c9",
                                color: "#fff",
                              }}
                            >
                              <h1
                                className="modal-title m-auto w-100"
                                id="exampleModalLabel"
                              >
                                Notification
                              </h1>
                              <button
                                type="button"
                                className="close mt-1 mr-1 text-white closeBtn"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            {notificationn?.data?.map((data) => {
                              return (
                                <div
                                  className="modal-body text-left p-0 cursor"
                                  onClick={() => {
                                    urlPath(data?.slug, data?.id);
                                    filerData(data.id);
                                  }}
                                  key={data.id}
                                >
                                  <div className="media pt-3 pl-4 pb-0">
                                    <img
                                      src={data?.image}
                                      alt="John Doe"
                                      className="mr-3 rounded-squre"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                      }}
                                    />
                                    <div className="media-body">
                                      <h5>New Post</h5>
                                      <p className="m-0 pr-1">
                                        {data?.heading.slice(0, 40)}...
                                      </p>
                                    </div>
                                  </div>

                                  <hr className="mb-0" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <figure onClick={() => allNews()} className="mb-0">
                    <img src={news_icon} alt="All News" className="cursor" />
                    <figcaption>All News</figcaption>
                  </figure>
                </div>
                <div className="col-lg-3 col-md-4 col-3 px-0 pl-md-4 pl-lg-0">
                  <figure onClick={() => topStories()} className="mb-0">
                    <img
                      src={stories_icon}
                      alt="Top Stories"
                      className="cursor"
                    />
                    <figcaption>Top Stories</figcaption>
                  </figure>
                </div>
                <div className="col-lg-3 col-md-4 col-3 px-0 pl-md-4 pl-lg-0">
                  <figure
                    onClick={() => navigate("/bookmark")}
                    className="mb-0"
                  >
                    <img src={bookmark} alt="BookMark" className="cursor" />
                    <figcaption>BookMark</figcaption>
                  </figure>
                </div>
              </div>

              <hr className="hr_border" />
            </div>
            <div className="topics_section">
              <h2>Topics</h2>
              <hr className="Topics_hr" />

              <div className="row mt-4 pt-1 border-bottom pb-4">
                {slidebardata &&
                  slidebardata.map((data, index) => {
                    return (
                      <div className="col-lg-4 col-4 col-md-4 my-2" key={index}>
                        <div className="Topics_img">
                          <img
                            alt="topics"
                            src={data.image}
                            className="cursor img-fluid"
                            onClick={() => filerData(data.term_id)}
                          />
                          <h5 className="card-title text-center">
                            {data.name}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        {setting && (
          <div
            className="setting_section"
            onLoad={() => {
              setLoaded(true);
            }}
          >
            <div className="top_Sec">
              <div className="menu-first w-100">
                <span
                  className="cursor d-flex justify-content-between w-100 align-items-center"
                  onClick={() => setSetting(!setting)}
                >
                  <img
                    alt="Back"
                    src="https://img.icons8.com/fluency-systems-filled/24/ffffff/chevron-left--v2.png"
                  />
                  <div>Settings</div>
                  <div></div>
                </span>
              </div>
            </div>
            <div className="setting_menu_sec">
              <div className="setting_menu">
                <div className="setting_menu_options ">
                  <span className="notification_bell">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                  </span>
                  <div className="opt_bg_color2">
                    <span className="nottfication_text">Notifications</span>
                    <label className="switch">
                      {userid ? (
                        <input
                          type="checkbox"
                          onChange={(e) => notification(e)}
                          checked={notificationData == "off" ? false : true}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          onClick={() => navigate("/login")}
                        />
                      )}
                      <span className="switch_toggle round"></span>
                    </label>
                  </div>
                </div>
                <ShareApp />
                <div className="setting_menu_options opt_bg_color">
                  <span
                    className="nottfication_text cursor"
                    onClick={() => isLogIn("rate")}
                  >
                    Rate this app
                  </span>
                </div>
                <input
                  type={"hidden"}
                  id="ratingClick"
                  data-toggle="modal"
                  data-target="#ratingApp"
                />
                <div className="setting_menu_options opt_bg_color">
                  <span
                    className="nottfication_text cursor"
                    id="feedback"
                    onClick={() => isLogIn("feedback")}
                  >
                    Feedback
                  </span>
                </div>
                <input
                  type={"hidden"}
                  id="feedbackClick"
                  data-toggle="modal"
                  data-target="#feedbackApp"
                />
                <div className="setting_menu_options opt_bg_color">
                  <span
                    onClick={() => navigate("/privacy")}
                    className="nottfication_text cursor"
                  >
                    Privacy
                  </span>
                </div>
                <div className="setting_menu_options opt_bg_color">
                  <span
                    onClick={() => navigate("/terms")}
                    className="nottfication_text cursor"
                  >
                    Terms And Conditions
                  </span>
                </div>
                <div className="setting_menu_options opt_bg_color">
                  <span
                    onClick={() => navigate("/home")}
                    className="nottfication_text cursor"
                  >
                    Home
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {loader && <Loader />}

      {!showSlider && (
        <>
          <Swiper
            className="mySwiper swiper-h desktop_view h-100"
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide className="w-100">
              {swipersidebar}
              <Swiper
                className="mySwiper2 swiper-v auto-height"
                style={{ height: "auto !important" }}
                // height="500px"

                // onAfterInit={()=>alert("awdjawdhuagdwuagu")}

                direction={"vertical"}
                spaceBetween={0}
                slidesPerView={1}
                mousewheel={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                onSlideChange={(e) => setActiveSwiper(e.activeIndex)}
                onRealIndexChange={(v) => {
                  closeShareBookmarkTab();
                }}
                lazy={true}
              >
                <div id="sharemodel" className="modal fade">
                  <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-md-12"></div>
                        <div className="share_dataaa pt-3 w-100">
                          <div className="row mx-0 align-items-center w-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {swiperData &&
                  swiperData.map((res, index) => {
                    return (
                      <SwiperSlide
                        className="mr-auto ml-auto full-height "
                        key={index}
                        style={{ height: "100vh" }}
                      >
                        <div className="swiper_tab">
                          <div className="Humbargur_Menu">
                            <div className="Humbargur-left">
                              <img src={menu_icon} alt="Menu" />
                            </div>
                            <span
                              className="pl-3"
                              style={{ marginRight: "auto" }}
                            >
                              All News
                            </span>

                            <div
                              className="Humbargur-right"
                              onClick={refreshPage}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-rotate-cw"
                              >
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                              </svg>
                            </div>
                          </div>

                          <div className="Heading desktop_view d-flex justify-content-between d-block">
                            <h1>{res.category}</h1>
                          </div>

                          <div className="cardy border-0 Main_Div ">
                            <div className="overflox-scrl" onClick={showShare2}>
                              <div
                                className="main_logo "
                                style={{
                                  position: "relative",
                                  padding: "15px 15px 0 15px",
                                }}
                              >
                                {res?.image && (
                                  <img
                                    className="card-img-top swiperAllTabs"
                                    id={`imageurl${index}`}
                                    src={res?.image}
                                    alt="Card image cap"
                                    ref={imageRef}
                                  />
                                )}
                                {res?.video && (
                                  <video
                                    className="swiperVideo"
                                    height="100%"
                                    controls
                                    autoPlay={"false"}
                                  >
                                    <source src={res?.video} type="video/mp4" />
                                  </video>
                                )}
                                {res?.audio && (
                                  <audio controls className="swiperAudio">
                                    <source src={res?.audio} type="audio/ogg" />
                                  </audio>
                                )}
                                <div
                                  className="cursor all_card_logo"
                                  onClick={() => navigate("/home")}
                                >
                                  <img src={logo} alt="logo" />
                                </div>
                              </div>
                              <div className="card-body">
                                <h4
                                  className="card-title Deplaforming"
                                  id={`heading${index}`}
                                  ref={headingRef}
                                >
                                  {res.heading}
                                </h4>
                                <p
                                  className="card-text"
                                  ref={descRef}
                                  id={`description${index}`}
                                >
                                  {res?.desc}
                                </p>
                                <span
                                  href={res?.creadit_link_slug}
                                  className="text-decoration-none"
                                >
                                  <h6 className="swipe-text">
                                    tap for more at:
                                    <a
                                      href={res?.creadit_link_slug}
                                      target="_blank"
                                    >
                                      {res?.creadit_link}
                                    </a>
                                  </h6>
                                </span>
                              </div>

                              <div className=" tab_swiper_bottom_sec">
                                <div
                                  className="bottom_Sec "
                                  style={
                                    res.absense_status == true
                                      ? {
                                          maxHeight: "120px",
                                          height: "auto",
                                          backgroundColor: "white",
                                        }
                                      : {
                                          height: "75px",
                                          backgroundColor: "#8946c9",
                                        }
                                  }
                                >
                                  {res?.absense_status != true ? (
                                    <div className="d-flex align-items-center justify-content-around w-100">
                                      <div className="col-7 col-md-7 col-lg-8 pr-0">
                                        <p className="text-left padding_5px">
                                          Subscribe for our newsletter and get
                                          your FREE “Metaverse Made Simple”
                                          eBook
                                        </p>
                                      </div>
                                      <div className="col-5 col-md-5 col-lg-4 subscribe_btn_right pl-md-0">
                                        <Popup
                                          trigger={
                                            <span className="subscribe_btn">
                                              Subscribe NOW!
                                            </span>
                                          }
                                          position="right center"
                                        >
                                          {(close) => (
                                            <Subscribe onClick={close} />
                                          )}
                                        </Popup>
                                      </div>
                                    </div>
                                  ) : (
                                    <GoogleAds />
                                  )}
                                </div>
                              </div>
                              <div
                                className=" share_bottom_section py-3"
                                style={{ bottom: positionVar ? 0 : `-200px` }}
                              >
                                <div className="row justify-content-around pb-3 pb-md-0 pt-2 bookmark-share ">
                                  <div className="col-6 ">
                                    <div className="share_section_1 cursor w-100 text-center">
                                      <Share
                                        label={<img src={share_icon} alt="" />}
                                        imageUrl={res?.image}
                                        title="My Web Share Adventuressss"
                                        url={window.location.href}
                                        text={res.heading}
                                      />
                                      <span className="text-center">Share</span>
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="share_section_2">
                                      {res?.bookmark == "true" ? (
                                        <img
                                          src={bookmarked}
                                          alt="BookMarked"
                                          className="cursor"
                                          onClick={() => bookMark(res?.id)}
                                        />
                                      ) : (
                                        <img
                                          src={setupTests}
                                          alt="BookMark"
                                          className="cursor"
                                          onClick={() => bookMark(res?.id)}
                                        />
                                      )}
                                      <span>BookMark</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </SwiperSlide>
          </Swiper>

          <Swiper
            dir="rtl"
            className="mySwiper swiper-h mobile_view"
            spaceBetween={0}
            navigation
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
          >
            <SwiperSlide>
              <Swiper
                className="mySwiper2 swiper-v  "
                direction={"vertical"}
                spaceBetween={0}
                slidesPerView={1}
                mousewheel={true}
                navigation
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Mousewheel, Pagination]}
                onSlideChange={(e) => setActiveSwiper(e.activeIndex)}
              >
                <div
                  id="sharemodelMobile"
                  className="modal fade"
                  style={{ direction: "ltr" }}
                >
                  <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-md-12"></div>
                        <div className="share_dataaa pt-3 w-100">
                          <div className="row mx-0 align-items-center w-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {swiperData?.map((res, index) => {
                  return (
                    <SwiperSlide
                      className="mr-auto ml-auto"
                      onClick={() => showToggle(res?.id, !toggle)}
                      key={index}
                    >
                      <div
                        className="swiper_tab"
                        style={{
                          direction: "ltr",
                          // maxWidth: "600px",
                          width: "100%",
                        }}
                      >
                        {toggleId == res?.id && (
                          <div className="Humbargur_Menu mobileView mobile_humbargur_manu">
                            <div className="Humbargur-left">
                              <img
                                src={menu_icon}
                                alt="Menu"
                                onClick={() => slideNext()}
                              />
                            </div>
                            <span
                              className="pl-3"
                              style={{ marginRight: "auto" }}
                            >
                              All News
                            </span>

                            <div
                              className="Humbargur-right"
                              onClick={refreshPage}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-rotate-cw"
                              >
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                              </svg>
                            </div>
                          </div>
                        )}

                        <div className="Heading desktop_view d-flex justify-content-between d-block ">
                          <h1>{res.category}</h1>
                        </div>
                        <div className="cardy border-0 Main_Div hyuop">
                          <div className="overflox-scrl">
                            <div
                              className="main_logo "
                              style={{
                                position: "relative",
                                padding: "15px 15px 0 15px",
                              }}
                            >
                              {res?.image && (
                                <img
                                  className="card-img-top swiperAllTabs"
                                  src={res?.image}
                                  alt="Card image cap"
                                />
                              )}
                              {res?.video && (
                                <video
                                  className="swiperVideo"
                                  height="100%"
                                  controls
                                  autoPlay={"false"}
                                >
                                  <source src={res?.video} type="video/mp4" />
                                </video>
                              )}
                              {res?.audio && (
                                <audio controls className="swiperAudio">
                                  <source src={res?.audio} type="audio/ogg" />
                                </audio>
                              )}
                              <div
                                className="cursor all_card_logo"
                                onClick={() => navigate("/home")}
                              >
                                <img src={logo} alt="logo" />
                              </div>
                            </div>
                            <div className="card-body">
                              <h4 className="card-title Deplaforming ">
                                {res.heading}
                              </h4>
                              <p className="card-text">{res?.desc}</p>

                              <span
                                href={res?.creadit_link_slug}
                                className="text-decoration-none"
                              >
                                <h6 className="swipe-text">
                                  tap for more at:
                                  <a
                                    href={res?.creadit_link_slug}
                                    target="_blank"
                                  >
                                    {res?.creadit_link}
                                  </a>
                                </h6>
                              </span>
                            </div>

                            {toggleId == res?.id && (
                              <div className="row justify-content-around pb-4 mobileView bookmark_section bookmark-share m-0">
                                <div className="col-6">
                                  <div className="share_section_1 w-100 text-center border-none">
                                    <Share
                                      label={
                                        <img
                                          src={share_icon}
                                          alt="share_icon"
                                        />
                                      }
                                      imageUrl={res?.image}
                                      title="My Web Share Adventuresss"
                                      url={window.location.href}
                                      text={res.heading}
                                    />
                                    <span className="text-center">Share</span>
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="share_section_2">
                                    {res?.bookmark == "true" ? (
                                      <img
                                        src={bookmarked}
                                        alt="BookMarked"
                                        className="cursor"
                                        onClick={() => bookMark(res?.id)}
                                      />
                                    ) : (
                                      <img
                                        src={setupTests}
                                        alt="BookMark"
                                        className="cursor"
                                        onClick={() => bookMark(res?.id)}
                                      />
                                    )}
                                    <span>BookMark</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div
                              className="bottom_Sec d-flex justify-content-center w-100"
                              style={
                                res.absense_status == true
                                  ? { height: "auto", backgroundColor: "white" }
                                  : {
                                      height: "75px",
                                      backgroundColor: "#8946c9",
                                    }
                              }
                            >
                              {res?.absense_status != true ? (
                                <div className="row align-items-center justify-content-around w-100">
                                  <div className="col-7 col-md-7">
                                    <p className="text-left">
                                      Subscribe for our newsletter and get your
                                      FREE “Metaverse Made Simple” eBook
                                    </p>
                                  </div>
                                  <div className="col-5 col-md-5 col-lg-4 subscribe_btn_right pl-md-0">
                                    <Popup
                                      trigger={
                                        <span className="subscribe_btn">
                                          Subscribe NOW!
                                        </span>
                                      }
                                      position="left center"
                                    >
                                      {(close) => <Subscribe onClick={close} />}
                                    </Popup>
                                  </div>
                                </div>
                              ) : (
                                <GoogleAds />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Modal title
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary my-2"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary my-2"
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </SwiperSlide>
            <SwiperSlide style={{ direction: "ltr" }}>
              {" "}
              {swipersidebar}
            </SwiperSlide>
          </Swiper>
          <div className="model_poppup">
            <div id="myModal" className="modal fade">
              <div className="modal-dialog modal-confirm modalTop">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Are you sure?</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Do you really want to log Out.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-info modal_btn_cancal my-2"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="modal_btn my-2"
                      onClick={() => logout()}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="shareApp" className="modal fade">
            <div className="modal-dialog modal-confirm modalTop">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="share_dataaa pt-3 w-100">
                    <div className="row mx-0 align-items-center w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="ratingApp" className="modal fade">
            <div className="modal-dialog modal-confirm modalTop">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title mb-3">
                    You can share your review as rating
                  </h4>
                </div>

                <div className="modal-body">
                  <div>
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={SignupSchemaRating}
                      onSubmit={(values) => handleRating(values)}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <Field
                            name="email"
                            placeholder="Please Enter Your Email Address.."
                            className="w-100 p-2 modal_email"
                          />
                          <br />
                          {errors.email && touched.email ? (
                            <div className="text-danger text-left">
                              {errors.email}
                            </div>
                          ) : null}
                          <br />
                          <Rating initialValue={rating} />
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-info modal_btn_cancal my-2"
                              data-dismiss="modal"
                              id="close_modal2"
                            >
                              Cancel
                            </button>
                            <button type="submit" className="modal_btn my-2">
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <input type={"hidden"} id="close_modal" data-dismiss="modal" />
              </div>
            </div>
          </div>

          <div id="feedbackApp" className="modal fade">
            <div className="modal-dialog modal-confirm modalTop">
              <div className="modal-content">
                <div className="modal-header mb-3">
                  <h4 className="modal-title">You can share your feedback</h4>
                </div>
                <div className="mt-5">
                  <Formik
                    initialValues={{
                      message: "",
                      email: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => feedbackSubmit(values)}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <Field
                          name="email"
                          placeholder="Please Enter Your Email Address.."
                          className="w-100 p-2"
                        />
                        <br />
                        {errors.email && touched.email ? (
                          <div className="text-danger text-left">
                            {errors.email}
                          </div>
                        ) : null}
                        <br />
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Message"
                          className="w-100 p-2"
                        />
                        {errors.message && touched.message ? (
                          <div className="text-danger text-left">
                            {errors.message}
                          </div>
                        ) : null}
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-info modal_btn_cancal my-2"
                            data-dismiss="modal"
                            id="close_modal2"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="modal_btn my-2">
                            Submit
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showSlider && (
        <div>
          <span
            style={{
              position: "fixed",
              top: "1px",
              right: "5px",
              cursor: "pointer",
              zIndex: 999,
            }}
            onClick={() => setshowSlider(false)}
          >
            <i
              className="fa fa-times-circle-o"
              aria-hidden="true"
              style={{ color: "#fff", fontSize: "50px" }}
            ></i>
          </span>
          <Swiper
            // spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            style={{ direction: "ltr", display: "block" }}
            className="mySwiper myswiper_Crousel"
          >
            <SwiperSlide>
              <img
                class="d-block"
                src={vk5}
                alt="First slide"
                style={{ height: "100vh", width: "100vw" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                class="d-block"
                src={vk}
                alt="First slide"
                style={{ height: "100vh", width: "100vw" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                class="d-block"
                src={vk2}
                alt="First slide"
                style={{ height: "100vh", width: "100vw" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                class="d-block"
                src={vk3}
                alt="First slide"
                style={{ height: "100vh", width: "100vw" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                class="d-block"
                src={vk4}
                alt="First slide"
                style={{ height: "100vh", width: "100vw" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
}

export default SwiperComponent;
