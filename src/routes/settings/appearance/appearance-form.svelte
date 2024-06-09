<script lang="ts" context="module">
    import { z } from "zod";

    export const appearanceFormSchema = z.object({
        theme: z.enum(["auto", "light", "dark"], {
            required_error: "Please select a theme.",
        }),
    });

    export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
    import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Form from "$lib/components/ui/new-york/form/index";
    import * as RadioGroup from "$lib/components/ui/new-york/radio-group/index.js";
    import { Label } from "$lib/components/ui/new-york/label/index.js";
    import { onMount } from "svelte";
    import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { getDoc } from "firebase/firestore";
    import { routes } from "$lib/routes";
    import { goto } from "$app/navigation";

    export let data: SuperValidated<Infer<AppearanceFormSchema>>;
    const form = superForm(data, {
        validators: zodClient(appearanceFormSchema),
    });
    const { form: formData, enhance } = form;

    let auth;
    let user: User | null = null;
    let userId: string | null = null;

    let selectedTheme = "auto";
    const themes = ["auto", "light", "dark"];
    function sortThemes() {
        return themes.sort((a, b) => (a === selectedTheme ? -1 : b === selectedTheme ? 1 : 0));
    }

    async function updateUserData() {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        userId = user ? user.uid : null;

        if (userId) {
            const userDocRef = doc(firestore, "users", userId);

            const selectedTheme = $formData.theme;

            await setDoc(userDocRef, { theme: selectedTheme }, { merge: true });
        }

        form.reset();

        location.reload();
    }

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, async (userAuth) => {
            if (!userAuth) {
                await goto(routes.LOGIN);
            } else {
                user = userAuth;
                userId = user.uid;
                const userDocRef = doc(firestore, "settings", userId);

                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data() as { theme: "auto" | "light" | "dark" };

                if (userData) {
                    $formData = userData;
                } else {
                    throw new Error("User data is invalid");
                }
            }
        });
    });
</script>

<form method="POST" use:enhance class="space-y-8">
    <Form.Fieldset {form} name="theme">
        <Form.Legend>Theme</Form.Legend>
        <Form.Description>Select the theme for the dashboard.</Form.Description>
        <Form.FieldErrors />
        <RadioGroup.Root
            class="grid max-w-full grid-cols-1 md:grid-cols-3 gap-8 pt-2"
            orientation="horizontal"
            bind:value="{$formData.theme}"
        >
            <Form.Control let:attrs>
                <Label class="[&:has([data-state=checked])>div]:border-primary">
                    <RadioGroup.Item {...attrs} value="auto" class="sr-only" />
                    <div
                        class="{$formData.theme === 'auto'
                            ? 'ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60'
                            : ''} flex items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
                    >
                        <div class="w-1/2 space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-2 w-[40px] rounded-lg bg-[#ecedef]"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                        </div>
                        <div class="w-1/2 space-y-2 rounded-sm bg-slate-950 p-2">
                            <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-2 w-[40px] rounded-lg bg-slate-400"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-slate-400"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-slate-400"></div>
                                <div class="h-2 w-[50px] rounded-lg bg-slate-400"></div>
                            </div>
                        </div>
                    </div>
                    <span class="block w-full p-2 text-center font-normal"> Auto </span>
                </Label>
            </Form.Control>
            <Form.Control let:attrs>
                <Label class="[&:has([data-state=checked])>div]:border-primary">
                    <RadioGroup.Item {...attrs} value="light" class="sr-only" />
                    <div
                        class="{$formData.theme === 'light'
                            ? 'ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60'
                            : ''} items-center rounded-md border-2 border-muted p-1 hover:border-accent"
                    >
                        <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
                            </div>
                        </div>
                    </div>
                    <span class="block w-full p-2 text-center font-normal"> Light </span>
                </Label>
            </Form.Control>
            <Form.Control let:attrs>
                <Label class="[&:has([data-state=checked])>div]:border-primary">
                    <RadioGroup.Item {...attrs} value="dark" class="sr-only" />
                    <div
                        class="{$formData.theme === 'dark'
                            ? 'ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60'
                            : ''} items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
                    >
                        <div class="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-2 w-[80px] rounded-lg bg-slate-400"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-slate-400"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
                            </div>
                            <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div class="h-4 w-4 rounded-full bg-slate-400"></div>
                                <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
                            </div>
                        </div>
                    </div>
                    <span class="block w-full p-2 text-center font-normal"> Dark </span>
                </Label>
            </Form.Control>
            <RadioGroup.Input name="theme" />
        </RadioGroup.Root>
    </Form.Fieldset>
    <Form.Button class="w-full md:w-auto" on:click="{updateUserData}">Update preferences</Form.Button>
</form>

<style>
    @media (max-width: 768px) {
        form {
            padding: 10px;
        }
    }
</style>
