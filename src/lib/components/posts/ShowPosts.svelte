<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";

    import { Button } from "$lib/components/ui/button/index.js";
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
            avatar: string;
            name: string;
            badge: string;
        };
    }

    let auth: ReturnType<typeof getAuth>;
    let posts: Post[] = [];
    let ShowPosts;
    let loading = true;

    const fetchPosts = async () => {
        try {
            const postCollection = collection(firestore, "posts");
            const postSnapshot = await getDocs(postCollection);
            posts = postSnapshot.docs.map((doc) => ({ userId: { uid: doc.id }, ...doc.data() }) as Post);
            loading = false;
        } catch (err) {
            console.error(err instanceof Error ? err.message : "An unknown error occurred");
        }
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

<div class="posts-container">
    <div class="post-card">
        {#each posts as post}
            <Card.Root>
                <Card.Header>
                    <div class="items-center post-title-spacer post-title-spacing">
                        <Badge class="post-title-spacing">{post.userId.name}</Badge>
                        <Card.Title>{post.title}</Card.Title>
                    </div>
                </Card.Header>
                <Separator orientation="horizontal" />
                <Separator orientation="horizontal" />
                <Separator orientation="horizontal" />
                <Card.Content>
                    <p>{post.content}</p>
                </Card.Content>
                <Card.Footer class="flex justify-between">
                    {#if post.userId.uid === (auth.currentUser ? auth.currentUser.uid : null)}
                        <Button variant="outline">Delete</Button>
                    {/if}
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
</div>

<style>
    .posts-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .post-card {
        width: 25%;
        margin-bottom: 20px;
    }
    .post-title-spacer {
        display: flex;
        justify-content: flex-start;
    }
    .post-title-spacing {
        margin-right: 0.5rem;
    }
</style>
