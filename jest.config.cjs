module.exports = {
  transform: {
    '\\.tsx?$': ['babel-jest', { configFile: './babel-jest.config.cjs' }]
  },
  moduleDirectories: ['node_modules', 'src', __dirname],
  testRegex: '(/(__tests__|tests)/.*|(\\.|/)(test|spec))\\.js$',
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ["<rootDir>/jest.setup.js"]
};