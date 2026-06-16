// src/hooks/useRealtimeCollection.js
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useRealtimeCollection = (userId, subCollectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !subCollectionName) {
      setLoading(false);
      return;
    }

    const collectionRef = collection(db, 'users', userId, subCollectionName);
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Realtime error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, subCollectionName]);

  return { data, loading, error };
};