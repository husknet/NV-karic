import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      $routes: '/src/routes',
      $components: '/src/components',
      $static: '/static'
    }
  }
};

export default config;
