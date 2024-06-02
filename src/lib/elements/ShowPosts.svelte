<script lang="ts">
    import Post from "$lib/elements/PostUI.svelte";
    import { ScrollArea } from "$lib/components/ui/posts-scroll-box";
    import { onMount, onDestroy } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, onSnapshot, query, orderBy, getDoc, doc } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    import { routes } from "$lib/routes";
    import type { PostModel } from "$lib/models";

    let auth: ReturnType<typeof getAuth>;
    let posts: PostModel[] = [];
    let isLoading: boolean = false;
    let error: string | null = null;
    let initialLoad: boolean = true;
    let unsubscribe: (() => void) | null = null;
    let userId: string | null = null;

    const fetchPosts = async () => {
        const authInstance = getAuth();
        const user = authInstance.currentUser;
        userId = user ? user.uid : null;
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (!userData || !userData.group) {
            throw new Error("User data is invalid");
        }

        if (user) {
            const postCollection = collection(firestore, "groups", userData.group, "posts");
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
        } else {
            window.location.href = routes.LOGIN;
        }
    };


    onMount(async () => {
        auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            } else {
                await fetchPosts();
                initialLoad = false;
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
        <p>No posts found.</p>
    {:else if posts.length === 0}
        <p>{error}</p>
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
    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 30px;
            width: 100%;
        }
    }
</style>
