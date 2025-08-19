// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJ-j5AHVazV35cqN9GECX1eHE7_Xe18CM",
  authDomain: "desilentorder-e7b92.firebaseapp.com",
  projectId: "desilentorder-e7b92",
  // databaseURL: "https://desilentorder-2515e-default-rtdb.asia-southeast1.firebasedatabase.app/",
  databaseURL: "https://desilentorder-e7b92-default-rtdb.firebaseio.com/",
  storageBucket: "desilentorder-e7b92.firebasestorage.app",
  messagingSenderId: "75545969383",
  appId: "1:75545969383:web:63e45d32eb6d28a8185842",
  measurementId: "G-FKXG6LFHXJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
 const db = getDatabase(app);
export { auth, provider,db };



