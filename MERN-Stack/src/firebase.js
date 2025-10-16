// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-ad653.firebaseapp.com",
  projectId: "mern-stack-ad653",
  storageBucket: 'mern-stack-ad653.firebasestorage.app',
  messagingSenderId: "84526537135",
  appId: "1:84526537135:web:0c363888d3cc310b7cb75a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);