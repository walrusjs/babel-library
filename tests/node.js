module.exports = function () {
  return {
    presets: [
      [
        require('../presets/babel-preset-walrus/lib').default,
        {
          typescript: true,
          react: true,
          env: {
            targets: {
              node: 'current',
            },
            modules: 'commonjs',
          },
        },
      ],
    ],
  };
};
