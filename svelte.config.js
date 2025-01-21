import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocess enables SCSS, TypeScript, PostCSS, etc.
  preprocess: preprocess(),

  kit: {
    // Adapter auto detects the deployment environment and selects the best adapter.
    adapter: adapter(),

    // Files used in the app structure
    files: {
      assets: 'static', // Static assets like images
      routes: 'src/routes', // Routes folder
      appTemplate: 'src/app.html' // HTML entry point
    },

    // Vite configuration
    vite: {
      server: {
        fs: {
          // Allow serving files outside of the current project root
          allow: ['..']
        }
      }
    }
  }
};

export default config;
