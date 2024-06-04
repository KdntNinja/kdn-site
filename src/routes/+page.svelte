<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/routes";

    const goToLogin = () => {
        goto(routes.LOGIN);
    };
    const goToSignup = () => {
        goto(routes.SIGNUP);
    };
</script>

<div class="card-container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Welcome to LinkLoop!</Card.Title>
        </Card.Header>
        <Card.Content>
            <Card.Description>Keeps you linked and in the loop.</Card.Description>
            <p class="mb-4 text-lg">Please log in or sign up to continue.</p>
            <div class="flex justify-center mt-8">
                <Button on:click="{goToLogin}" aria-label="Log In" class="mr-4 font-bold py-2 px-4 rounded"
                    >Log In</Button
                >
                <Button on:click="{goToSignup}" aria-label="Sign Up" class="ml-4 font-bold py-2 px-4 rounded"
                    >Sign Up</Button
                >
            </div>
        </Card.Content>
        <Card.Footer>(Credit: Max, name and description)</Card.Footer>
    </Card.Root>
</div>
