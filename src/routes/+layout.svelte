<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";

    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { inject } from "@vercel/analytics";

    inject();
    injectSpeedInsights();

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/service-worker.js");
        });
    }
</script>

<slot></slot>

<Toaster />
<ModeWatcher />
