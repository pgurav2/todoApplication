import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import "./css/signup.css";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";

export default function Signup() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");
  const [ispassword, setispassword] = useState(false);

  const navigate = useNavigate();
  console.log(auth);

  const Signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("Registration Successfull");
        navigate("/todo");
      })
      .catch((error) => {
        alert("Email already in use");
        console.log(error);
        navigate("/");
      });
  };

  function passwordHide() {
    setispassword(!ispassword);
  }

  return (
    <div className="App">
      <h1>SIGN UP</h1>
      <div>
        <p>Email</p>
        <input
          type="email"
          className="input_field"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            // console.log(e)
            setinput(e.target.value);
          }}
        />
      </div>

      <div>
        <p>Password</p>
        <div className="password_wrapper">
          <input
            type={ispassword ? "text" : "password"}
            className="input_field"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              // console.log(e)
              setpassword(e.target.value);
            }}
          />

          <Button
            name={ispassword ? "hide" : "show"}
            onClick={passwordHide}
            className={"pass_btn"}
          />
        </div>

        <Button className={"log_in"} name={"SIGN UP"} onClick={Signup} />
      </div>
    </div>
  );
}
