/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    process: "readonly", // Add this to allow process.env usage
  },
  rules: {
    // Add other custom ESLint rules or overrides here
    "turbo/no-undeclared-env-vars": [
      "error",
      {
        allow: [
          "GOOGLE_CLIENT_ID",
          "GOOGLE_CLIENT_SECRET",
          "NEXTAUTH_URL",
          "NEXTAUTH_SECRET",
        ],
      },
    ],
  },
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
