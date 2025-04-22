import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'nativewind',
  })],
  optimizeDeps: {
    include: [
      '@monorepo/screens',
      '@monorepo/components',
    ],
    esbuildOptions: {
      resolveExtensions: [".json", ".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx"],
      loader: {
        '.js': 'jsx',
      }
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
		extensions: [".json", ".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx"],
  },
})
