// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmpLPfrkRjskDp4P2fSbLvMUrHjEq9DWA",
  authDomain: "primeval-stack-408400.firebaseapp.com",
  projectId: "primeval-stack-408400",
  storageBucket: "primeval-stack-408400.appspot.com",
  messagingSenderId: "462093202517",
  appId: "1:462093202517:web:17d506ecb43e7e59a7d0dc",
  measurementId: "G-YEEV13GE43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);