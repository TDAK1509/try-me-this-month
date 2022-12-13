import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const pathSrc = resolve(__dirname, "./src");

export default defineConfig({
  resolve: { alias: { "@": pathSrc } },
  plugins: [vue(), VitePWA({ registerType: "autoUpdate" })],
});
