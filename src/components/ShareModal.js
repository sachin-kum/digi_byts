import React from "react";
function ShareModal({ modalVisible }) {
  return (
    <>
      <div
        className={`${"share-modal"} ${modalVisible ? "opened" : "closed"}`}
      ></div>
    </>
  );
}
export default ShareModal;
