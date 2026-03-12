import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src/client", import.meta.url)),
            "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
            "@server": fileURLToPath(new URL("./src/server", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/trpc": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
