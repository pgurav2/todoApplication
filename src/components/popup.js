import React from "react";
import "../css/popup.css";
import email from "../assets/email.png";

export default function Popup({ title, okclick }) {
  return (
    <div className="popup_container">
      <div className="popup_wrapper">
        <img src={email} className="email" />
        <p className="popup-title">{title}</p>
        <p className="popup_para">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy{" "}
        </p>
        <button onClick={okclick} className="popup_btn">
          OK
        </button>
      </div>
    </div>
  );
}
