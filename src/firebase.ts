import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAmftY35GwnoteVn_ixIRwbCWSrAJiSr3U",
  authDomain: "try-me-this-month.firebaseapp.com",
  projectId: "try-me-this-month",
  // storageBucket: "try-me-this-month.appspot.com",
  // messagingSenderId: "191615141577",
  appId: "1:191615141577:web:8948d78a7f9362766a2f18",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);