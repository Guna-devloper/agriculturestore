// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuWmQ75JNWmK0VfV3XD3XvGAoEdyPcPvE",
  authDomain: "agrocart-com.firebaseapp.com",
  projectId: "agrocart-com",
  storageBucket: "agrocart-com.firebasestorage.app", // ✅ Fixed incorrect storageBucket URL
  messagingSenderId: "450709347369",
  appId: "1:450709347369:web:bc104a05c3922c40ff5038",
  measurementId: "G-3MJPV38T41"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export Storage

export default app;
