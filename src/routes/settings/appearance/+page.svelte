<script lang="ts">
    import type { PageData } from "./$types.js";
    import AppearanceForm from "./appearance-form.svelte";
    import { Separator } from "$lib/components/new-york/ui/separator/index.js";

    export let data: PageData;
</script>

<div class="space-y-6 md:space-y-8">
    <div>
        <h3 class="text-lg md:text-xl font-medium">Appearance</h3>
        <p class="text-sm md:text-base text-muted-foreground">
            Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
    </div>
    <Separator />
    <AppearanceForm data="{data.form}" />
</div>

<style>
    @media (max-width: 768px) {
        .space-y-6 {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>
