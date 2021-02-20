module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  modulePathIgnorePatterns: [
    '/test/fixtures/'
  ],
  testEnvironment: 'node',
  testRegex: './test/.+\\.js$',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./tests/transformers/javascript')
  },
};
