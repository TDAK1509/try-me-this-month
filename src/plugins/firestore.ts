import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { Db, DbData } from "@/types/data.types";

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
  add: async (sub: string, price: string, link: string) => {
    try {
      await updateData(sub, price, link);
    } catch (e) {
      // @ts-ignore
      if (e.message.includes("No document to update")) {
        return addNewData(sub, price, link);
      }

      throw e;
    }
  },
};

async function addNewData(sub: string, price: string, link: string) {
  const ref = getRefByDocId(sub);

  return setDoc(ref, {
    [price]: [link],
  });
}

async function updateData(sub: string, price: string, link: string) {
  const ref = getRefByDocId(sub);

  return updateDoc(ref, {
    [price]: arrayUnion(link),
  });
}

function getRefByDocId(docId: string): DocumentReference<DocumentData> {
  return doc(_db, COLLECTION, docId);
}
