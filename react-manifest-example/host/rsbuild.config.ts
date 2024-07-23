import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3009,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            mfapp01: "mfapp01@https://unpkg.com/mf-app-01@1.0.9/dist/remoteEntry.js",
            remote1: 'remote1@http://localhost:3001/manifestpath/mf-manifest.json',
            remote2: 'remote2@http://localhost:3002/mf-manifest.json',
          },
          shared: ['react', 'react-dom'],
        }),
      ]);
    },
  },
  plugins: [pluginReact()],
});
