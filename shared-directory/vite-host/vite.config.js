import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5175,
    origin: 'http://localhost:5175',
  },
  preview: {
    port: 5175,
  },
  resolve: {
  },
  base: 'http://localhost:5175',
  plugins: [
    react({ }),
    federation({
      name: '@namespace/viteViteHost',
      exposes: {
        './App1': './src/App1',
      },
      manifest: true,
      remotes: {
        shared: 'shared@https://shared.js',
        viteRemote: 'viteRemote@http://localhost:5176/mf-manifest.json',
      },
      runtimePlugins: ['./src/shared/plugin'],
      shared: {
        'react/': {},
        react: {
          requiredVersion: '18',
        },
        'react-dom/': {},
      },
    }),
    // If you set build.target: "chrome89", you can remove this plugin
    false && topLevelAwait(),
  ],
  build: {
    target: 'chrome89',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
