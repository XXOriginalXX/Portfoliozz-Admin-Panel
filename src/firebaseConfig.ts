import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl6zt73_HzSw4ng6dJDitXvudH16bQBZM",
  authDomain: "portfoliozz-website.firebaseapp.com",
  projectId: "portfoliozz-website",
  storageBucket: "portfoliozz-website.firebasestorage.app",
  messagingSenderId: "972355157609",
  appId: "1:972355157609:web:f7fae50c43cb01b7726cf8",
  measurementId: "G-LJ5N63BND4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;