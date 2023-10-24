import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this assetsInclude option for PNG files
  build: {
    // Add this assetsInclude option for PNG files within the build section
    assetsInclude: ["**/*.png"],
  },
});
