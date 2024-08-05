// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsiqY1YYx86S8pJu3rAkqCZlEYhHC2M1Q",
  authDomain: "test-410bc.firebaseapp.com",
  projectId: "test-410bc",
  storageBucket: "test-410bc.appspot.com",
  messagingSenderId: "839969089152",
  appId: "1:839969089152:web:916f3fcd8bd65d4159e865",
  measurementId: "G-K4SPFXQKL7",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
