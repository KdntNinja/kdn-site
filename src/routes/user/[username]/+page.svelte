<script lang="ts">
    import { auth, signOut } from "$lib/firebase";
    import { Button } from "$lib/components/ui/button";

    const logout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Error logging out", error);
        }
    };
</script>

<Button on:click="{logout}">Logout</Button>
