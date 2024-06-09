<script lang="ts">
    import { routes } from "$lib/routes.js";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase";
    import { isMobileDevice } from "$lib/isMobile";

    import Login from "./login.svelte";

    let isLoading = false;

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                isLoading = true;
                window.location.href = isMobileDevice() ? routes.POSTS : routes.PAGES;
                isLoading = false;
            }
        });
    });
</script>

{#if isLoading}
    <div class="loading-overlay">
        <Login />
    </div>
{:else}
    <Login />
{/if}

<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
</style>