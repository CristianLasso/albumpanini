// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLnomUVAizJw6ZL1tTDxvPpfxHg6bTGjI",
  authDomain: "albumpanini-2dacf.firebaseapp.com",
  projectId: "albumpanini-2dacf",
  storageBucket: "albumpanini-2dacf.appspot.com",
  messagingSenderId: "981865591407",
  appId: "1:981865591407:web:4cf6fa9fc748e1b36c539a",
  measurementId: "G-GNC3X1CZ5L"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = firebase.auth();

export default app;