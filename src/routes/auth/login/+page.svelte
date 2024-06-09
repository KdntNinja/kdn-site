<script lang="ts">
    import { routes } from "$lib/routes.js";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase";
    import { isMobileDevice } from "$lib/isMobile";

    import Login from "./login.svelte";
    import { goto } from "$app/navigation";

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (isMobileDevice()) {
                    goto(routes.POSTS);
                } else {
                    goto(routes.PAGES);
                }
            }
        });
    });
</script>

<Login />
