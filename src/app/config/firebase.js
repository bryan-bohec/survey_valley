// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgeN_kDV1owSzezoD19dic7gC9XSjlDRs",
  authDomain: "survey-valley2.firebaseapp.com",
  projectId: "survey-valley2",
  storageBucket: "survey-valley2.appspot.com",
  messagingSenderId: "783092318469",
  appId: "1:783092318469:web:c7e02ddd4a3e112b77376c",
  measurementId: "G-JV9LTJ12G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);