const ngxWallabyJest = require('ngx-wallaby-jest');

module.exports = function (wallaby) {
  return {
    files: [
      'wallabyTest.ts',
      'tsconfig.json',
      'tsconfig.spec.json',
      'jest.config.js',
      'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      'libs/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!libs/**/*.spec.ts',
      '!apps/**/*.spec.ts'
    ],

    tests: ['libs/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ module: 'commonjs' }),
    },

    preprocessors: {
      'projects/**/*.component.ts': ngxWallabyJest,
    },

    testFramework: 'jest',
    debug: true
  };
};
