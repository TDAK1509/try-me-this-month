import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { Db, Link, Price, SubName, SubsData } from "@/types/data.types";

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
  add: async (sub: SubName, price: Price, link: Link) => {
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

  fetch: async (): Promise<SubsData> => {
    const querySnapshot = await getDocs(collection(_db, COLLECTION));

    let result: SubsData = {};

    querySnapshot.forEach(doc => {
      result[doc.id] = doc.data();
    });

    return result;
  },

  remove: async (sub: SubName, price: Price, link: Link) => {
    const ref = getRefByDocId(sub);

    return updateDoc(ref, {
      [price]: arrayRemove(link),
    });
  },
};

async function addNewData(sub: SubName, price: Price, link: Link) {
  const ref = getRefByDocId(sub);

  return setDoc(ref, {
    [price]: [link],
  });
}

async function updateData(sub: SubName, price: Price, link: Link) {
  const ref = getRefByDocId(sub);

  return updateDoc(ref, {
    [price]: arrayUnion(link),
  });
}

function getRefByDocId(docId: string): DocumentReference<DocumentData> {
  return doc(_db, COLLECTION, docId);
}
