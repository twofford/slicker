/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
},
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    "**/__tests__/**/*.js?(x)", // Match only .js or .jsx files
    "**/?(*.)+(spec|test).js?(x)", // Match files ending with .spec.js, .test.js, etc.
  ],
};
