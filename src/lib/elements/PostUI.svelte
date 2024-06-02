<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label";
    import { Switch } from "$lib/components/ui/switch";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import type { PostModel } from "$lib/models";
    import EditPost from "./EditPost.svelte";
    import { getAuth } from "firebase/auth";
    import { Button } from "$lib/components/ui/button";

    export let post: PostModel;
    let isEditing = false;

    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;

    const postUpdated = () => {
        isEditing = false;
    };
</script>

<div class="post-card">
    <div class="post-header">
        <div class="post-author">
            <Badge>{post.userName}</Badge>
        </div>
    </div>
    <div class="post-content">
        <div class="post-title">
            <h2>{post.title}</h2>
        </div>
        <div class="post-text">
            <p>{post.content}</p>
        </div>
        <div class="post-image">
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
            {#if post.userId === currentUserId}
                <Switch id="edit-mode" bind:checked="{isEditing}" />
                <Label for="edit-mode">Edit</Label>
            {/if}
        </div>
    </div>
</div>

{#if isEditing && post.userId === currentUserId}
    <EditPost postId="{post.id}" on:postUpdated="{postUpdated}" on:close="{() => (isEditing = false)}" />
{/if}

<style>
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
    .delete-button {
        justify-content: left;
    }

    @media (max-width: 768px) {
        .post-card {
            padding: 10px;
        }
    }
</style>
