module.exports = function (wallaby) {
  const path = require('path');
  const ts = require(path.join(wallaby.localProjectDir, 'node_modules/typescript'));
  const jestconfig = require('./jest.config.js');

  var compilerOptions = Object.assign(
    require('./tsconfig.json').compilerOptions,
    require('./tsconfig.spec.json').compilerOptions);
  compilerOptions.useStandardDefaults = true;

  return {
    files: jestconfig.collectCoverageFrom.concat(['libs/**/*.html'], './jest.config.js'),
    tests: ['apps/**/*spec.ts', '!apps/**/*e2e-spec.ts', 'libs/**/*spec.ts', '!libs/**/*e2e-spec.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },
    testFramework: 'jest',
    debug: true,
    hints: {
      ignoreCoverage: /ignore coverage/
    },
    setup: function (wallaby) {
      var jestConfig = require('./jest.config.js');
      const pattern = '@monorepo/auth';
      jestConfig.moduleNameMapper[pattern] = jestConfig.moduleNameMapper[pattern].replace('<rootDir>', wallaby.projectCacheDir);
      console.log('jestCo', jestConfig);
      delete jestConfig.transform; // <--
      jestConfig.transformIgnorePatterns.push('instrumented.*.(jsx?|html)$');
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
