<script lang="ts" context="module">
    import { z } from "zod";
    export const profileFormSchema = z.object({
        username: z
            .string()
            .min(2, "Username must be at least 2 characters.")
            .max(15, "Username must not be longer than 15 characters"),
        bio: z.string().min(4).max(160).default("A LinkLoop user."),
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
    import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
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

    async function updateUserData() {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        userId = user ? user.uid : null;

        if (userId) {
            const userDocRef = doc(firestore, "profiles", userId);
            const usernameDocRef = doc(firestore, "usernames", $formData.username);

            const usernameDoc = await getDoc(usernameDocRef);
            if (usernameDoc.exists()) {
                const usernameData = usernameDoc.data();
                if (usernameData && usernameData.userId !== userId) {
                    throw new Error("Username is already taken");
                }
            }

            await setDoc(usernameDocRef, { userId });
            await setDoc(userDocRef, $formData);
        }
        location.reload();
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
                bind:value="{$formData.username}"
            />
        </Form.Control>
        <Form.Description>
            This is your public display name. It can be your real name or a pseudonym.
        </Form.Description>
        <Form.FieldErrors />
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
    <Form.Button on:click="{updateUserData}">Update profile</Form.Button>
</form>
