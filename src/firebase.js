import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? import.meta.env.VITE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? import.meta.env.VITE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? import.meta.env.VITE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? import.meta.env.VITE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? import.meta.env.VITE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? import.meta.env.VITE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? import.meta.env.VITE_MEASUREMENT_ID ?? '',
};

const hasFirebaseConfig = Object.values(firebaseConfig).every((value) => Boolean(value));

if (!hasFirebaseConfig) {
  console.warn('Firebase config is incomplete. Add the VITE_FIREBASE_* values or the older VITE_* aliases.');
}

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;

export const analytics = app && typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = app ? getFirestore(app) : null;

export default app;
