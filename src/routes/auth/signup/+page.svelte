<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { auth, createUserWithEmailAndPassword } from "$lib/firebase";
    import { updateProfile } from "firebase/auth";
    import googleIcon from "$lib/components/ui/Google.svg";

    import { continueWithGoogle } from "$lib/googleAuth";

    import { routes } from "$lib/routes";

    let name = "";
    let email = "";
    let password = "";
    let confirmPassword = "";

    const signup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: name,
                    photoURL: "default",
                });
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
                        <Label for="name">Name</Label>
                        <Input bind:value="{name}" id="name" placeholder="Your name" />
                    </div>
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
                <Button on:click="{signup}">Sign Up</Button>
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
