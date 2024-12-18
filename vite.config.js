import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  start: {
    port: 3000,
  },
  base: "/", // Adjust this if your app is deployed in a subdirectory
  build: {
    outDir: "dist", // Ensure this matches your deployment target
  },
});
