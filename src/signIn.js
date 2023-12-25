import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./css/signin.css";

import { useNavigate } from "react-router-dom";
import Button from "./components/button";

export default function SignIn() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");
  const [ispassword, setispassword] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
        alert("Login Successfull");
        navigate("/todo");
      })
      .catch((error) => {
        alert("Invalid Credentials");
        console.log("error", error);
      });
  };

  function passwordHide() {
    setispassword(!ispassword);
  }

  return (
    <div className="App">
      <h1>SIGN IN</h1>
      <div>
        <p className="text_name">Email</p>
        <input
          type="email"
          className="input_field"
          placeholder="Enter Your Name"
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
          
          <Button name={ispassword ? "hide" : "show"} onClick={passwordHide} className={"pass_btn"} />
        </div>
      </div>
      <Button name={"LOG IN"} onClick={signIn} className={"log_in"} />

      <p className="create_lable" onClick={() => navigate("/signup")}>
        Create an account
      </p>
    </div>
  );
}
