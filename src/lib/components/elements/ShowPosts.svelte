<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { ScrollArea } from "$lib/components/ui/posts-scroll-box/index.js";
    import { onMount, onDestroy } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { routes } from "$lib/routes";
    import type { Post } from "$lib/models";

    let auth: ReturnType<typeof getAuth>;
    let posts: Post[] = [];
    let isLoading: boolean = false;
    let error: string | null = null;
    let initialLoad: boolean = true;
    let unsubscribe: (() => void) | null = null;

    const fetchPosts = () => {
        const postCollection = collection(firestore, "posts");
        unsubscribe = onSnapshot(
            query(postCollection, orderBy("timestamp", "desc")),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    const post = {
                        id: change.doc.id,
                        title: data.title,
                        content: data.content,
                        userId: data.userId,
                        userName: data.userName,
                        group: data.group,
                        timestamp: data.timestamp,
                        imageUrl: data.imageUrl,
                    } as Post;

                    if (change.type === "added") {
                        posts = [post, ...posts];
                    } else if (change.type === "modified") {
                        const index = posts.findIndex((p) => p.id === post.id);
                        if (index !== -1) {
                            posts[index] = post;
                        }
                    } else if (change.type === "removed") {
                        posts = posts.filter((p) => p.id !== post.id);
                    }

                    // Sort the posts array in descending order by timestamp
                    posts.sort((a, b) => b.timestamp - a.timestamp);
                });
            },
            (err) => {
                error = err.message;
            },
        );
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

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<div class="svelte-scroll-area">
    {#if initialLoad && isLoading}
        <p>Loading...</p>
    {:else if error}
        <p>{error}</p>
    {:else if posts.length === 0}
        <p>No posts found.</p>
    {:else}
        <ScrollArea class="rounded-md justify-center p-4">
            <div class="p-4">
                {#each posts as post}
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
                            <div class="post-image">
                                <img src="{post.imageUrl}" alt="{post.title}" />
                            </div>
                            <div class="post-text">
                                <p>{post.content}</p>
                            </div>
                            <div class="post-timestamp">
                                <Separator orientation="horizontal" />
                                <Separator orientation="horizontal" />
                                <Separator orientation="horizontal" />
                                <p>{new Date(post.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </ScrollArea>
    {/if}
</div>

<style>
    .svelte-scroll-area {
        justify-content: center;
        align-items: center;
        width: 35%;
        height: 94vh;
        margin: auto;
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
    .post-title h2 {
        font-size: 1.6em;
        font-weight: bold;
        margin-bottom: 10px;
        color: #fff;
    }
    .post-content p {
        line-height: 1.5;
        color: #fff;
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 30px;
            width: 100%;
        }
        .post-card {
            padding: 10px;
        }
        .post-title h2 {
            font-size: 1.3em;
        }
        .post-content p {
            font-size: 0.9em;
        }
    }
</style>
