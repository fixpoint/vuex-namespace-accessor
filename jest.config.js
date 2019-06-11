const { defaults } = require('jest-config');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'src/**/*.{ts,tsx}',
    'src/**/*.vue',
  ],
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '.*\\.d\\.ts$', // No coverage is available for type definition
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '^vuex-module-scope$': '<rootDir>/src',
  },
  // Copied from Jest 24.6 default value
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
    '**/tests/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-master',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
};
