// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOUqJFWno8LC8ndWZerkL0bFEo0kj7TNg",
  authDomain: "desilentorder-2515e.firebaseapp.com",
  projectId: "desilentorder-2515e",
  storageBucket: "desilentorder-2515e.appspot.com",
  messagingSenderId: "319801382014",
  appId: "1:319801382014:web:b10815c4d147607e86f42f",
  measurementId: "G-E5NDLP1LHL"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
