import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Run componentTagger only in development
    mode === "development" ? componentTagger() : undefined,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::", // allow external access during dev
    port: 8080,
    // allow requests from Render host in dev
    allowedHosts: mode === "development"
      ? ['localhost', '127.0.0.1', 'jharkhand-civic-fix.onrender.com']
      : undefined,
  },
}));
