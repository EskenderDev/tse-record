// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },
  plugins: [
    dts(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  build: {
    // También podría ser un diccionario o un array de múltiples puntos de entrada
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "TSERecord",
      // Se agregará la extension apropiada.
      fileName: "tse-record-lib",
      formats: ["es", "cjs", "umd", "iife"],
    },
    rollupOptions: {
      // Asegúrate de externalizar las dependencias que no deberían estar empaquetadas
      // en tu librería
      external: ["playwright"],
      output: {
        // Proporciona variables globales para usar en la compilación UMD
        // para dependencias externalizadas
        globals: {
          playwright: "playwright",
        },
      },
    },
  },
});
