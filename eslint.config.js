// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],

    // 1️⃣ Parser TS
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
      ecmaFeatures: { jsx: true },
      sourceType: "module",
    },

    // 2️⃣ Plugins
    plugins: ["@typescript-eslint", "import"],

    // 3️⃣ Extends
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
    ],

    // 4️⃣ Resolver de paths
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    // aquí tus reglas custom
    rules: {
      // ...
    },
  },
]);
