import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const pantryCollection = (uid) => collection(db, 'users', uid, 'pantry');
const shoppingCollection = (uid) => collection(db, 'users', uid, 'shoppingList');
const mealPlanCollection = (uid) => collection(db, 'users', uid, 'mealPlans');
const wasteLogCollection = (uid) => collection(db, 'users', uid, 'wasteLogs');

export const firestoreService = {
  // Pantry
  getPantryItems: async (uid) => {
    const snapshot = await getDocs(pantryCollection(uid));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  addPantryItem: async (uid, item) => {
    const docRef = await addDoc(pantryCollection(uid), { ...item, createdAt: new Date() });
    return { id: docRef.id, ...item };
  },
  updatePantryItem: async (uid, itemId, updates) => {
    await updateDoc(doc(pantryCollection(uid), itemId), updates);
  },
  deletePantryItem: async (uid, itemId) => {
    await deleteDoc(doc(pantryCollection(uid), itemId));
  },

  // Shopping List
  getShoppingList: async (uid) => {
    const snapshot = await getDocs(shoppingCollection(uid));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  addShoppingItem: async (uid, item) => {
    const docRef = await addDoc(shoppingCollection(uid), item);
    return { id: docRef.id, ...item };
  },
  deleteShoppingItem: async (uid, id) => {
    await deleteDoc(doc(shoppingCollection(uid), id));
  },

  // Waste logs
  addWasteLog: async (uid, log) => {
    await addDoc(wasteLogCollection(uid), { ...log, date: new Date() });
  }
};