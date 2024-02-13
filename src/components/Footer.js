import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ftLgImg} from "../images";
function Footer() {
  const [footerData, setFoterLinks] = useState();
  const ApiUrl = "https://news.digibyts.com/api";
  useEffect(() => {
    axios.get(`${ApiUrl}/?method=social_links`).then((res) => {
      setFoterLinks(res && res.data);
    });
  }, []);
  return (
    <>
      <footer className="section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="ft-logo">
              <img src={ftLgImg} className="img-fluid" alt="logo" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <h4>LEGAL</h4>
              <ul className="mt-4 pl-4 mb-0 list-unstyled">
                <li className="my-3">
                  <Link to={"/privacy"}>Privacy Policy</Link>
                </li>
                <li className="my-3">
                  <Link to={"/terms"}>Terms And Conditions</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h4>USEFULL LINKS</h4>
              <ul className="mt-4 pl-4 mb-0 list-unstyled">
                <li className="my-3">
                  <a href="mailto:info@digibyts.com">Contact Us</a>
                </li>
                <li className="my-3">
                  <Link to={"/news"}>Read now</Link>
                </li>
                <li>
                  <a href="https://news.digibyts.com/" className="cursor">
                    Blog
                  </a>
                </li>

                <li className="my-3">
                  <a href="mailto:ads@digibyts.com">Advertise with Us</a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h4>SOCIAL</h4>
              <ul className="mt-4 d-flex align-items-center mb-0 list-unstyled">
                {footerData &&
                  footerData.social_icon &&
                  footerData.social_icon.map((res,index) => {
                    return (
                      <a
                        href={res?.image_linku}
                        className="text-decoration-none pl-2"
                        key={index}
                      >
                        <img src={res.tittleu} alt="social-icons" />
                      </a>
                    );
                  })}
              </ul>
              <br />
            </div>
          </div>
        </div>
      </footer>

      <section className="bottom">
        <div className="container text-center">
          <hr />
          <p>Copyrights 2022 | All Rights Reserved</p>
        </div>
      </section>
    </>
  );
}

export default Footer;
