<script lang="ts" context="module">
    import { z } from "zod";
    export const profileFormSchema = z.object({
        username: z
            .string()
            .min(2, "Username must be at least 2 characters.")
            .max(15, "Username must not be longer than 15 characters"),
        bio: z.string().min(4).max(160).default(""),
        urls: z.array(z.string().url()).default(["https://kdnsite.xyz"]),
    });
    export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
    import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { tick } from "svelte";
    import * as Form from "$lib/components/new-york/ui/form/index";
    import * as Select from "$lib/components/new-york/ui/select/index.js";
    import { Input } from "$lib/components/new-york/ui/input/index.js";
    import { Button } from "$lib/components/new-york/ui/button/index.js";
    import { Textarea } from "$lib/components/new-york/ui/textarea/index.js";
    import { routes } from "$lib/routes";
    import { cn } from "$lib/utils.js";
    import { browser } from "$app/environment";

    import { onMount } from "svelte";
    import { doc, setDoc, getDoc } from "firebase/firestore";
    import { getAuth } from "firebase/auth";
    import { firestore } from "$lib/firebase";

    let userData = {};

    async function saveUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, userData, { merge: true });
        }
    }

    async function loadUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                userData = userDoc.data();
            }
        }
    }

    onMount(async () => {
        await loadUserData();
    });

    export let data: SuperValidated<Infer<ProfileFormSchema>>;

    const form = superForm(data, {
        validators: zodClient(profileFormSchema),
    });

    const { form: formData, enhance } = form;

    function addUrl() {
        $formData.urls = [...$formData.urls, ""];

        tick().then(() => {
            const urlInputs = Array.from(document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']"));
            const lastInput = urlInputs[urlInputs.length - 1];
            lastInput && lastInput.focus();
        });
    }
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input placeholder="@username" {...attrs} bind:value="{$formData.username}" />
        </Form.Control>
        <Form.Description>This is your public display name. It can be your real name or a pseudonym.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="bio">
        <Form.Control let:attrs>
            <Form.Label>Bio</Form.Label>
            <Textarea {...attrs} bind:value="{$formData.bio}" />
        </Form.Control>
        <Form.Description>
            You can <span>@mention</span> other users and organizations to link to them.
        </Form.Description>
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
                        <Input {...attrs} bind:value="{$formData.urls[i]}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.ElementField>
            {/each}
        </Form.Fieldset>
        <Button type="button" variant="outline" size="sm" class="mt-2" on:click="{addUrl}">Add URL</Button>
    </div>

    <Form.Button>Update profile</Form.Button>
</form>

{#if browser}
    <SuperDebug data="{$formData}" />
{/if}
