// import firebase from "firebase"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqr3s1KDjJOnmWGaD_fRkOL62V4FXbOlc",
  authDomain: "firechat-79b8b.firebaseapp.com",
  projectId: "firechat-79b8b",
  storageBucket: "firechat-79b8b.appspot.com",
  messagingSenderId: "209700885076",
  appId: "1:209700885076:web:b88c61eabe55f0e33e93c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
// export default firebase;
