<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { PostModel } from '$lib/models';
    import PostComponent from '$lib/components/elements/Post.svelte';

    let postId: string;
    let post: PostModel;

    onMount(async () => {
        postId = $page.params.postId;
    });
</script>

<main>
    <h1>Reply to Post</h1>
    <PostComponent {post} />
</main>