import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [vuePlugin(), tailwindcss(), tsconfigPaths()],
    build: {
        ssr: true,
        rollupOptions: {
            input: "./assets/ts/ssr.ts",
            output: {
                dir: "./var/node",
                format: "esm",
                entryFileNames: "ssr.js",
                inlineDynamicImports: true,
            },
        },
    },
    ssr: {
        noExternal: true,
    },
});
