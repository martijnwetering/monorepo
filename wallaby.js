module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'tsconfig.json', instrument: false },
      { pattern: 'tsconfig.spec.json', instrument: false },
      { pattern: 'jest.config.js', instrument: false },
      { pattern: 'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)', load: false},
      { pattern: 'libs/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)', load: false },
      '!libs/**/*.spec.ts',
      '!apps/**/*.spec.ts'
    ],

    tests: ['libs/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        getCustomTransformers: () => {
          return {
            before: [
              require('jest-preset-angular/InlineHtmlStripStylesTransformer').factory(
                { compilerModule: require('typescript') }
              )
            ]
          };
        }
      }),
      '**/*.html': file => ({
        code: require('ts-jest').process(file.content, file.path, {
          globals: { 'ts-jest': { stringifyContentPathRegex: '\\.html$' } }
        }),
        map: { version: 3, sources: [], names: [], mappings: [] },
        ranges: []
      })
    },

    preprocessors: {
      'libs/**/*.js': [
        file =>
          require('@babel/core').transform(file.content, {
            sourceMap: true,
            compact: false,
            filename: file.path,
            presets: [require('babel-preset-jest')]
          })
      ]
    },

    setup: function(wallaby) {
      var jestConfig = require('./jest.config');
      jestConfig = Object.assign(
        require('jest-preset-angular/jest-preset'),
        jestConfig
      );
      jestConfig.transformIgnorePatterns.push('instrumented.*.(jsx?|html)$');
      jestConfig.setupFilesAfterEnv = ['<rootDir>/node_modules/jest-preset-angular/setupJest.js'];

      jestConfig.globals['ts-jest'].tsConfig = '<rootDir>/tsconfig.spec.json';
      wallaby.testFramework.configure(jestConfig);
    },


    testFramework: 'jest',
    debug: true
  };
};
