// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0EYN-YqG2ZJSa61mIkHIxgfbM5i_mXV8",
  authDomain: "fallon-31166.firebaseapp.com",
  projectId: "fallon-31166",
  storageBucket: "fallon-31166.appspot.com",
  messagingSenderId: "498242214535",
  appId: "1:498242214535:web:a28f2c379ed147d4107622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export const db = getFirestore(app);