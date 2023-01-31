import { DocumentReference } from "firebase/firestore";

export interface Db {
  add: (x: object) => Promise<DocumentReference<object>>
}