<script lang="ts">
    import { onMount } from "svelte";
    import { getDoc, doc, updateDoc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import type { PostModel } from "$lib/models";
    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
    import { v4 as uuidv4 } from "uuid";
    import { Button } from "$lib/components/ui/button";
    import { createEventDispatcher } from "svelte";
    import { getAuth } from "firebase/auth";
    import imageCompression from "browser-image-compression";

    const dispatch = createEventDispatcher();

    export let postId: string;
    let post: PostModel | null = null;
    let file: File | null = null;
    let successMessage: string | null = null;
    let userData;
    let userId;

    onMount(async () => {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        userId = user ? user.uid : null;

        if (!userId) {
            throw new Error("User not authenticated");
        }
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);
        userData = userDoc.data();

        if (!userData || !userData.group) {
            throw new Error("User data is invalid");
        }

        const postDoc = await getDoc(doc(firestore, "groups", userData.group, "posts", postId));
        post = postDoc.data() as PostModel;
    });

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

    const updatePost = async () => {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
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

        let imageUrl = post?.imageUrl || "";
        if (post) {
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

            await updateDoc(doc(firestore, "groups", userData.group, "posts", postId), {
                title: post.title,
                content: post.content,
                imageUrl,
            });

            successMessage = "Post updated successfully!";
            dispatch("postUpdated");
        }
    };
</script>

<div class="edit-post">
    <h2>Edit Post</h2>
    {#if post}
        <form on:submit|preventDefault="{updatePost}">
            <label for="title">Title</label>
            <input id="title" bind:value="{post.title}" />

            <label for="content">Content</label>
            <textarea id="content" bind:value="{post.content}"></textarea>

            <label for="image">Image</label>
            <input type="file" id="image" on:change="{onFileChange}" />

            {#if post.imageUrl}
                <img src="{post.imageUrl}" alt="CurrentImage" class="current-image" />
            {/if}

            <Button type="submit" class="{!post.title && !file ? 'disabled' : ''}" disabled="{!post.title && !file}">
                Update Post
            </Button>
        </form>
        {#if successMessage}
            <p class="success-message">{successMessage}</p>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    .edit-post {
        width: 90%;
        margin: 20px auto;
        background-color: #222;
        color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .edit-post label {
        display: block;
        margin-bottom: 5px;
        color: #fff;
    }
    .edit-post textarea,
    .edit-post input {
        color: forestgreen;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: none;
    }
    .current-image {
        display: block;
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }
    .success-message {
        color: #4caf50;
    }
</style>
