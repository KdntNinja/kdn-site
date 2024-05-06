<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import Post from "$lib/elements/PostUI.svelte";
    import { ScrollArea } from "$lib/components/ui/posts-scroll-box";
    import { onMount, onDestroy } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { routes } from "$lib/routes";
    import type { PostModel } from "$lib/models";

    let auth: ReturnType<typeof getAuth>;
    let posts: PostModel[] = [];
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

                        timestamp: data.timestamp,
                        imageUrl: data.imageUrl,
                    } as PostModel;

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
                    <Post {post} />
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
        .post-title h2 {
            font-size: 1.3em;
        }
        .post-content p {
            font-size: 0.9em;
        }
    }
</style>
