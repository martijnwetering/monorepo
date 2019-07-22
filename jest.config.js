module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  transformIgnorePatterns: [],
  coverageReporters: ['html'],
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: "<rootDir>/node_modules/@nrwl/jest/plugins/resolver",
  collectCoverageFrom: [
    "apps/**/*.ts",
    "libs/**/*.ts",
    "coverage/**/*.ts",
    "!apps/**/*spec.ts",
    "!libs/**/*.spec.ts",
    "!node_modules/**",
    "!package.json",
    "!apps/*/src/polyfills.ts",
    "!apps/*/src/main.ts",
    "!apps/*/src/test.ts",
    "!apps/test-app-e2e/**/*"
  ],
  moduleNameMapper: {
    "@monorepo/auth": "<rootDir>/libs/auth/src/index.ts"
  },
  testResultsProcessor: 'jest-sonar-reporter'
};
