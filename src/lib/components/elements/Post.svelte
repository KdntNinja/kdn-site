<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import type { PostModel } from "$lib/models";


    export let post: PostModel;
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
    </div>
</div>

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

    @media (max-width: 768px) {
        .post-card {
            padding: 10px;
        }
    }
</style>