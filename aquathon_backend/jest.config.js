/** @type {import('ts-jest').JestConfigWithTsJest} **/
//import 'dotenv/config'

module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  globalSetup: '<rootDir>/src/test/index.ts',
  setupFiles: ['<rootDir>/src/test/setup-tests.ts'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  }
}
