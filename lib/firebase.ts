"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase project for storing Giz da Imaginacao products
const firebaseConfig = {
  apiKey: "AIzaSyAXIKmgTnUs-dLZJ8DCDovRo4YLfIjHdck",
  authDomain: "gizdaimaginacao.firebaseapp.com",
  projectId: "gizdaimaginacao",
  storageBucket: "gizdaimaginacao.firebasestorage.app",
  messagingSenderId: "909337557738",
  appId: "1:909337557738:web:a6769cabc007b376f37593",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export { firebaseApp };
