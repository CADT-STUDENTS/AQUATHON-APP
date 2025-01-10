/** @type {import('ts-jest').JestConfigWithTsJest} **/
//import 'dotenv/config'

module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-tests.ts'],
  //globalSetup: '<rootDir>/src/test/index.ts',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  }
}
