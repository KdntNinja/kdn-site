<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount, onDestroy } from "svelte";
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
    let intervalId: NodeJS.Timeout | number;

    const fetchPosts = async () => {
        try {
            const postCollection = collection(firestore, "posts");
            const postSnapshot = await getDocs(postCollection);
            posts = postSnapshot.docs.map((doc) => ({ userId: { uid: doc.id }, ...doc.data() }) as Post);
            posts = posts.reverse();
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
                intervalId = setInterval(fetchPosts, 1500);
            }
        });
    });

    onDestroy(() => {
        clearInterval(intervalId as number);
    });
</script>

<div class="svelte-scroll-area rounded-md border posts-container">
    <ScrollArea>
        <div class="p-4">
            {#each posts as post}
                <div class="post-card">
                    <div class="post-header post-author">
                        <Badge>{post.userId.name}</Badge>
                    </div>
                    <div class="post-content">
                        <div class="post-title">
                            <h2>{post.title}</h2>
                        </div>
                        <div class="post-content">
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <div class="post-footer">
                        {#if post.userId.uid === (auth.currentUser ? auth.currentUser.uid : null)}
                            <Button variant="outline">Delete</Button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </ScrollArea>
</div>

<style>
    .svelte-scroll-area {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        margin: auto;
    }
    .post-card {
        width: 100%;
        margin-bottom: 30px;
        border: 1px solid #444;
        background-color: #222;
        color: #fff;
        padding: 30px;
    }
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    .post-title h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 15px;
        color: #fff;
    }
    .post-content p {
        line-height: 1.5;
        color: #fff;
        margin-bottom: 15px;
    }
    .post-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }

    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 20px;
            width: 100%;
        }
        .post-card {
            padding: 15px;
        }
        .post-title h2 {
            font-size: 1.2em;
        }
        .post-content p {
            font-size: 0.9em;
        }
    }
</style>
