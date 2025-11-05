/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": ["ts-jest"]
  },
  moduleNameMapper: {
    "^firebase-admin$": "<rootDir>/__mocks__/firebase-admin.ts"
  },
  testMatch: ["**/test/**/*.test.ts"]
};
