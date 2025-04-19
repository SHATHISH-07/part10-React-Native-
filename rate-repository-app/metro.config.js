const { getDefaultConfig } = require("@expo/metro-config");
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "formik") {
    return {
      filePath: require.resolve("formik/dist/formik.cjs.production.min.js"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
