import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_HKDbZ3k-6Oaqv92Q1B1RSrDH1icI3NQ",
  authDomain: "midify-5465a.firebaseapp.com",
  projectId: "midify-5465a",
  storageBucket: "midify-5465a.appspot.com",
  messagingSenderId: "529110039005",
  appId: "1:529110039005:web:168c33a5816c5fb8c95e34",
  measurementId: "G-R82BVRMWDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, app, auth };