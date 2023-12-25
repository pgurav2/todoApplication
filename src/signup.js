import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");

  const navigate=useNavigate();
  console.log(auth)

  const Signup = ( ) => {
    
    createUserWithEmailAndPassword(auth, email, password)
    
      .then((userCredential) => {
        console.log(userCredential);
        alert("Registration Successfull")
        navigate("/todo");
      })
      .catch((error) => {
        alert("Email already in use")
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>SIGN UP</h1>
     
        <label>Enter your Email ID</label>
        <input
          type="email"
          className="input_name"
          placeholder="Enter Your Name"
          value={email}
          onChange={(e) => {
            // console.log(e)
            setinput(e.target.value);
          }}
        />
        <div>
          <label>Enter your password</label>
          <input
            type="password"
            className="input_password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              // console.log(e)
              setpassword(e.target.value);
            }}
          />
          <button type="submit" onClick={Signup}>SIGN UP</button>
     
        </div>
      
    </div>
  );
}
