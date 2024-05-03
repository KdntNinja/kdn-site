<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import { onMount } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, getDocs } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { routes } from "$lib/routes";

    interface Post {
        title: string;
        content: string;
        userId: {
            uid: string;
        };
    }

    let auth;
    let posts: Post[] = [];

    const fetchPosts = async () => {
        const postCollection = collection(firestore, "posts");
        const postSnapshot = await getDocs(postCollection);
        posts = postSnapshot.docs.map((doc) => ({ userId: { uid: doc.id }, ...doc.data() }) as Post);
    };

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            } else {
                fetchPosts();
            }
        });
    });
</script>

<div class="centered">
    <Table.Root>
        {#if !posts.length}
            <Table.Caption>No posts found.</Table.Caption>
        {/if}
        <Table.Body>
            {#each posts as post}
                <Table.Row>
                    <Table.Cell class="font-medium">{post.userId.uid}</Table.Cell>
                    <Table.Cell>{post.title}</Table.Cell>
                    <Table.Cell>{post.content}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

<style>
    .centered {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
        width: 50vw;
        margin: 35px auto 0 auto;
        padding: 20px;
    }
</style>
