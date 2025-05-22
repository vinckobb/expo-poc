import type { Config } from 'jest';

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context|react-native-css-interop|nativewind)/)',
  ],
  moduleFileExtensions: ["web.tsx", "tsx", "web.ts", "ts", "web.jsx", "jsx", "web.js", "js"],
};

export default config;
