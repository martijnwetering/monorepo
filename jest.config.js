module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  setupTestFrameworkScriptFile: '<rootDir>/node_modules/jest-preset-angular/setupJest.js',
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: false,
  bail: true,
  verbose: false,
  coverageReporters: ['html'],
  preset: 'jest-preset-angular',
};
