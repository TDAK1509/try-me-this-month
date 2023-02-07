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
  getDoc,
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
      await updateSubData(sub, price, link);
    } catch (e) {
      // @ts-ignore
      if (e.message.includes("No document to update")) {
        return addNewSubData(sub, price, link);
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
    const ref = getSubDataRefByDocId(sub);

    return updateDoc(ref, {
      [price]: arrayRemove(link),
    });
  },

  addFavorite: async (link: Link) => {
    try {
      await updateFavorite(link);
    } catch (e) {
      // @ts-ignore
      if (e.message.includes("No document to update")) {
        return addNewFavorite(link);
      }

      throw e;
    }
  },

  removeFavorite: async (link: Link) => {
    return removeFavorite(link);
  },

  fetchFavorites: async (): Promise<string[]> => {
    const docRef = doc(_db, COLLECTION_FAVORITE, "favorites");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().links;
    } else {
      return [];
    }
  },
};

async function addNewSubData(sub: SubName, price: Price, link: Link) {
  const ref = getSubDataRefByDocId(sub);

  return setDoc(ref, {
    [price]: [link],
  });
}

async function updateSubData(sub: SubName, price: Price, link: Link) {
  const ref = getSubDataRefByDocId(sub);

  return updateDoc(ref, {
    [price]: arrayUnion(link),
  });
}

function getSubDataRefByDocId(docId: string): DocumentReference<DocumentData> {
  return doc(_db, COLLECTION_LINKS, docId);
}

async function addNewFavorite(favorite: Link) {
  const ref = doc(_db, COLLECTION_FAVORITE, "favorites");

  return setDoc(ref, {
    links: [favorite],
  });
}

async function updateFavorite(favorite: Link) {
  const ref = doc(_db, COLLECTION_FAVORITE, "favorites");

  return updateDoc(ref, {
    links: arrayUnion(favorite),
  });
}

async function removeFavorite(favorite: Link) {
  const ref = doc(_db, COLLECTION_FAVORITE, "favorites");

  return updateDoc(ref, {
    links: arrayRemove(favorite),
  });
}
