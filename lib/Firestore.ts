// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { environment } from "../environments/environment";

// Initialize Firebase
export const app = initializeApp(environment.FIREBASE_CONFIG);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

/**
 * Custom React hook to read data from a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection to read from.
 * @returns {Array} An array containing the data from the specified Firestore collection.
 */
export async function useDbReader(collectionName: string) {
  try {
    const collectionCol = collection(db, collectionName);
    const collectionSnapshot = await getDocs(collectionCol);
    return collectionSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
    return [];
  }
}

/**
 * Custom React hook to write data to a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection to write to.
 * @param {Object} object - The object to be written to the Firestore collection.
 * @returns {Promise<void>} A promise that resolves when the data is successfully written to the Firestore collection.
 */
export async function useDbWriter(collectionName: string, object: any) {
  try {
    await addDoc(collection(db, collectionName), object);
  } catch (error) {
    console.error("Error writing data to Firestore:", error);
  }
}

/**
 * Custom React hook to subscribe to updates in a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection to subscribe to.
 * @param {Function} updateFunction - The function to be called when the Firestore collection is updated.
 * @returns {Function} A function to unsubscribe from updates in the Firestore collection.
 */
export function useDbSubscription(
  collectionName: string,
  updateFunction: Function
) {
  const unsubscribe = onSnapshot(collection(db, collectionName), () => {
    updateFunction();
  });
  return unsubscribe;
}

/**
 * Custom React hook to fetch a document from a Firestore collection by its ID.
 * @param {string} collectionName - The name of the Firestore collection containing the document.
 * @param {string} id - The ID of the document to fetch.
 * @returns {Object | null} The data of the fetched document if it exists, or null if the document doesn't exist.
 */
export async function useDocument(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching document from Firestore:", error);
    return null;
  }
}

/**
 * Custom React hook to remove a document from a Firestore collection by its ID.
 * @param {string} collectionName - The name of the Firestore collection containing the document.
 * @param {string} id - The ID of the document to remove.
 */
export async function useDocumentRemover(collectionName: string, id: string) {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error("Error removing document from Firestore:", error);
  }
}
