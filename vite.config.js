import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]', // Preserve original file names for assets
      },
    },
  },
});
