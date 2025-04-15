import { Configuration, DefinePlugin } from 'webpack';

module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    // you need to list `react-native` because `react-native-web` is aliased to `react-native`.
    "react-native",
    "react-native-web",
    "@monorepo/components",
    "@monorepo/constants",
    "@monorepo/hooks",
    "@monorepo/screens",
    "@monorepo/shared",
    "@monorepo/theme",
    "nativewind",
    "react-native-css-interop",
    // Add other packages that need transpiling
  ],
  webpack: (config: Configuration) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Alias direct react-native imports to react-native-web
      'react-native$': 'react-native-web',
      // Alias internal react-native modules to react-native-web
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve?.extensions ?? []),
    ];

    if (!config.plugins) {
      config.plugins = [];
    }

    // Expose __DEV__ from Metro.
    config.plugins.push(
      new DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );
    return config;
  },
}
