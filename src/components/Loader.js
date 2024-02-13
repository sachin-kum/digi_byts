import React from "react";
import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <div className="preLoader">
        <Bars color="#522976" height={100} width={100} ariaLabel="Hello" />
        <span>Loading Byts...</span>
      </div>
    </>
  );
}

export default Loader;
