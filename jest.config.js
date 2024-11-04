/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Comment this in to only run emitted JS tests
  // testMatch: [
  //   "**/__tests__/**/*.js?(x)", // Match only .js or .jsx files
  //   "**/?(*.)+(spec|test).js?(x)", // Match files ending with .spec.js, .test.js, etc.
  // ],
};
