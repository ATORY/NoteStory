module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:relay/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  parser: "babel-eslint",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "jest", 'relay', 'prettier'],
  rules: {
    "no-console": "off",
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'warn',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'off',
    'relay/no-future-added-value': 'warn',
    'relay/unused-fields': 'warn',
    "prettier/prettier": ["error", {"singleQuote": true,  "endOfLine":"auto" ,}]

  },
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect" // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    }
  }
};
