const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',

    entry: './src/main.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',
      clean: true,
    },

    devtool: isProduction ? false : 'source-map',

    devServer: {
      static: path.resolve(__dirname, './'),
      port: 8080,
      hot: true,
      open: true,
    },
  };
};