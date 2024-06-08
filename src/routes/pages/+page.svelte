<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/routes";

    let paths = [
        { name: "Posts", path: routes.POSTS },
        { name: "Settings (IN PROGRESS)", path: routes.SETTINGS },
    ];

    const goToRoute = (path: string) => {
        goto(path);
    };
</script>

<div class="svelte-scroll-area rounded-md justify-center p-4">
    <div class="p-4">
        {#each paths as route (route.name)}
            <Card class="p-4 rounded-lg shadow-md">
                <h2 class="font-medium text-2xl mb-2">{route.name}</h2>
                <Separator class="mb-2" />
                <Button on:click="{() => goToRoute(route.path)}">Go to {route.name}</Button>
            </Card>
            <br />
        {/each}
    </div>
</div>

<style>
    .svelte-scroll-area {
        justify-content: center;
        align-items: center;
        width: 35%;
        height: 94vh;
        margin: auto;
        text-align: center; /* Center the text on all elements */
    }
    .p-4 {
        padding: 1em; /* Increase padding for better spacing */
    }
    .rounded-lg {
        border-radius: 1em; /* Increase border radius for a softer look */
    }
    .shadow-md {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
    }
    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 30px;
            width: 100%;
        }
    }
</style>
