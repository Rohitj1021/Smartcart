import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyC93C7bLanuaWY5AJdMVUD1vh2qWWDgVy4",
  authDomain: "smart-cart-4bbfb.firebaseapp.com",
  projectId: "smart-cart-4bbfb",
  storageBucket: "smart-cart-4bbfb.firebasestorage.app",
  messagingSenderId: "873970886547",
  appId: "1:873970886547:web:36cc39555befaf1e162a66",
  measurementId: "G-GGR1E2FFZ3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Optional: Use emulators for local development (no real SMS/costs)
if (process.env.NODE_ENV === 'development') {
  // Use local emulators – make sure you run `firebase emulators:start`
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}