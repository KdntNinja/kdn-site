<script>
    import Post from "$lib/components/elements/Post.svelte";
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
    <div class="spacer">
        <ShowPosts />
    </div>
</main>

<style>
    .spacer {
        margin-top: 50px;
    }
</style>
