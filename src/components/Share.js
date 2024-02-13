import React, { useState } from "react";
import ShareModal from "./ShareModal";
function Share({ label, text, title, imageUrl, url }) {
  const [showModal, setShowModal] = useState(false);
  const shareDetails = { url, title, text };
 
  const urlToFile = async () => {
    const response = await fetch(
      `https://api.allorigins.win/raw?url=${imageUrl}`,
      {
        headers: {
          "Content-Type": "image/jpg",
        },
      }
    );
    // console.log("url",label)

    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    return file;
  };

  const getImage = async () => {
    if (window.navigator.share) {
      const file = await urlToFile();
      const files = [file];

      if (!navigator.canShare || !navigator.canShare({ files: files })) {
        alert("Unsupported share feature");
        return;
      }

      navigator
        .share({
          files: files,
          title: "Hello! Digibyts User",
          url: url,
          text: text,
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      alert(`Your browser or operating system doesn't support sharing files.`);
    }
  };

  return (
    <>
      <button
        className="sharer-button"
        onClick={getImage}
        style={{ border: "none", background: "transparent" }}
      >
        <span className="sharer-button-text">{label}</span>
      </button>

      <ShareModal
        handleClose={setShowModal}
        shareData={shareDetails}
        modalVisible={showModal}
      />
    </>
  );
}
export default Share;
