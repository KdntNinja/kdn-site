<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { ScrollArea } from "$lib/components/ui/posts-scroll-box/index.js";
    import { onMount, onDestroy } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
    import { firestore, doc } from "$lib/firebase";
    import { routes } from "$lib/routes";
    import type { Post } from "$lib/models";

    let auth: ReturnType<typeof getAuth>;
    let posts: Post[] = [];
    let intervalId: NodeJS.Timeout | number;
    let isLoading: boolean = false;
    let error: string | null = null;
    let initialLoad: boolean = true;

    const fetchPosts = async () => {
        isLoading = true;
        error = null;
        try {
            const postCollection = collection(firestore, "posts");
            const postSnapshot = await getDocs(query(postCollection, orderBy("timestamp", "desc")));
            if (auth.currentUser?.uid) {
                const userDocRef = doc(firestore, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                posts = postSnapshot.docs
                    .filter((doc) => doc.data().group === userData?.group)
                    .map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: data.title,
                            content: data.content,
                            userId: data.userId,
                            userName: data.userName,
                            group: data.group,
                            timestamp: data.timestamp,
                            imageUrl: data.imageUrl,
                        } as Post;
                    });
                initialLoad = false;
            }
        } catch (err) {
            error = err instanceof Error ? err.message : "An unknown error occurred";
        } finally {
            isLoading = false;
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

    onDestroy(() => {
        clearInterval(intervalId as number);
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
