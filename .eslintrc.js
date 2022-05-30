module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["import", "unused-imports"],
  root: true,
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-duplicate-imports": "warn",
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "error",
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": 0,
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "no-useless-escape": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-prototype-builtins": 0,
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    },
  },
};
