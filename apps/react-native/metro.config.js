const {getDefaultConfig} = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require("path");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [
  workspaceRoot,
];
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
];

config.resolver.disableHierarchicalLookup = true;
// 4. Enable package exports, this option will be set to true by default in Metro 0.82+
config.resolver.unstable_enablePackageExports = true;

config.resolver.platforms = ['ios', 'android'];

module.exports = withNativeWind(config, {
  input: './global.css'
});
