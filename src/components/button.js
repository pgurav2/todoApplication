import React from "react";

import "../App.css";

export default function Button({ name, onClick, className }) {
  return (
    <div>
      <button onClick={onClick} className={`${className} button`}>
        {name}
      </button>
    </div>
  );
}
