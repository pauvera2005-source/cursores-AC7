import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://localhost:3000',
  integrations: [],
  vite: {
    server: { port: 3000 }
  }
});
