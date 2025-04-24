import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'nativewind',
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: [
      '@monorepo/screens',
      '@monorepo/components',
      '@monorepo/constants',
      '@monorepo/hooks',
      '@monorepo/theme',
      '@monorepo/utils'
    ],
    esbuildOptions: {
      resolveExtensions: ['.json', '.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
      loader: {
        '.js': 'jsx',
      }
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web'
    },
    extensions: ['.json', '.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
  },
})
