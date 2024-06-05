import { auth, GoogleAuthProvider, signInWithPopup, getFirestore, doc, setDoc, getDoc } from "$lib/firebase";
import { routes } from "$lib/routes";
import { sendEmailVerification } from "firebase/auth";

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
            if (user.email && !user.emailVerified) {
                await sendEmailVerification(user);
            }
        }
        window.location.href = routes.POSTS;
    } catch (error) {
        console.error(error);
    }
};