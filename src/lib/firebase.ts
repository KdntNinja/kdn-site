import { initializeApp } from "firebase/app";
import { getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { query, orderBy, limit, startAfter, collection, getDocs } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAdW6pft22SorhcmcaNT8CCK517Li0hjqg",
    authDomain: "linkedout-98516.firebaseapp.com",
    projectId: "linkedout-98516",
    storageBucket: "linkedout-98516.appspot.com",
    messagingSenderId: "650404596688",
    appId: "1:650404596688:web:2d25e753517a684b3cc7d5",
    measurementId: "G-MRY45J7JS9",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    query,
    orderBy,
    limit,
    startAfter,
    QueryDocumentSnapshot,
    onAuthStateChanged,
    collection,
    getDocs,
};
