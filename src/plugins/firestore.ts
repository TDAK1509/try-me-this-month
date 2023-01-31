import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Db } from "@/types/data.types";

const firebaseConfig = {
  apiKey: "AIzaSyAmftY35GwnoteVn_ixIRwbCWSrAJiSr3U",
  authDomain: "try-me-this-month.firebaseapp.com",
  projectId: "try-me-this-month",
  // storageBucket: "try-me-this-month.appspot.com",
  // messagingSenderId: "191615141577",
  appId: "1:191615141577:web:8948d78a7f9362766a2f18",
};

const app = initializeApp(firebaseConfig);
const _db = getFirestore(app);
const COLLECTION = "links";

export const db: Db = {
  add: (doc: object) => {
    return addDoc(collection(_db, COLLECTION), doc);
  },
};
