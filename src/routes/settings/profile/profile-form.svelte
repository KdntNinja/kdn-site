<script lang="ts" context="module">
    import { z } from "zod";
    export const profileFormSchema = z.object({
        fields: z.object({
            username: z
                .string()
                .min(2, "Username must be at least 2 characters.")
                .max(15, "Username must not be longer than 15 characters"),
            bio: z.string().min(4).max(160).default(""),
            urls: z.array(z.string().url()).default(["https://kdnsite.xyz"]),
        })
    });
    export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
    import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { tick } from "svelte";
    import * as Form from "$lib/components/new-york/ui/form";
    import * as Select from "$lib/components/new-york/ui/select";
    import { Input } from "$lib/components/new-york/ui/input";
    import { Button } from "$lib/components/new-york/ui/button";
    import { Textarea } from "$lib/components/new-york/ui/textarea";
    import { cn } from "$lib/utils.js";
    import { browser } from "$app/environment";

    import { onMount } from "svelte";
    import { doc, setDoc, getDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { firestore } from "$lib/firebase";

    let defaultUserData = {
        fields: {
            username: '',
            bio: '',
            urls: []
        }
    };

    let userData = { ...defaultUserData };

    async function saveUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, $formData.fields, { merge: true });
            await loadUserData();
        }
    }

    async function loadUserData() {
        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(firestore, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        userData = { ...defaultUserData, ...userDoc.data() };
                    } else {
                        console.error(`No document found for user with id ${user.uid}`);
                    }
                } catch (error) {
                    console.error(`Failed to load user data: ${error}`);
                }
            } else {
                console.error('No user is currently authenticated');
            }
        });
    }

    async function onSubmit() {
        await saveUserData();
    }

    export let data: SuperValidated<Infer<ProfileFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(profileFormSchema),
        dataType: "json"
    });

    const { form: formData, enhance } = form;

    function addUrl() {
        $formData.fields.urls = [...$formData.fields.urls, ""];

        tick().then(() => {
            const urlInputs = Array.from(document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']"));
            const lastInput = urlInputs[urlInputs.length - 1];
            lastInput && lastInput.focus();
        });
    }

    onMount(async () => {
        await loadUserData();
        const formElement = document.getElementById('profile-form');
        enhance(formElement);
    });

    $: if (userData.fields) {
        $formData.fields = userData.fields;
    }
</script>

<form method="POST" class="space-y-8" id="profile-form" on:submit|preventDefault="{onSubmit}">
    <Form.Field {form} name="fields.username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input placeholder="@username" {...attrs} bind:value="{$formData.fields.username}" />
        </Form.Control>
        <Form.Description>This is your public display name. It can be your real name or a pseudonym.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="fields.bio">
        <Form.Control let:attrs>
            <Form.Label>Bio</Form.Label>
            <Textarea {...attrs} bind:value="{$formData.fields.bio}" />
        </Form.Control>
        <Form.Description>
            You can <span>@mention</span> other users and organizations to link to them.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <div>
        <Form.Fieldset {form} name="fields.urls">
            <Form.Legend>URLs</Form.Legend>
            {#each $formData.fields.urls as _, i}
                <Form.ElementField {form} name={`fields.urls[${i}]`}>
                    <Form.Description class="{cn(i !== 0 && 'sr-only')}">
                        Add links to your website, blog, or social media profiles.
                    </Form.Description>
                    <Form.Control let:attrs>
                        <Input {...attrs} bind:value="{$formData.fields.urls[i]}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.ElementField>
            {/each}
        </Form.Fieldset>
        <Button type="button" variant="outline" size="sm" class="mt-2" on:click="{addUrl}">Add URL</Button>
    </div>

    <Form.Button type="submit">Update profile</Form.Button>
</form>

{#if browser}
    <SuperDebug data="{$formData}" />
{/if}