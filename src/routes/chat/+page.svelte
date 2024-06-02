<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import Post from "$lib/elements/CreatePost.svelte";
    import ShowPosts from "$lib/elements/ShowPosts.svelte";
    import { routes } from "$lib/routes";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import { collection, doc, getDocs, query, updateDoc, deleteDoc } from "firebase/firestore";
    import { firestore, getDoc } from "$lib/firebase";
    import { toast } from "svelte-sonner";

    let auth;
    let isAdmin: boolean = false;
    let userId: string | null = null;
    let selectedGroup: string = "default";

    const changeGroup = async (newGroup: string) => {
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const userDocRef = doc(firestore, "users", userId);
        await updateDoc(userDocRef, {
            group: newGroup,
        });
    };

    const swapGroup = async () => {
        selectedGroup = selectedGroup === "family" ? "default" : "family";
        await changeGroup(selectedGroup);
        location.reload();
    };

    const clearPosts = async () => {
        if (!isAdmin) {
            throw new Error("User not authenticated");
        }
        const postCollection = collection(firestore, "groups", selectedGroup, "posts");
        const postQuery = query(postCollection);
        const snapshot = await getDocs(postQuery);
        let deletedCount = 0;
        for (const doc1 of snapshot.docs) {
            await deleteDoc(doc1.ref);
            deletedCount++;
        }
        toast.success(`Successfully deleted ${deletedCount} post(s).`);
    };

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            } else {
                userId = user.uid;
                const userDocRef = doc(firestore, "users", userId);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                if (!userData || !userData.group) {
                    throw new Error("User data is invalid");
                }
                isAdmin = userData.isAdmin;
                selectedGroup = userData.group;
            }
        });
    });
</script>

<main>
    {#if isAdmin}
        <div class="top-spacer">
            <Sheet.Root>
                <Sheet.Trigger asChild let:builder>
                    <Button builders="{[builder]}" variant="secondary" class="open-button">Open</Button>
                </Sheet.Trigger>
                <Sheet.Content side="right">
                    <Sheet.Header>
                        <Sheet.Title class="chat-features-title">Chat Features</Sheet.Title>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div class="grid gap-4 py-4">
                            <div class="top-spacer">
                                <div class="button-container">
                                    {#if isAdmin}
                                        <Post />
                                        <Sheet.Close asChild let:builder>
                                            <Button
                                                builders="{[builder]}"
                                                on:click="{swapGroup}"
                                                class="swap-group-button justify-left"
                                                title="Swap Group"
                                            >
                                                <span>{selectedGroup === "family" ? "family" : "default"}</span>
                                            </Button>
                                        </Sheet.Close>
                                        <Sheet.Close asChild let:builder>
                                            <Dialog.Root>
                                                <Dialog.Trigger class="{buttonVariants({ variant: 'outline' })}"
                                                    >Delete Posts</Dialog.Trigger
                                                >
                                                <Dialog.Content class="sm:max-w-[425px]">
                                                    <Dialog.Header>
                                                        <Dialog.Title>Delete profile</Dialog.Title>
                                                        <Dialog.Description>
                                                            Are you sure you want to delete all posts? This action
                                                            cannot be undone.
                                                        </Dialog.Description>
                                                    </Dialog.Header>
                                                    <Dialog.Footer>
                                                        <Button
                                                            builders="{[builder]}"
                                                            on:click="{clearPosts}"
                                                            class="clear-posts-button"
                                                        >
                                                            Confirm Delete
                                                        </Button>
                                                    </Dialog.Footer>
                                                </Dialog.Content>
                                            </Dialog.Root>
                                        </Sheet.Close>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </Sheet.Content>
                    <Sheet.Footer>
                        <Sheet.Close asChild let:builder>
                            <Button builders="{[builder]}" type="submit" title="Save Changes">Save changes</Button>
                        </Sheet.Close>
                    </Sheet.Footer>
                </Sheet.Content>
            </Sheet.Root>
        </div>
    {:else}
        <div class="top-spacer">
            <Post />
        </div>
    {/if}

    <ShowPosts />
</main>

<style>
    .top-spacer {
        position: absolute;
        top: 0;
        left: auto;
        right: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .open-button {
        font-size: 20px;
        padding: 10px 20px;
    }

    .chat-features-title {
        font-size: 24px;
        font-weight: bold;
    }

    .warning-button {
        background-color: red;
        color: white;
    }

    .swap-group-button,
    .clear-posts-button {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .button-container {
        margin: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
