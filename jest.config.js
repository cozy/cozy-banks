module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    styl$: 'identity-obj-proxy',
    webapp$: 'identity-obj-proxy',
    '!!raw-loader!(.*)': '$1',
    css$: 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['node_modules', 'src/targets/mobile/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.css$': '<rootDir>/test/readFileESM.js',
    '\\.styl$': '<rootDir>/test/readFileESM.js',
    '\\.hbs$': '<rootDir>/test/readFileESM.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(cozy-harvest-lib|cozy-ui|cozy-client|cozy-notifications))'
  ],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    __DEV__: false,
    __POUCH__: false,
    __SENTRY_TOKEN__: 'token',
    cozy: {}
  },
  setupFiles: ['jest-localstorage-mock', './test/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec).js?(x)']
}
