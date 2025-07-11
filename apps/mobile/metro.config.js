// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
// config.watchFolders = [workspaceRoot];
config.watchFolders = [
  path.resolve(workspaceRoot, "apps"),
  path.resolve(workspaceRoot, "packages"),
  path.resolve(workspaceRoot, "mock-server/src"),
];

// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;
// 4. Enable package exports, this option will be set to true by default in Metro 0.82+
config.resolver.unstable_enablePackageExports = true;

config.resolver.platforms = ["ios", "android", "web"];

config.resolver.resolveRequest = (context, moduleImport, platform) => {
  // Use the browser version of the package for React Native
  if (moduleImport === "axios" || moduleImport.startsWith("axios/")) {
    return context.resolveRequest(
      {
        ...context,
        unstable_conditionNames: ["browser"],
      },
      moduleImport,
      platform
    );
  }

  // Fall back to normal resolution
  return context.resolveRequest(context, moduleImport, platform);
};

module.exports = withNativeWind(config, {
  input: "./global.css",
});
