import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // The antd vendor chunk is legitimately ~950kB and is split out on
    // purpose; the default 500kB warning would fire on every build.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split the two heaviest vendor groups so a feature change does not
        // invalidate the antd/react chunks in the browser cache.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          antd: ["antd", "@ant-design/icons"],
        },
      },
    },
  },
});
