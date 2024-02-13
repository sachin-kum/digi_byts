import React from "react";
import CustomForm from "./CustomForm";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const Subscribe = (props) => {
  const postUrl =
    "https://digibyts.us18.list-manage.com/subscribe/post?u=c00c60c6396b6526216d1b8e2&amp;id=ce86b7a9d4";
  return (
    <div className="mc__form-container">
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            onClick={props.onClick}
          />
        )}
      />
    </div>
  );
};

export default Subscribe;
