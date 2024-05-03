<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import { addDoc, collection } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import Toaster from "$lib/components/ui/sonner/sonner.svelte";
    import { Label } from "$lib/components/ui/label/index.js";
    import { auth } from "$lib/firebase";
    import { userName } from "$lib/userStore";

    let title = "";
    let content = "";
    let message = "";
    let errorMessage = "";

    const createPost = async () => {
        try {
            const userId = auth.currentUser ? auth.currentUser.uid : null;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const docRef = await addDoc(collection(firestore, "posts"), {
                title,
                content,
                userId,
                userName: $userName,
            });
            message = "Post created successfully";
            title = "";
            content = "";
        } catch (e) {
            console.error("Error creating posts", e);
            errorMessage = (e as Error).message;
        }
    };
</script>

<div class="post-button">
    <Drawer.Root>
        <Drawer.Trigger asChild let:builder>
            <Button builders="{[builder]}" variant="outline">Create Post</Button>
        </Drawer.Trigger>
        <Drawer.Content>
            <div class="mx-auto w-full max-w-sm">
                <Drawer.Header>
                    <Drawer.Title>Create a new post</Drawer.Title>
                </Drawer.Header>
                <div class="p-4 pb-0">
                    <Label for="title">Title</Label>
                    <Textarea
                        id="title"
                        bind:value="{title}"
                        placeholder="Enter the title of your post here..."
                        class="mb-4 small-textarea"
                    />
                    <Label for="content">Content</Label>
                    <Textarea
                        id="content"
                        bind:value="{content}"
                        placeholder="Enter the content of your post here..."
                        class="mb-4 text-lg"
                    />
                </div>
                <Drawer.Footer>
                    <div style="display: flex; align-items: center;">
                        <Drawer.Close asChild let:builder>
                            <Button
                                builders="{[builder]}"
                                on:click="{createPost}"
                                aria-label="Create Post"
                                class="mr-4 font-bold py-2 px-4 rounded"
                                disabled="{!title || !content}"
                            >
                                {#if title && content}
                                    Create Post
                                {:else if title}
                                    Fill in the content
                                {:else if content}
                                    Fill in the title
                                {:else}
                                    Fill in the title and content
                                {/if}
                            </Button>
                        </Drawer.Close>
                    </div>
                </Drawer.Footer>
            </div>
        </Drawer.Content>
    </Drawer.Root>

    {#if message}
        <Toaster>
            {message}
        </Toaster>
    {/if}

    {#if errorMessage}
        <Toaster>
            {errorMessage}
        </Toaster>
    {/if}
</div>

<style>
    .post-button {
        position: absolute;
        top: 0;
        left: auto;
        right: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .p-4 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
