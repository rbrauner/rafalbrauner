import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vuePlugin from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        symfonyPlugin(),
        vuePlugin(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "assets/img",
                    dest: "",
                },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                app: "./assets/ts/app.ts",
            },
            output: {
                entryFileNames: (chunk: { name: string }): string => {
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
