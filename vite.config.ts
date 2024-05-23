import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3080, // Definindo a porta para 3000
  },
  plugins: [react()],
});
