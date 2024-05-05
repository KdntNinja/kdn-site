<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount, onDestroy } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
    import { firestore, doc } from "$lib/firebase";
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
            const postSnapshot = await getDocs(query(postCollection, orderBy("timestamp", "desc")));
            if (auth.currentUser?.uid) {
                const userDocRef = doc(firestore, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                if (userData?.group === "admin" || userData?.isAdmin) {
                    posts = postSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: data.title,
                            content: data.content,
                            userId: data.userId,
                            userName: data.userName,
                            group: data.group,
                            timestamp: data.timestamp,
                        } as Post;
                    });
                } else {
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
                            } as Post;
                        });
                }
            }
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

<div class="svelte-scroll-area rounded-md posts-container">
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
        margin-bottom: 20px;
        background-color: #222;
        color: #fff;
        padding: 20px;
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
    .post-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 20px;
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
