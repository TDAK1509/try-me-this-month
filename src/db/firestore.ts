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
};

const app = initializeApp(firebaseConfig);
const _db = getFirestore(app);
const COLLECTION_LINKS = "links";
const COLLECTION_FAVORITE = "favorites";

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
    const querySnapshot = await getDocs(collection(_db, COLLECTION_LINKS));

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

  fetchFavorites: async (): Promise<string[]> => {
    return ["link 1", "link 2"];
    // const querySnapshot = await getDocs(collection(_db, COLLECTION_FAVORITE));

    // let result: SubsData = {};

    // querySnapshot.forEach(doc => {
    //   result[doc.id] = doc.data();
    // });

    // return result;
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
  return doc(_db, COLLECTION_LINKS, docId);
}
