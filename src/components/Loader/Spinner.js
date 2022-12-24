import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "100",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        background: "black",
        opacity: "0.7",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "45%",
          textAlign: "center",
        }}
      >
        <Spin style={{ fontSize: "1.5rem" }} tip="Loading..." size="large" />
      </div>
    </div>
  );
};

export default Spinner;
