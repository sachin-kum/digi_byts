import React, { useEffect, useState } from "react";
import { install_icon } from "../images";
const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <img
      src={install_icon}
      style={{ cursor: "pointer" }}
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
      alt="Install App"
    />
  );
};

export default InstallPWA;
