module.exports = function(wallaby) {
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
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        getCustomTransformers: () => {
          return {
            before: [
              require('jest-preset-angular/InlineHtmlStripStylesTransformer').factory({
                compilerModule: require('typescript')
              })
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

    // preprocessors: {
    //   'src/**/*.js': [
    //     file =>
    //       require('@babel/core').transform(file.content, {
    //         sourceMap: true,
    //         compact: false,
    //         filename: file.path,
    //         presets: [require('babel-preset-jest')]
    //       })
    //   ]
    // },

    setup: function (wallaby) {
      // require('./wallabyTest');
      let jestConfig = require('./jest.config');
      delete jestConfig.preset;
      jestConfig = Object.assign(require('jest-preset-angular/jest-preset'), jestConfig);
      delete jestConfig.moduleNameMapper;
      jestConfig.transformIgnorePatterns.push('instrumented.*.(jsx?|html)$');

      if (!jestConfig.moduleNameMapper) {
        var paths = require('./tsconfig').compilerOptions.paths;
        var jestModuleMaps = {};
        Object.keys(paths).forEach(key => {
          jestModuleMaps[key] =
            '<rootDir>/' + paths[key][0].replace('.ts', '.js');
        });
        jestConfig.moduleNameMapper = jestModuleMaps;
      }
      jestConfig.globals['ts-jest'].tsConfig = '<rootDir>/tsconfig.spec.json';

      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
    debug: true
  };
};
