<script lang="ts" context="module">
    import { z } from "zod";
    export const profileFormSchema = z.object({
        username: z
            .string()
            .min(2, "Username must be at least 2 characters.")
            .max(15, "Username must not be longer than 15 characters"),
        bio: z.string().min(4).max(160),
        urls: z.array(z.string().url()).default(["https://kdnsite.xyz"]),
    });
    export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
    import * as Form from "$lib/components/ui/new-york/form/index.js";
    import * as Select from "$lib/components/ui/new-york/select/index.js";
    import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { onMount, tick } from "svelte";
    import { Input } from "$lib/components/ui/new-york/input/index.js";
    import { Button } from "$lib/components/ui/new-york/button/index.js";
    import { Textarea } from "$lib/components/ui/new-york/textarea/index.js";
    import { cn } from "$lib/utils.js";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, doc, getDocs, query, setDoc, where, getDoc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { onSnapshot } from "firebase/firestore";
    import { routes } from "$lib/routes";
    import type { User } from "firebase/auth";

    export let data: SuperValidated<Infer<ProfileFormSchema>>;
    const form = superForm(data, {
        validators: zodClient(profileFormSchema),
    });
    const { form: formData, enhance } = form;

    let auth;
    let user: User | null = null;
    let userId: string | null = null;

    function addUrl() {
        $formData.urls = [...$formData.urls, ""];

        tick().then(() => {
            const urlInputs = Array.from(document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']"));
            const lastInput = urlInputs[urlInputs.length - 1];
            lastInput && lastInput.focus();
        });
    }

    function deleteUrl(index: number) {
        $formData.urls = $formData.urls.filter((_, i) => i !== index);
    }

    async function updateUserData(event: Event) {
        event.preventDefault();

        const authInstance = getAuth();
        const user = authInstance.currentUser;
        userId = user ? user.uid : null;

        if (userId) {
            const userDocRef = doc(firestore, "profiles", userId);

            const querySnapshot = await getDocs(query(collection(firestore, "profiles"), where("username", "==", $formData.username)));

            const usernameExists = querySnapshot.docs.some(doc => doc.id !== userId);

            if (usernameExists) {
                console.log("Username is already taken");
                window.location.reload();
            } else {
                if ($formData.username.trim() === "") {
                    console.log("Username cannot be empty");
                    window.location.reload();
                } else {
                    try {
                        console.log("Saving data:", $formData);
                        await setDoc(userDocRef, $formData);
                        window.location.reload();
                    } catch (error) {
                        console.error("Failed to update user data:", error);
                        window.location.reload();
                    }
                }
            }
        }
    }

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, async (userAuth) => {
            if (!userAuth) {
                window.location.href = routes.LOGIN;
            } else {
                user = userAuth;
                userId = user.uid;
                const userDocRef = doc(firestore, "profiles", userId);

                onSnapshot(userDocRef, (doc) => {
                    const userData = doc.data() as { username: string; bio: string; urls: string[] };
                    if (userData) {
                        $formData = userData;
                    } else {
                        throw new Error("User data is invalid");
                    }
                });
            }
        });
    });
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input
                placeholder="{user ? user.displayName || (user.email ? user.email.split('@')[0] : '') : ''}"
                {...attrs}
                bind:value={$formData.username}
            />
        </Form.Control>
        <Form.Description>
            This is your public display name. It can be your real name or a pseudonym.
        </Form.Description>
        <Form.FieldErrors class="text-red-500" />
    </Form.Field>
    <Form.Field {form} name="bio">
        <Form.Control let:attrs>
            <Form.Label>Bio</Form.Label>
            <Textarea {...attrs} bind:value="{$formData.bio}" />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <div>
        <Form.Fieldset {form} name="urls">
            <Form.Legend>URLs</Form.Legend>
            {#each $formData.urls as _, i}
                <Form.ElementField {form} name="urls[{i}]">
                    <Form.Description class="{cn(i !== 0 && 'sr-only')}">
                        Add links to your website, blog, or social media profiles.
                    </Form.Description>
                    <Form.Control let:attrs>
                        <div class="flex items-center">
                            <Input {...attrs} bind:value="{$formData.urls[i]}" class="flex-grow" />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                class="ml-2"
                                on:click="{() => deleteUrl(i)}"
                            >
                                Delete URL
                            </Button>
                        </div>
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.ElementField>
            {/each}
        </Form.Fieldset>
        <Button type="button" variant="outline" size="sm" class="mt-2" on:click="{addUrl}">Add URL</Button>
    </div>
    <button
        on:click|preventDefault="{updateUserData}"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
        Update profile
    </button>
</form>
