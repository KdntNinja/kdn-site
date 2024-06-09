<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import { v4 as uuidv4 } from "uuid";
    import { toast } from "svelte-sonner";
    import { addDoc, collection, doc, getDoc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { Textarea } from "$lib/components/ui/textarea";
    import Button from "../components/ui/button/button.svelte";
    import Toaster from "$lib/components/ui/sonner/sonner.svelte";
    import { Label } from "$lib/components/ui/label";
    import { getAuth } from "firebase/auth";
    import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
    import imageCompression from "browser-image-compression";

    let title = "";
    let content = "";
    let errorMessage = "";
    let file: File | null = null;

    const onFileChange = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const uploadedFile = input.files[0];
            const fileType = uploadedFile.type;

            const allowedFileTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/bmp",
                "image/svg+xml",
                "image/webp",
            ];

            if (allowedFileTypes.includes(fileType)) {
                const options = {
                    maxSizeMB: 3,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };
                try {
                    file = await imageCompression(uploadedFile, options);
                } catch (error) {
                    console.error("Error occurred while compressing the image.", error);
                    file = null;
                }
            } else {
                console.error("Invalid file type. Please upload an image file.");
                file = null;
            }
        }
    };

    const createPost = async () => {
        if (!title && !content && !file) {
            alert("Please fill in the title, content or attach an image.");
        }
        try {
            const authInstance = getAuth();
            const user = authInstance.currentUser;
            let userName = "";

            let userId = user ? user.uid : null;

            if (!userId) {
                throw new Error("User not authenticated");
            }
            const userDocRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            if (!userData || !userData.group) {
                throw new Error("User data is invalid");
            }

            if (user) {
                const userId = user.uid;
                const userNameDocRef = doc(firestore, "profiles", userId);
                const userDoc = await getDoc(userNameDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData && userData.username) {
                        userName = userData.username;
                    } else {
                        userName = user.displayName || (user.email ? user.email.split("@")[0] : "");
                    }
                }
            }

            let imageUrl = "";
            if (file) {
                const storage = getStorage();
                const uniqueId = uuidv4();
                const userGroup = userData.group;
                const storageRef = ref(storage, `${userGroup}/${userId}/${uniqueId}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        () => {},
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

            await addDoc(collection(firestore, "groups", userData.group, "posts"), {
                title,
                content,
                userId,
                userName,
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
                                    class="mr-4 font-bold py-2 px-4 rounded {!title && !content && !file
                                        ? 'disabled'
                                        : ''}"
                                    disabled="{!title && !content && !file}"
                                >
                                    {#if title || content || file}
                                        Create Post
                                    {:else}
                                        Fill in the title, content or attach an image.
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
            justify-content: right;
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
