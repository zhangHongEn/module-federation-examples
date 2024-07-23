import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: 'http://localhost:3001',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'app1';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote1',
          remotes: {
            bbc: "http://localhost:5173/dd/remoteEntry.js",
          },
          remoteType: "module",
          exposes: {
            './button': './src/button.tsx',
            './app': './src/app.tsx',
          },
          manifest: {
            filePath: 'manifestpath',
          },
          shared: [
            'react',
            'react-dom',
            // 'antd'
          ],
        }),
      ]);
    },
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
    }),
  ],
});
