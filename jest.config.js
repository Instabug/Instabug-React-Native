/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  cacheDirectory: '.jest/cache',
  coverageDirectory: './coverage/',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.(js|ts)'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['example'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};
