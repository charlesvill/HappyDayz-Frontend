import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

// flat-compatible configs from Airbnb
// import airbnb from "eslint-config-airbnb";
// import airbnbHooks from "eslint-config-airbnb/hooks";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImport,
    },

    // apply Airbnb + Prettier + React
    extends: [
      js.configs.recommended,
      // airbnb,
      // airbnbHooks,
      pluginReact.configs.flat.recommended,
      pluginPrettier,
    ],

    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // no need in React 17+
      "import/no-extraneous-dependencies": "off", // often noisy in Vite
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
