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
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOicMl0t0Z3dDKnRM8gAfr2phKqwaAiDs",
    authDomain: "linkedout-fe8e8.firebaseapp.com",
    projectId: "linkedout-fe8e8",
    storageBucket: "linkedout-fe8e8.appspot.com",
    messagingSenderId: "407055288715",
    appId: "1:407055288715:web:661f156f5dbcfefd7c478e",
    measurementId: "G-1XEYK2GNKZ",
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
    getDoc,
    setPersistence,
    browserSessionPersistence,
};
