import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Autoplay } from "swiper";
import "reactjs-popup/dist/index.css";

import vk from "../assets/images/1.jpg";
import vk2 from "../assets/images/2.jpg";
import vk3 from "../assets/images/3.jpg";
import vk4 from "../assets/images/4.jpg";
import vk5 from "../assets/images/6.jpg";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function ViewAllInsights() {
  useEffect(() => {
    $(document).ready(function () {
      $(".swiper").css("height", $(window).height());
    });
  });
  const navigate =useNavigate();

  return (
    <>
      <span
        style={{
          position: "fixed",
          top: "1px",
          right: "5px",
          cursor: "pointer",
          zIndex: 999,
        }}
        onClick={()=>navigate(-1)}
      >
        <i
          className="fa fa-times-circle-o"
          aria-hidden="true"
          style={{ color: "#fff", fontSize: "50px" }}
        ></i>
      </span>

      <Swiper
        className="mySwiper2 swiper-v"
        direction={"vertical"}
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        onSlideChange={(e) => e.activeIndex}
      >
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
          <img src={vk2} alt="" style={{ height: "100vh", width: "100vw" }} />
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default ViewAllInsights;
