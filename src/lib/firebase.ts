import { initializeApp } from "firebase/app";
import {
    query,
    orderBy,
    limit,
    startAfter,
    collection,
    getDocs,
    getFirestore,
    QueryDocumentSnapshot,
    doc,
    setDoc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
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
    apiKey: "AIzaSyBjINey1Rhf45R9wyUkZMP26E027tNx_E4",
    authDomain: "linkedout-bf642.firebaseapp.com",
    projectId: "linkedout-bf642",
    storageBucket: "linkedout-bf642.appspot.com",
    messagingSenderId: "736199130601",
    appId: "1:736199130601:web:0bc87bdedbff1dff39df78",
    measurementId: "G-LJKWWMZ1PX",
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
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc
};
