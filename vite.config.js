import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/SPA-React-Based-Personal-Project-Showcase-App/',
  plugins: [react()],
  server: {
    port: 5173
  }
});
