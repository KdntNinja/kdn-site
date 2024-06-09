<script lang="ts">
    import { routes } from "$lib/routes.js";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase";
    import { isMobileDevice } from "$lib/isMobile";

    import Login from "./login.svelte";


    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = isMobileDevice() ? routes.POSTS : routes.PAGES;
            }
        });
    });
</script>


<Login />
