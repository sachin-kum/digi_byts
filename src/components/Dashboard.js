import React, { useEffect, useState } from "react";
import {
  headerbg,
  logo,
} from "../images";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import $ from "jquery";
import Footer from "./Footer";
import Loader from "./Loader";
import addNotification from "react-push-notification";
import axios from "axios";
import MobileInstallPwa from "./HomeInstallPwa";
function Dashboard() {
  const navigate = useNavigate();
  const userid = localStorage.getItem("user_id");
  const [loader, setloader] = useState(true);
  const [count, setCount] = useState();

  const [homeData, setHomeData] = useState();
  const ApiUrl = "https://news.digibyts.com/api";

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    arrows: true,
    autoplaySpeed: 500,
    easing: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const logout = () => {
    localStorage.clear();
    $(".close").click();
    toast.success("Logout successfully");
    navigate("/");
  };
  useEffect(() => {
    axios.get(`${ApiUrl}/?method=home_page`).then((res) => {
      setHomeData(res?.data?.data);
    });
  }, []);
  useEffect(() => {
    if (homeData) {
      setloader(false);
    }
  }, [homeData]);

  useEffect(() => {
    const data = new FormData();
    data.append("method", "get_notification_data");
    data.append("user_id", userid);

    axios.post(ApiUrl, data).then((res) => {
      setCount(res.data.data?.length);
    });
  }, []);
  useEffect(() => {
    if (count > 0) {
      addNotification({
        title: "Notification",
        message: "New Post Created !!",
        theme: "darkblue",
        colorTop: "green",
        closeButton: "Go away",
        native: true,
      });
    }
  }, [count]);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    cursor: "pointer",
    transform: " translate(-50%,50%)",
    transitionDuration: "0.2s",
    transitionTimingFunction: "linear",
    transitionDelay: "0s",
  };

  const [footerData, setFoterLinks] = useState();
  const ApiUrls = "https://news.digibyts.com/api";
  useEffect(() => {
    axios.get(`${ApiUrls}/?method=social_links`).then((res) => {
      setFoterLinks(res && res.data);
    });
  }, []);

  return (
    <>
      {loader && <Loader />}
      <header
        style={{
          backgroundImage: `url(${headerbg})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">

          <div className="row top-header align-items-center">
            <div className="col-md-4">
              <div className="menu menu-bl">
                <input className="side-menu" type="checkbox" id="side-menu" />
                <label className="hamb" htmlFor="side-menu">
                  <span className="hamb-line"></span>
                </label>
                <ul className="pl-0 list-unstyled mb-0 d-flex align-items-center">
                  <li>
                    <a
                      className="cursor text-white"
                      onClick={() => navigate("/news")}
                    >
                      Read Now
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://news.digibyts.com/"
                      className="cursor text-white"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="" className="cursor text-white moblieShow ">
                      Advertise with Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor text-white moblieShow"
                      onClick={() => navigate("/contact")}
                    >
                      Contact
                    </a>
                  </li>
                  {!userid && (
                    <li>
                      <a
                        className="cursor text-white moblieShow "
                        onClick={() => navigate("/login")}
                      >
                        Login / Register
                      </a>
                    </li>
                  )}
                  <li>
                    <a className="cursor text-white moblieShow ">
                      <MobileInstallPwa />
                    </a>
                  </li>
                  <li className=" d-flex align-items-center mb-0 list-unstyled moblieShow ">
                    {footerData &&
                      footerData.social_icon &&
                      footerData.social_icon.map((res,index) => {
                        return (
                          <a
                            href={res?.image_linku}
                            className="text-decoration-none pl-2 moblieShow"
                            key={index}
                          >
                            <img src={res.tittleu} alt="footer-icon" />
                          </a>
                        );
                      })}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <Link to={"/"} className="logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="banner-content">
            <div className="row">
              <div className="col-md-7 text-center mx-auto">
                <h2>{homeData?.top_heading}</h2>
                <p dangerouslySetInnerHTML={{ __html: homeData?.top_desc }}></p>
                <div className="ban-btn">
                  <button
                    className="theme-btn2"
                    onClick={() => navigate("/news")}
                  >
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="about section-padding">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
              <div
                className="aboutHead"
                dangerouslySetInnerHTML={{ __html: homeData?.middle_heading }}
              />
              <div
                className="mt-md-5"
                style={{ fontSize: "20px" }}
                dangerouslySetInnerHTML={{ __html: homeData?.middle_desc }}
              />
            </div>
            <div className="col-md-4">
              <img src={homeData?.middle_image} alt="about" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <hr />
        </div>
      </section>

      <section className="testimonial section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="heading">
              <h3>{homeData?.testimonial_heading}</h3>
            </div>
          </div>
          <div className="test-carousel section-padding owl-carousel owl-theme">
            <Slider {...settings}>
              {homeData &&
                homeData?.testimonial_data &&
                homeData?.testimonial_data.map((res,index) => {
                  return (
                    <div className="main_slider " key={index}>
                      <div className="item">
                        <div className="card bg-transparent border-0 crd">
                          <img src={res?.image} className="bl"  />
                          <div className="card-body">
                            <h3>{res?.heading}</h3>
                            <p>
                              <img src={res?.middle_image} className="my-2"  />
                              <span
                                dangerouslySetInnerHTML={{ __html: res?.desc }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Dashboard;
