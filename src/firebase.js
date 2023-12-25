// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDF5hsLLns87YeSuTmZHIfcHKsBNEflOI",
  authDomain: "testing1-ef217.firebaseapp.com",
  projectId: "testing1-ef217",
  storageBucket: "testing1-ef217.appspot.com",
  messagingSenderId: "684635194150",
  appId: "1:684635194150:web:f7dc4587017a32cd2977e7",
  measurementId: "G-2F90NNN255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);