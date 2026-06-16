// src/contexts/PantryContext.jsx
import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useRealtimeCollection } from '../hooks/useRealtimeCollection';
import { firestoreService } from '../services/firestore';
import toast from 'react-hot-toast';

const PantryContext = createContext();

export function usePantry() {
  return useContext(PantryContext);
}

export function PantryProvider({ children }) {
  const { currentUser } = useAuth();
  const { data: pantryItems, loading, error } = useRealtimeCollection(
    currentUser?.uid, 
    'pantry'
  );

  if (loading) {
    return <div className="p-8 text-center">Loading your pantry...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading pantry: {error.message}</div>;
  }

  const addItem = async (item) => {
    try {
      await firestoreService.addPantryItem(currentUser.uid, item);
      toast.success('Item added');
    } catch (error) {
      toast.error('Error adding item');
    }
  };

  const updateItem = async (id, updates) => {
    try {
      await firestoreService.updatePantryItem(currentUser.uid, id, updates);
      toast.success('Item updated');
    } catch (error) {
      toast.error('Error updating item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await firestoreService.deletePantryItem(currentUser.uid, id);
      toast.success('Item deleted');
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  const value = { pantryItems, addItem, updateItem, deleteItem, loading };
  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}