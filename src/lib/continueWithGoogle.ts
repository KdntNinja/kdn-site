import { auth, GoogleAuthProvider, signInWithPopup, getFirestore, doc, setDoc, getDoc } from "$lib/firebase";
import { routes } from "$lib/routes";

export const continueWithGoogle = async () => {
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
        window.location.href = routes.POSTS;
    } catch (error) {
        console.error(error);
    }
};
