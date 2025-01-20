// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjum1_oBTAbIqbuqYHmWFl8m36rYYiM8A",
  authDomain: "scalevolt-store.firebaseapp.com",
  projectId: "scalevolt-store",
  storageBucket: "scalevolt-store.firebasestorage.app",
  messagingSenderId: "315856818260",
  appId: "1:315856818260:web:03b3e119b0da8dcfe15dc1",
  measurementId: "G-2N7N24NV9Y"
};


import { getAuth } from 'firebase/auth';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth };
