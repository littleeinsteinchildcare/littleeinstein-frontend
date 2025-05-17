// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlzboP1P7-dwdQOvbDLDMMaqvZ49MMA_E",
  authDomain: "little-child-care.firebaseapp.com",
  projectId: "little-child-care",
  storageBucket: "little-child-care.firebasestorage.app",
  messagingSenderId: "930085624087",
  appId: "1:930085624087:web:d9d39da3feb3a6ef72bf52",
  measurementId: "G-0ZLRL04GFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
