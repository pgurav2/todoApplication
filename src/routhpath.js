import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./signup";
import Todo from "./todo";
import SignIn from "./signIn";
import Popup from "./components/popup";

export default function RouthPath() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
