import React from "react";
import CustomNavbar from "./CustomNavbar";

export const Base = ({ title = "Welcom to our website", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavbar
        color="success"
        dark
        container="md"
        expand="true"
      ></CustomNavbar>

      {children}

      {/* <h1>This is footer</h1> */}
    </div>
  );
};

export default Base;
