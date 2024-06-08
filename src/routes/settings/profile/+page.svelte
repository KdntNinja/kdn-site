<script lang="ts">
    import type { PageData } from "./$types.js";
    import ProfileForm from "./profile-form.svelte";
    import { Separator } from "$lib/components/new-york/ui/separator";
    export let data: PageData;
</script>

<div class="space-y-6">
    <div>
        <h3 class="text-lg font-medium">Profile</h3>
        <p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
    </div>
    <Separator />
    <ProfileForm data="{data.form}" />
</div>

<style>
    @media (max-width: 768px) {
        h3 {
            font-size: 1.2rem;
        }
        .text-sm {
            font-size: 0.8rem;
        }
    }
</style>
