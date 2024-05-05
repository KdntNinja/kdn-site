<script>
    import Post from "$lib/components/elements/CreatePost.svelte";
    import ShowPosts from "$lib/components/elements/ShowPosts.svelte";

    import { routes } from "$lib/routes";

    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    let auth;

    onMount(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = routes.LOGIN;
            }
        });
    });
</script>

<main>
    <Post />
    <div class="top-spacer">
        <ShowPosts />
    </div>
</main>

<style>
    .top-spacer {
        margin-top: 20px;
    }
</style>
