module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@env': './env.ts',
            '@assets': './assets',
            '@navigation': './src/features/navigation/index.tsx',
            '@screens': './src/screens',
            '@features': './src/features',
            '@types': './types',
            '@base': './',
          },
          extensions: ['.ts', '.tsx'],
        },
      ]
    ]
  };
};
