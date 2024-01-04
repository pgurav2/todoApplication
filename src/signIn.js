import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./css/common.css";
import eye from "./assets/visible.png";
import hide from "./assets/hide.png";

import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import Popup from "./components/popup";

export default function SignIn() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");
  const [ispassword, setispassword] = useState(true);
  const [popup, setpopup] = useState(false);
  const [usererror, setusererror] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
        // alert("Login Successfull");
        setpopup(true);
        // navigate("/todo");
      })
      .catch((error) => {
        setusererror(true);
        myStopFunction();

        console.log("error", error);
      });
  };

  function myStopFunction() {
    setTimeout(() => setusererror(false), 5000);
  }

  // function passwordHide() {
  //   setispassword(!ispassword);
  // }

  return (
    <div className="App">
      <h1>SIGN IN</h1>
      <div>
        <p className="text_name">Email</p>
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
            type={ispassword ? "password" : "text"}
            className="input_field"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              // console.log(e)
              setpassword(e.target.value);
            }}
          />

          {/* <Button
            name={ispassword ? "hide" : "show"}
            onClick={passwordHide}
            className={"pass_btn"}
          /> */}
          {ispassword ? (
            <img
              src={hide}
              className="pass_btn"
              onClick={() => setispassword(false)}
            />
          ) : (
            <img
              src={eye}
              className="pass_btn"
              onClick={() => setispassword(true)}
            />
          )}
        </div>
      </div>
      {usererror && <p className="user_error">Invalid Credentials</p>}
      <Button name={"LOG IN"} onClick={signIn} className={"log_in"} />

      <p className="create_lable" onClick={() => navigate("/signup")}>
        Create an account
      </p>

      {popup && (
        <Popup title={"Sign In Complete!"} okclick={() => navigate("/todo")} />
      )}
    </div>
  );
}
