import { defineConfig } from "vite";
// Trigger restart for dependency pickup
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: true
  },
});