import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.expo/**",
      "**/.expo-shared/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/android/**",
      "**/ios/**",
      "**/coverage/**",
      "**/*.log",
      "**/*.lock",
      "**/.*"
    ] 
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: [
      '**/metro.config.js',
      '**/babel.config.js',
      '**/tailwind.config.*',
      '**/next.config.ts',
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    },
    languageOptions: {
      globals: globals.node,
    },
  }
]);