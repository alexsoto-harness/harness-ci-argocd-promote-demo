/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverageFrom: [
    "lib/**/*.js",
    "server.js",
    "!lib/delay.js",
  ],
  coverageDirectory: "coverage",
  verbose: false,
  testTimeout: 30000,
};
