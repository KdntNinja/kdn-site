import { auth, GoogleAuthProvider, getFirestore, doc, setDoc, getDoc } from "$lib/firebase";
import { routes } from "$lib/routes";
import { inMemoryPersistence, setPersistence, signInWithRedirect, getRedirectResult } from "firebase/auth";

export const continueWithGoogle = async () => {
    try {
        await setPersistence(auth, inMemoryPersistence);
    } catch (error) {
        console.error("Failed to set persistence:", error);
    }

    const provider = new GoogleAuthProvider();
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error(error);
    }
};

export const handleRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        const user = result?.user;
        if (user) {
            const db = getFirestore();
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
            window.location.href = routes.HOME;
        }
    } catch (error) {
        console.error(error);
    }
};