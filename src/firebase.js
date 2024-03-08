// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8_pfZBytS-RrXGdmtMLkS8gkXR63njGg",
  authDomain: "microproyecto2-matheus-m-cdd7d.firebaseapp.com",
  projectId: "microproyecto2-matheus-m-cdd7d",
  storageBucket: "microproyecto2-matheus-m-cdd7d.appspot.com",
  messagingSenderId: "36622843713",
  appId: "1:36622843713:web:03472320d51a0ce1d56bc0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);