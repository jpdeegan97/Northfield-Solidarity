import { defineConfig } from "vite";
// Trigger restart for dependency pickup
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: true
  },
});