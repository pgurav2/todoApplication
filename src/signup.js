import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import "./css/common.css";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import eye from "./assets/visible.png";
import hide from "./assets/hide.png";
import Popup from "./components/popup";

export default function Signup() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");
  const [ispassword, setispassword] = useState(true);
  const [popup, setpopup] = useState(false);
  const [usererror, setusererror] = useState(false);
  const [wrongPassword, setwrongPassword] = useState(false);

  const navigate = useNavigate();
  console.log(auth);

  const Signup = () => {
    if (password.length >= 6) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setpopup(true);
          // navigate("/todo");
        })
        .catch((error) => {
          // alert("Email already in use");
          setusererror(true);
          myStopFunction();

          console.log(error.message);
          // navigate("/");
        });
    } else {
      setwrongPassword(true);
      setTimeout(() => {
        setwrongPassword(false);
      }, 5000);
    }
  };

  function myStopFunction() {
    setTimeout(() => setusererror(false), 5000);
  }

  // function passwordHide() {
  //   setispassword(!ispassword);
  // }

  return (
    // <form></form>
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
          required
        />
      </div>
      {usererror && <p className="user_error">Email is already in use</p>}
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
            required
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
        {wrongPassword && (
          <p className="user_error">
            Password should contain minimun 6 characters
          </p>
        )}
        <Button
          className={"log_in"}
          name={"SIGN UP"}
          onClick={() => {
            Signup();
          }}
          disable={email === "" || password === ""}
        />

        {popup && (
          <Popup
            title={"Sign Up Complete!"}
            okclick={() => navigate("/todo")}
          />
        )}
      </div>
    </div>
  );
}
