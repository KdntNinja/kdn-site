<script lang="ts">
    import Post from "$lib/elements/CreatePost.svelte";
    import ShowPosts from "$lib/elements/ShowPosts.svelte";
    import { routes } from "$lib/routes";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from "svelte";
    import { collection, doc, getDocs, query, updateDoc, deleteDoc } from "firebase/firestore";
    import { firestore, getDoc } from "$lib/firebase";
    import { Label } from "$lib/components/ui/label";

    let auth;
    let isAdmin: boolean = false;
    let userId: string | null = null;
    let selectedGroup: string = "default";

    const changeGroup = async (newGroup: string) => {
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const userDocRef = doc(firestore, "users", userId);
        await updateDoc(userDocRef, {
            group: newGroup,
        });
    };

    const swapGroup = async () => {
        selectedGroup = selectedGroup === "family" ? "default" : "family";
        await changeGroup(selectedGroup);
        location.reload();
    };

    const clearPosts = async () => {
        if (!isAdmin) {
            throw new Error("User not authenticated");
        }
        const postCollection = collection(firestore, "groups", selectedGroup, "posts");
        const postQuery = query(postCollection);
        const snapshot = await getDocs(postQuery);
        for (const doc1 of snapshot.docs) {
            await deleteDoc(doc1.ref);
        }
    };

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            } else {
                userId = user.uid;
                const userDocRef = doc(firestore, "users", userId);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                if (!userData || !userData.group) {
                    throw new Error("User data is invalid");
                }
                isAdmin = userData.isAdmin;
                selectedGroup = userData.group;
            }
        });
    });
</script>

<main>
    <Post />
    <div class="top-spacer">
        {#if isAdmin}
            <div class="top-spacer justify-center">
                <Button on:click="{swapGroup}" class="swap-group-button justify-left">
                    <span>{selectedGroup === "family" ? "family" : "default"}</span>
                </Button>
                <Button on:click="{clearPosts}" class="clear-posts-button">Clear Posts</Button>
            </div>
        {:else}
            <Button>{selectedGroup}</Button>
        {/if}
        <ShowPosts />
    </div>
</main>

<style>
    .top-spacer {
        margin-top: 20px;
    }

    :global(.swap-group-button),
    :global(.clear-posts-button) {
        font-size: 18px;
        padding: 14px 24px;
        border-radius: 18px;
    }

    @media (max-width: 768px) {
        .top-spacer {
            margin-top: 30px;
        }

        :global(.clear-posts-button) {
            display: none;
        }
    }
</style>