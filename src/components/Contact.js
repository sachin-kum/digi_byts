import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import Scroll from "../Scroll";

function Contact() {
  const [contact, setContact] = useState();
  const [loader, setloader] = useState(true);
  const ApiUrl = "https://news.digibyts.com/api";
  useEffect(() => {
    axios.get(`${ApiUrl}/?method=contact_us`).then((res) => {
      setContact(res?.data?.data);
      {
        res?.data && setloader(false);
      }
    });
  }, []);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name must be required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name must be required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email must be required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number must be required")
      .max(13, "Too Long!"),
    message: Yup.string().required("Message must be required"),
  });

  const onSubmitHandler = (values) => {
    let formData = new FormData();
    formData.append("method", "contact_us_data");
    formData.append("firstname", values?.firstName);
    formData.append("lastname", values?.lastName);
    formData.append("email", values?.email);
    formData.append("phone", values?.phone);
    formData.append("message", values?.message);

    axios.post(ApiUrl, formData).then((res) => {
      if (res?.data?.status == "success") {
        toast.success(res?.data?.msg);
      }
    });
  };

  return (
    <>
      {loader && <Loader />}
      <Scroll />
      <Header heading={"Contact Us"} />
      <section className="contact section-padding">
        <div className="container">
          <div className="contact-form">
            <div className="first-container">
              <div className="info-container">
                <div>
                  <img className="icon" alt="info"/>
                  <h3>Address</h3>
                  <p>{contact?.address}</p>
                </div>
                <div>
                  <img alt="icon" className="icon" />
                  <h3>Lets Talk</h3>
                  <p>
                    <a href={`tel:${contact?.phone}`}>{contact?.phone}</a>
                  </p>
                </div>
                <div>
                  <img alt="icon" className="icon" />
                  <h3>General Support</h3>
                  <p>
                    <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="second-container">
              <h2 className="font-weight-bold text-left">Contact Us</h2>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  message: "",
                }}
                validationSchema={ContactSchema}
                onSubmit={(values, { resetForm }) => {
                  onSubmitHandler(values);
                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name-input">Tell us your name*</label>
                      <Field name="firstName" placeholder="First name" />
                      <Field name="lastName" placeholder="Last name" />
                    </div>
                    <div className="contactError">
                      {errors.firstName && touched.firstName ? (
                        <div className="text-danger error">
                          {errors.firstName}
                        </div>
                      ) : null}
                      {errors.lastName && touched.lastName ? (
                        <div className="text-danger error">
                          {errors.lastName}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email-input">Enter your email*</label>
                      <Field
                        name="email"
                        placeholder="example@email.com"
                        type="email"
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                    <div className="form-group">
                      <label htmlFor="phone-input">Enter phone number*</label>
                      <Field
                        name="phone"
                        placeholder="+1 123 456987"
                        type="text"
                      />
                    </div>
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                    <div className="form-group">
                      <label htmlFor="message-textarea">Message*</label>
                      <Field
                        as={"textarea"}
                        name="message"
                        placeholder="Message"
                        type="text"
                      />
                    </div>
                    {errors.message && touched.message ? (
                      <div className="text-danger">{errors.message}</div>
                    ) : null}
                    <div className="row text-left">
                      <div className="col-md-12">
                        <button type="submit">Submit</button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
