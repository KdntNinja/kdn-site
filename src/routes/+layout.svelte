<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";

    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { inject } from "@vercel/analytics";

    inject();
    injectSpeedInsights();
</script>

<img src="/LinkLoop.png" alt="Linkloop Logo" class="logo" />

<slot></slot>
<Toaster />
<ModeWatcher />

<style>
    .logo {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 50px;
    }
</style>
