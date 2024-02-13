import React, { useState } from "react";

const CustomForm = ({ status, message, onValidated, onClick }) => {
  const [submitMessage, setSubmitMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState()
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(true)
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
    setSubmitMessage("You will shortly recieve confirmation email");
  };

  return (
    <div className="customform-parent">
      {!successMessage &&
        <form
          className="mc__form"
          onSubmit={handleSubmit}
        >
          <span
            onClick={onClick}
            style={{
              position: "absolute",
              top: "1px",
              right: "5px",
              cursor: "pointer"

            }}
          >
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>
          <h3 className="mc__title">Subscribe for our Newsletter</h3>
          <div className="mc__field-container">
            <input
              className="emailSubscribe p-1"
              label="Email"
              onChange={handleChange}
              type="email"
              value={email}
              placeholder="Enter your email here"
              isRequired
              required
            />
          </div>

          <input label="subscribe" type="submit" className="subscribe_btn" formValues={[email]} />
        </form>
      }

      {successMessage &&
        <>
          <span
            onClick={onClick}
            style={{
              position: "absolute",
              top: "1px",
              right: "5px",
              cursor: "pointer"
            }}
          >
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>
          {status === "sending" && (
            <div className="mc__alert mc__alert--sending">sending...</div>
          )}
          {status === "error" && (
            <div
              className="mc__alert mc__alert--error"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <>
              <h2 className="success_message">Thank You!</h2>
              <div>You will receive an email shortly with a link to your
                FREE eBook.</div>
            </>
          )}
        </>}
    </div>
  );
};
export default CustomForm;
