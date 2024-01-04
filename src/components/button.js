import React from "react";

import "../App.css";

export default function Button({ name, onClick, className,disable }) {
  return (
    <div>
      <button onClick={onClick} className={`${className} button`} disabled={disable}>
        {name}
      </button>
    </div>
  );
}
