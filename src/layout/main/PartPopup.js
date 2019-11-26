import React from "react";

const PartPopup = ({ title, description, position }) => {
  if (!title || !description) return null;

  return (
    <div
      className="partPopup"
      style={{
        top: "40%",
        left: "0%",
        width: "400px"
      }}
    >
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default PartPopup;
