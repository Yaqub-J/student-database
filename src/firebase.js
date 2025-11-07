import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF5a8WRoDcCkiM9CfHw09s_5eebNbCJoQ",
  authDomain: "student-database-2224500-5721b.firebaseapp.com",
  projectId: "student-database-2224500-5721b",
  storageBucket: "student-database-2224500-5721b.firebasestorage.app",
  messagingSenderId: "668963740669",
  appId: "1:668963740669:web:3b2e15f415e4c771a9d794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };