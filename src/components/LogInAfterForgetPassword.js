import axios from "axios";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function LoginAfterForgetPassword() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [userData, setuserData] = useState();
  const [showForm, setShowForm] = useState(true);
  const ApiUrl = "https://news.digibyts.com/api";
  const navigate = useNavigate();
  const [updatePasswordAfterLogin, setUpdatePasswordAfterLogin] =
    useState(false);
  const responseFacebook = (response) => {
    let fbdata = new FormData();
    fbdata.append("method", "social_login");
    fbdata.append("type", "facebook");
    fbdata.append("user_email", response?.email);
    fbdata.append("user_nicename", response?.name);
    fbdata.append("user_login", response?.name);
    fbdata.append("image_url", response?.picture?.data?.url);
    fbdata.append("facebook_id", response?.userID);

    if (response?.accessToken) {
      axios.post(ApiUrl, fbdata).then((res) => {
        setuserData(res?.data);
      });
    }
  };
  useEffect(() => {
    if (userData?.status == "success") {
      if (userData?.user_info) {
        localStorage.setItem("user_id", userData?.user_info?.id);
        localStorage.setItem("user_name", userData?.user_info?.username);

        localStorage.setItem(
          "notification",
          userData?.user_info?.notification == null
            ? "off"
            : userData?.user_info?.notification
        );
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [userData]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name must be required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number must be required")
      .max(13, "Too Long!"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email must be required"),
    password: Yup.string().required("Password must be required"),
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email must be required"),
    password: Yup.string().required("Password must be required"),
  });
  const onSubmitHandler = (values) => {
    let formData = new FormData();
    formData.append("method", "login");
    formData.append("user_email", values?.email);
    formData.append("user_pass", values?.password);
    axios.post(ApiUrl, formData).then((res) => {
      setuserData(res?.data);
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
      }
    });
  };
  const onSignupHandler = (values) => {
    let formData = new FormData();
    formData.append("method", "signup");
    formData.append("type", "email");
    formData.append("user_nicename", values?.firstName);
    formData.append("mobile", values?.phone);
    formData.append("user_email", values?.email);
    formData.append("user_pass", values?.password);

    axios.post(ApiUrl, formData).then((res) => {
      setuserData(res?.data);
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
      }
    });
  };
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    userId && navigate("/");
  }, []);

  return (
    <>
      <div className="container  pt-3">
        <div className="screen">
          <div className="div_section">
            <span className="back-arrow cursor">
              <img
                alt="Back"
                onClick={() => navigate("/")}
                src="https://img.icons8.com/fluency-systems-filled/24/ffffff/chevron-left--v2.png"
              />
            </span>
            <div className="screen__content py-4 mx-2">
              <h3 className=""> Login</h3>
              <p>Login to your account</p>
              <div className="contact-form ">
                <div className="second-container w-100 pl-0">
                  {showForm && !forgotPassword && !updatePasswordAfterLogin && (
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={LoginSchema}
                      onSubmit={(values, { resetForm }) => {
                        onSubmitHandler(values);
                        resetForm();
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="form-group">
                            <Field
                              name="email"
                              placeholder="example@email.com"
                              type="email"
                              className="w-100 m-0"
                            />
                          </div>
                          {errors.email && touched.email ? (
                            <div className="text-danger">{errors.email}</div>
                          ) : null}
                          <br />
                          <div className="form-group">
                            <Field
                              name="password"
                              placeholder="Password"
                              type="password"
                            />
                          </div>
                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                          <br />
                          <div className="row text-left">
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="d-flex m-auto justify-content-center submit_btn"
                              >
                                Login
                              </button>
                            </div>
                          </div>
                          <p className="pt-2">
                            Don’t have an account ?
                            <span
                              className="text-primary cursor pl-2"
                              onClick={() => setShowForm(!showForm)}
                            >
                              Sign Up
                            </span>
                          </p>
                          <span
                            className="text-primary cursor"
                            onClick={() => {
                              setForgotPassword(true);
                            }}
                          >
                            Forgot Password
                          </span>
                        </Form>
                      )}
                    </Formik>
                  )}

                  {!showForm && !forgotPassword && (
                    <Formik
                      initialValues={{
                        firstName: "",
                        phone: "",
                        email: "",
                        password: "",
                      }}
                      validationSchema={SignUpSchema}
                      onSubmit={(values, { resetForm }) => {
                        onSignupHandler(values);
                        resetForm();
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="form-group">
                            <Field
                              name="firstName"
                              placeholder="user name"
                              className="w-100 m-0"
                            />
                          </div>
                          {errors.firstName && touched.firstName ? (
                            <div className="text-danger">
                              {errors.firstName}
                            </div>
                          ) : null}
                          <br />
                          <div className="form-group">
                            <Field name="phone" placeholder="Phone" />
                          </div>
                          {errors.phone && touched.phone ? (
                            <div className="text-danger">{errors.phone}</div>
                          ) : null}
                          <br />
                          <div className="form-group">
                            <Field
                              name="email"
                              placeholder="example@email.com"
                              type="email"
                            />
                          </div>
                          {errors.email && touched.email ? (
                            <div className="text-danger">{errors.email}</div>
                          ) : null}
                          <br />
                          <div className="form-group">
                            <Field
                              name="password"
                              placeholder="Password"
                              type="password"
                            />
                          </div>
                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                          <br />
                          <div className="row text-left">
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="d-flex m-auto justify-content-center submit_btn"
                              >
                                Register
                              </button>
                            </div>
                          </div>
                          <p className="pt-2">
                            You have a account ?
                            <span
                              className="text-primary cursor pl-2"
                              onClick={() => setShowForm(!showForm)}
                            >
                              Login
                            </span>
                          </p>
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
              <h3 className="d-flex m-auto justify-content-center">OR</h3>
              <hr />
              <form className="login">
                <div className="row  d-flex align-items-center">
                  <div className="col-md-12">
                    <FacebookLogin
                      appId="770366164104052"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cssclassName="facebook-login-button gle-btn"
                      icon="fa-facebook"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAfterForgetPassword;
