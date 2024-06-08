<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label";
    import { Switch } from "$lib/components/ui/switch";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import type { PostModel } from "$lib/models";
    import EditPost from "./EditPost.svelte";
    import { getDoc, doc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { onMount } from "svelte";
    import { routes } from "$lib/routes";
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    export let post: PostModel;
    let isEditing = false;
    let isAdmin = false;

    let auth;
    let currentUserId: string | null = null;
    let selectedGroup;

    const postUpdated = () => {
        isEditing = false;
    };

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            } else {
                currentUserId = user.uid;
                const userDocRef = doc(firestore, "users", currentUserId);
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

<div class="post-card">
    <div class="post-header">
        <div class="post-author">
            <Badge>{post.userName}</Badge>
        </div>
    </div>
    <div class="post-content">
        <div class="title-text">
            <h2>{post.title}</h2>
            <br />
        </div>
        <div>
            <p>{post.content}</p>
        </div>
        <div>
            {#if post.imageUrl}
                <img src="{post.imageUrl}" alt="NoImage" />
            {/if}
        </div>
        <div class="post-timestamp">
            <Separator orientation="horizontal" />
            <Separator orientation="horizontal" />
            <Separator orientation="horizontal" />
            <p>{new Date(post.timestamp).toLocaleString()}</p>
        </div>
        <div class="flex items-center space-x-2 edit-button">
            {#if post.userId === currentUserId || isAdmin}
                <Switch id="edit-mode" bind:checked="{isEditing}" />
                <Label for="edit-mode">Edit</Label>
            {/if}
        </div>
        <div>
            <p>Made in China</p>
        </div>
    </div>
</div>

{#if isEditing && (post.userId === currentUserId || isAdmin)}
    <EditPost postId="{post.id}" on:postUpdated="{postUpdated}" on:close="{() => (isEditing = false)}" />
{/if}

<style>
    .title-text {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .post-card {
        width: 90%;
        margin: 20px auto;
        background-color: #222;
        color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .edit-button {
        justify-content: right;
    }
    @media (max-width: 768px) {
        .post-card {
            padding: 10px;
        }
    }
</style>
