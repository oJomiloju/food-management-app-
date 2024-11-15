// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// If you're using Analytics (optional for React Native apps, requires setup)
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAde6dwdrURSkz8hdm9k7v-i40mSayKvyY",
  authDomain: "jasp-a728c.firebaseapp.com",
  projectId: "jasp-a728c",
  storageBucket: "jasp-a728c.firebasestorage.app",
  messagingSenderId: "881096254372",
  appId: "1:881096254372:web:d6a4cf6a8171a939aa5731",
  measurementId: "G-9G22YZLY53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and optionally analytics
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const reactNativePersistence = getReactNativePersistence(AsyncStorage);

// Comment or remove analytics if not used
// const analytics = getAnalytics(app);
