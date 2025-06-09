import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// NOTE: For Firebase client SDKs, API keys are OK to be public
// They're restricted by Firebase Security Rules and domain restrictions
// See: https://firebase.google.com/docs/projects/api-keys
// No need to log all environment variables in production

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// For development debugging only, can be removed in production
if (process.env.NODE_ENV !== "production") {
  console.log("Firebase initialization status:");
  console.log("API Key Set:", !!firebaseConfig.apiKey);
  console.log("Auth Domain Set:", !!firebaseConfig.authDomain);
  console.log("Project ID Set:", !!firebaseConfig.projectId);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);

// Enable local persistence to keep the user logged in between page refreshes
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Firebase auth persistence error:", error);
  });
}

export { app, auth };
