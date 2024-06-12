import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    alias: {
        "@/*": "./path/to/lib/*",
    },
    kit: {
        adapter: adapter({
            pages: "dist",
            assets: "dist",
            fallback: "200.html",
            precompress: false,
            strict: false,
        }),
        prerender: {
            handleHttpError: (error, request) => {
                const path = request ? request.path : "unknown";
                console.error(`Error prerendering ${path}: ${error.message}`);
                return { status: 500, body: "Internal Server Error" };
            },
        },
    },
};

export default config;
