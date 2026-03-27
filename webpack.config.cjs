const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',

    entry: './app.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'main.[contenthash].js' : 'main.js',
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