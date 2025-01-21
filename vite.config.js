import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    port: 3000, // Specify the development server port
    strictPort: true, // If true, ensures the server fails if the port is already in use
    fs: {
      allow: ['..'] // Allow access to files outside the project root
    }
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      $routes: '/src/routes',
      $components: '/src/components',
      $static: '/static'
    }
  },
  build: {
    sourcemap: true // Enables source maps for easier debugging
  }
};

export default config;
