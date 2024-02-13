import React from "react";
// import ShareModal from "./ShareModal";
function Share({ text, title, url }) {
  // const [showModal, setShowModal] = useState(false);
  // const shareDetails = { url, title, text };
  const imgUrl =
    "https://digibyts.com/images/logo.png";
  const urlToFile = async () => {
    const response = await fetch(imgUrl, {
      headers: {
        "Content-Type": "image/jpg",
      },
    });
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
          text: "Hey, Check out Digibyts. It’s the latest short news site that give you the latest news on Crypto, Metaverse, NFT and more. No app download required. ",
          url: window.location.origin,
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      alert(`Your browser or operating system doesn't support sharing files.`);
    }
  };

  return (
    <>
   
    <div className="setting_menu_options opt_bg_color" >
    <button className="shareApp_button" onClick={getImage}>Share this app</button>
      </div>
      {/* <div className="setting_menu_options opt_bg_color" onClick={getImage}>
        <span className="nottfication_text cursor">Share this app</span>
      </div> */}
      {/* <ShareModal
        handleClose={setShowModal}
        shareData={shareDetails}
        modalVisible={showModal}
      /> */}
    </>
  );
}
export default Share;
