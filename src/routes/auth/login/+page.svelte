<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import {
        auth,
        signInWithEmailAndPassword,
        getFirestore,
        doc,
        getDoc,
        setDoc,
        setPersistence,
        browserSessionPersistence,
    } from "$lib/firebase";
    import googleIcon from "../../../Google.svg";
    import { continueWithGoogle } from "$lib/continueWithGoogle";

    import { routes } from "$lib/routes";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";

    let email = "";
    let password = "";

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = isMobileDevice() ? routes.POSTS : routes.PAGES;
            }
        });
    });

    const login = async (email: string, password: string) => {
        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }
        const db = getFirestore();
        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
                window.location.href = isMobileDevice() ? routes.POSTS : routes.PAGES;
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>

<div class="card-container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>Enter your credentials to login.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="email">Email</Label>
                        <Input bind:value="{email}" id="email" placeholder="Your email" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input bind:value="{password}" id="password" type="password" placeholder="Your password" />
                    </div>
                </div>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-between">
            <div class="flex justify-center">
                <Button
                    on:click="{(e) => {
                        e.preventDefault();
                        login(email, password);
                    }}">Login</Button
                >
                <button on:click="{continueWithGoogle}" class="ml-4">
                    <img src="{googleIcon}" alt="Google logo" />
                </button>
            </div>
        </Card.Footer>
        <div class="flex justify-center p-4">
            <a href="{routes.SIGNUP}" class="text-blue-500 hover:underline">Don't have an account? Sign Up</a>
        </div>
    </Card.Root>
</div>
