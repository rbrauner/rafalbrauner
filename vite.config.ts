import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vuePlugin from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        symfonyPlugin(),
        vuePlugin(),
        tailwindcss(),
        tsconfigPaths(),
    ],
    build: {
        rollupOptions: {
            input: {
                app: "./assets/ts/app.ts",
                serviceworker: "./assets/ts/serviceworker.ts",
            },
            output: {
                entryFileNames: (chunk: { name: string }): string => {
                    if (chunk.name === "serviceworker") {
                        return "serviceworker.js";
                    }
                    return "assets/[name].[hash].js";
                },
            },
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        origin: "http://rafalbrauner.localhost:5173",
    },
});
