module.exports = {
  name: 'monorepo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/monorepo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
