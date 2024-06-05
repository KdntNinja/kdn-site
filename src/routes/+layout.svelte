<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";

    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { inject } from "@vercel/analytics";

    inject();
    injectSpeedInsights();

    if (!import.meta.env.SSR && "serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/service-worker.js");
        });
    }
</script>

<img src="/LinkLoop.png" alt="Linkloop Logo" class="logo" />

<slot></slot>
<Toaster />
<ModeWatcher />

<style>
    .logo {
        position: absolute;
        top: 10px;
        left: 10px;
        height: 50px;
    }
</style>
