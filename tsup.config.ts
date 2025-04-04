import { defineConfig } from 'tsup';

export default defineConfig([
  // Default build
  {
    entry: ['src/index.ts'],
    outDir: 'build',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: true,
    esbuildOptions(options) {
      options.resolveExtensions = ['.tsx', '.ts', '.js']; // Default resolution
    },
  },
  // Web-specific build
  {
    entry: {
      'index.web': 'src/index.ts',
    },
    outDir: 'build',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: true,
    esbuildOptions(options) {
      options.resolveExtensions = ['.web.tsx', '.tsx', '.web.ts', '.ts', '.js']; // Prioritize .web.tsx
    },
  },
  // iOS-specific build
  {
    entry: {
      'index.ios': 'src/index.ts',
    },
    outDir: 'build',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: true,
    esbuildOptions(options) {
      options.resolveExtensions = ['.ios.tsx', '.tsx', '.ios.ts', '.ts', '.js']; // Prioritize .ios.tsx
    },
  },
  // Android-specific build
  {
    entry: {
      'index.android': 'src/index.ts',
    },
    outDir: 'build',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: true,
    esbuildOptions(options) {
      options.resolveExtensions = ['.android.tsx', '.tsx', '.android.ts', '.ts', '.js']; // Prioritize .android.tsx
    },
  },
]);