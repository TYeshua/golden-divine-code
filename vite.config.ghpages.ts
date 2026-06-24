import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// Build estático (SPA) para GitHub Pages
// Sem SSR, sem Nitro, sem TanStack Start server features
export default defineConfig({
  base: "/golden-divine-code/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-gh",
    emptyOutDir: true,
  },
});
