import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Regiser from "./register";
import Signup from "./signup";
import Todo from "./todo";

export default function RouthPath() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Regiser />} />
            <Route path="/signup" element={<Signup />} />   
            <Route path="/todo" element={<Todo />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}
