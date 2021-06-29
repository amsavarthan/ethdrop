module.exports = {
  // Run type-check on changes to TypeScript files
  "*.{js,ts,tsx}": () => "eslint --quiet --fix",
  // Run ESLint on changes to JavaScript/TypeScript files
  "*.{json,md,html})": () => `prettier --write`,
};
