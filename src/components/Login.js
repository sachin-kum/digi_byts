import axios from "axios";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [userData, setuserData] = useState();
  const [showForm, setShowForm] = useState(true);
  const ApiUrl = "https://news.digibyts.com/api";
  const navigate = useNavigate();
  const [otpVerficationn, setOtpVerficationn] = useState();
  const [otpVerficationn2, setOtpVerficationn2] = useState();
  const [newPasswordd, setNewPasswordd] = useState();
  const [newPasswordd2, setNewPasswordd2] = useState(true);
  const [newPasswordd3, setNewPasswordd3] = useState(true);
  const [newPasswordd4, setNewPasswordd4] = useState(true);
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

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const SignupSchemaVerification = Yup.object().shape({
    otp: Yup.string().required("Required"),
  });

  const SignupSchemaNewPassword = Yup.object().shape({
    password: Yup.string().required("Password must be required"),
    ConfirmPassword: Yup.string()
      .required("Please ReEnter your password")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
  });

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
  const otpVerification = (values) => {
    const data = new FormData();
    data.append("method", "send_otp");
    data.append("email", values?.email);
    axios.post("https://news.digibyts.com/api", data).then((res) => {
      setOtpVerficationn(res.data);
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
        localStorage.setItem("email", values?.email);
        setNewPasswordd2(false);
        setNewPasswordd3(false);
      }
    });
  };

  const getEmail = localStorage.getItem("email");

  const otpVerificationSuccess = (values) => {
    const data = new FormData();
    data.append("method", "verify_opt");
    data.append("otp", values?.otp);
    data.append("email", getEmail);
    axios.post("https://news.digibyts.com/api", data).then((res) => {
      if (res?.data?.status === "success") {
        setOtpVerficationn2(res.data);
        toast.success(res?.data?.msg);
        setNewPasswordd2(false);
        setNewPasswordd4(false);
      } else {
        toast.error(res?.data?.msg);
      }
    });
  };

  const NewPassword = (values) => {
    const data = new FormData();
    data.append("method", "update_password");
    data.append("email", getEmail);
    data.append("otp", values?.password);
    axios.post("https://news.digibyts.com/api", data).then((res) => {
      setNewPasswordd(res.data);
      if (res?.data?.status === "success") {
        toast.success(res?.data?.msg);
        setUpdatePasswordAfterLogin(true);
        setForgotPassword(false);
        navigate("/loginafterforgetpassword");
      }
    });
  };

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
                  {showForm &&
                    !forgotPassword &&
                    newPasswordd2 &&
                    !updatePasswordAfterLogin &&
                    NewPassword && (
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
                              <div className="text-danger">
                                {errors.password}
                              </div>
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
                  {forgotPassword && newPasswordd3 && (
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={SignupSchema}
                      onSubmit={(valuess) => otpVerification(valuess)}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="form-group">
                            <Field
                              name="email"
                              type="email"
                              className="w-100 m-0 mb-2 p-2"
                              placeholder="Please Enter Email Address.."
                            />
                          </div>
                          {errors.email && touched.email ? (
                            <div className="text-danger">{errors.email}</div>
                          ) : null}
                          <button
                            type="submit"
                            className="d-flex m-auto justify-content-center submit_btn"
                          >
                            Send Otp
                          </button>
                          <span
                            className="text-primary cursor mt-3"
                            onClick={() => {
                              setShowForm(showForm);
                              setForgotPassword(false);
                              setOtpVerficationn(false);
                            }}
                          >
                            Go back to login
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

                  {otpVerficationn && newPasswordd4 && (
                    <Formik
                      initialValues={{
                        otp: "",
                      }}
                      validationSchema={SignupSchemaVerification}
                      onSubmit={(valuess) => otpVerificationSuccess(valuess)}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="form-group">
                            <Field
                              name="otp"
                              type="number"
                              className="w-100 m-0 mb-2 p-2"
                              placeholder="Enter Otp"
                            />
                          </div>
                          {errors.otp && touched.otp ? (
                            <div className="text-danger">{errors.otp}</div>
                          ) : null}
                          <button
                            type="submit"
                            className="d-flex m-auto justify-content-center submit_btn"
                          >
                            Verify Otp
                          </button>
                        </Form>
                      )}
                    </Formik>
                  )}
                  {otpVerficationn2 && (
                    <Formik
                      initialValues={{
                        password: "",
                        ConfirmPassword: "",
                      }}
                      validationSchema={SignupSchemaNewPassword}
                      onSubmit={(valuess) => NewPassword(valuess)}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="form-group">
                            <Field
                              name="password"
                              type="password"
                              className="w-100 m-0 mb-2 p-2"
                              placeholder="Enter New Password"
                            />
                          </div>
                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                          <div className="form-group">
                            <Field
                              name="ConfirmPassword"
                              type="password"
                              className="w-100 m-0 mb-2 p-2"
                              placeholder="ConfirmPassword Password"
                            />
                          </div>
                          {errors.ConfirmPassword && touched.ConfirmPassword ? (
                            <div className="text-danger">
                              {errors.ConfirmPassword}
                            </div>
                          ) : null}
                          <button
                            type="submit"
                            className="d-flex m-auto justify-content-center submit_btn"
                          >
                            Update Password
                          </button>
                          <span
                            className="text-primary cursor mt-3"
                            onClick={() => {
                              setShowForm(showForm);
                              setForgotPassword(false);
                              setOtpVerficationn(false);
                            }}
                          >
                            Go back to login
                          </span>
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

export default Login;
