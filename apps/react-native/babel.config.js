module.exports = {
  presets: [
    // 'module:@react-native/babel-preset', // Preset for React Native
    ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // Preset for Expo with nativewind
    "nativewind/babel",
  ],
};
