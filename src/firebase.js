// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKk6O2TqLTvG5DVE8OKowQ6iZBLTiZlHU",
  authDomain: "sana-habit-tracker.firebaseapp.com",
  projectId: "sana-habit-tracker",
  storageBucket: "sana-habit-tracker.firebasestorage.app",
  messagingSenderId: "2671228241",
  appId: "1:2671228241:web:47bfae200e374b25e74f70",
  measurementId: "G-KGS1BPCWQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);