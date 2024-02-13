import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loader from "./Loader";

function UpdateProfile() {
  const [updateData, setupdateData] = useState();
  const [userData, setuserData] = useState();
  const get_user_id = localStorage.getItem("user_id");
  const [loader, setloader] = useState(true);
  const ApiUrl = "https://news.digibyts.com/api";

  const SignUpSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string(),
    phone: Yup.number(),
    password: Yup.string(),
  });
  useEffect(() => {
    let formData = new FormData();
    formData.append("method", "get_user_data");
    formData.append("user_id", get_user_id);
    axios.post(ApiUrl, formData).then((res) => {
      setupdateData(res.data?.user_details);
    });
  }, [userData]);

  useEffect(() => {
    if (updateData) {
      setloader(false);
    }
  }, [updateData]);

  const onSignupHandler = (values) => {
    const type = updateData?.type;
    let formData = new FormData();
    formData.append("method", "update_profile");
    formData.append("user_id", get_user_id);
    if (type == "email") {
      formData.append("mobile", values?.phone);
      formData.append("username", values?.username);
      formData.append("email", values?.email);
      formData.append("password", values?.password);
    } else if (type == "google") {
      formData.append("mobile", values?.phone);
      formData.append("username", values?.username);
    } else {
      formData.append("mobile", values?.phone);
      formData.append("username", values?.username);
      if (!updateData?.email) {
        formData.append("email", values?.email);
      }
    }

    axios.post(ApiUrl, formData).then((res) => {
      setuserData(res?.data);
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
      }
    });
  };

  return (
    <>
      {loader && <Loader />}

      <Header heading={"Update Profile"} />

      <section className="contact section-padding">
        <div className="container">
          <div className="contact-form">
            <div className="first-container"></div>
            <div className="second-container">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  username: updateData && updateData.username,
                  email: updateData && updateData.email,
                  phone: updateData && updateData.mobile,
                  password: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, { resetForm }) => {
                  onSignupHandler(values);
                  resetForm();
                }}
              >
                <Form>
                  <div className="form-group">
                    <Field
                      name="username"
                      placeholder="username"
                      className="w-100 m-0"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="email"
                      placeholder="example@email.com"
                      type="email"
                    />
                  </div>
                  <div className="form-group">
                    <Field name="phone" placeholder="mobile" type="number" />
                  </div>
                  <div className="form-group">
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <div className="row text-left">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="d-flex m-auto justify-content-center submit_btn"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UpdateProfile;
