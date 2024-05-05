<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import { v4 as uuidv4 } from "uuid";
    import { toast } from "svelte-sonner";
    import { addDoc, collection, doc, getDoc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import Toaster from "$lib/components/ui/sonner/sonner.svelte";
    import { Label } from "$lib/components/ui/label/index.js";
    import { getAuth } from "firebase/auth";
    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

    let title = "";
    let content = "";
    let errorMessage = "";
    let file: File | null = null;

    const onFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            file = input.files[0];
        }
    };

    const createPost = async () => {
        try {
            const authInstance = getAuth();
            const user = authInstance.currentUser;
            let userName = "";
            if (user) {
                userName = user.displayName || (user.email ? user.email.split("@")[0] : "");
            }
            let userId = user ? user.uid : null;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const userDocRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            let imageUrl = "";
            if (file) {
                const storage = getStorage();
                const uniqueId = uuidv4();
                const storageRef = ref(storage, `${userId}/posts/${uniqueId}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        () => {
                            // You can use this section to display the upload progress
                        },
                        (error) => {
                            console.error("Upload failed", error);
                            reject(error);
                        },
                        async () => {
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(null);
                        },
                    );
                });
            }

            await addDoc(collection(firestore, "posts"), {
                title,
                content,
                userId,
                userName,
                group: userData?.group || "default",
                timestamp: Date.now(),
                imageUrl,
            });
            toast.success("Post created successfully", {
                description: `Title: ${title}, Content: ${content}`,
                action: {
                    label: "Dismiss",
                    onClick: () => toast.dismiss(),
                },
            });
            title = "";
            content = "";
        } catch (e) {
            console.error("Error creating posts", e);
            errorMessage = (e as Error).message;
            toast.error("Error creating post", {
                description: errorMessage,
                action: {
                    label: "Dismiss",
                    onClick: () => toast.dismiss(),
                },
            });
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
                        class="mb-4 small-textarea mt-4"
                    />
                    <Label for="content">Content</Label>
                    <Textarea
                        id="content"
                        bind:value="{content}"
                        placeholder="Enter the content of your post here..."
                        class="mb-4 text-lg mt-4"
                    />
                    <Label for="image">Image</Label>
                    <input type="file" id="image" on:change="{onFileChange}" class="mb-4 mt-4" />
                </div>
                <Drawer.Footer>
                    <div style="display: flex; align-items: center;">
                        <Drawer.Close asChild let:builder>
                            <div class="center-button">
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
                            </div>
                        </Drawer.Close>
                    </div>
                </Drawer.Footer>
            </div>
        </Drawer.Content>
    </Drawer.Root>

    {#if errorMessage}
        <Toaster>
            {errorMessage}
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
    .center-button {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    @media (max-width: 768px) {
        .post-button {
            right: 10%;
            width: 80%;
            height: 50px;
        }
    }

    .p-4 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
