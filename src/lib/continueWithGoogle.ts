import { auth, GoogleAuthProvider, signInWithPopup, getFirestore, doc, setDoc, getDoc } from "$lib/firebase";
import { routes } from "$lib/routes";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

export const continueWithGoogle = async () => {
    try {
        await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
        console.error("Failed to set persistence:",  error);
    }

    const provider = new GoogleAuthProvider();
    const db = getFirestore();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
                await setDoc(
                    userDocRef,
                    {
                        group: "default",
                        isAdmin: false,
                    },
                    { merge: true },
                );
            }
        }
        window.location.href = routes.HOME;
    } catch (error) {
        console.error(error);
    }
};