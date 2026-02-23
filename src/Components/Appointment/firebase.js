// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTDcHSCwRrP276DSSS3fxgWX-s1n5__U8",
  authDomain: "fir-login-9955d.firebaseapp.com",
  projectId: "fir-login-9955d",
  storageBucket: "fir-login-9955d.firebasestorage.app",
  messagingSenderId: "619372089674",
  appId: "1:619372089674:web:98d7ae872e2f4270c071b3",
  measurementId: "G-RQC84FRD14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);