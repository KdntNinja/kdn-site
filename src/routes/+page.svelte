<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { routes } from "$lib/routes";
</script>

<header>
    <Button
        on:click="{() => (window.location.href = routes.CREDITS)}"
        aria-label="Credits"
        class="ml-4 font-bold py-2 px-4 rounded">Credits</Button
    >
</header>

<div class="card-container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Welcome to LinkLoop!</Card.Title>
        </Card.Header>
        <Card.Content>
            <Card.Description>Keeps you linked and in the loop.</Card.Description>
            <p class="mb-4 text-lg">Please log in or sign up to continue.</p>
            <div class="flex justify-center mt-8">
                <Button
                    on:click="{() => (window.location.href = routes.LOGIN)}"
                    aria-label="Log In"
                    class="mr-4 font-bold py-2 px-4 rounded">Log In</Button
                >
                <Button
                    on:click="{() => (window.location.href = routes.SIGNUP)}"
                    aria-label="Sign Up"
                    class="ml-4 font-bold py-2 px-4 rounded">Sign Up</Button
                >
            </div>
        </Card.Content>
    </Card.Root>
</div>

<style>
    header {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>
