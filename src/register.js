import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Regiser() {
  const [email, setinput] = useState("");
  const [password, setpassword] = useState("");
  const [ispassword, setispassword] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
   
    console.log(email,password)
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
    
        <label>Enter your Email</label>
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
            type={ispassword ? "text" : "password"}
            className="input_password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              // console.log(e)
              setpassword(e.target.value);
            }}
          />
          <button type="submit" onClick={signIn}>
            LOG IN
          </button>
         
          
          <button onClick={(e)=>{
            
            passwordHide()
          }}>{ispassword ? "hide" : "show"}</button>
          <p onClick={() => navigate("/signup")}>Create an account</p>
        </div>
  
     

    </div>
  );
}
