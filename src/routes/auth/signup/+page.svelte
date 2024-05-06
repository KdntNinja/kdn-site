<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { auth, createUserWithEmailAndPassword, getFirestore, doc, getDoc, setDoc } from "$lib/firebase";
    import googleIcon from "../../../Google.svg";
    import { continueWithGoogle, handleRedirectResult } from "$lib/continueWithGoogle";

    import { routes } from "$lib/routes";
    import { onMount } from "svelte";

    let name = "";
    let email = "";
    let password = "";
    let confirmPassword = "";

    onMount(async () => {
        await handleRedirectResult();
    });

    const signup = async (email: string, password: string) => {
        const db = getFirestore();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
</script>

<div class="card-container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Sign Up</Card.Title>
            <Card.Description>Create a new account.</Card.Description>
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
                    <div class="flex flex-col space-y-1.5">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            bind:value="{confirmPassword}"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-between">
            <div class="flex justify-center">
                <Button
                    on:click="{(e) => {
                        e.preventDefault();
                        signup(email, password);
                    }}">Sign Up</Button
                >
                <button on:click="{continueWithGoogle}" class="ml-4">
                    <img src="{googleIcon}" alt="Google logo" />
                </button>
            </div>
        </Card.Footer>
        <div class="flex justify-center p-4">
            <a href="{routes.LOGIN}" class="text-blue-500 hover:underline">Already have an account? Login</a>
        </div>
    </Card.Root>
</div>
