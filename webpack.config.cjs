const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      static: path.resolve(__dirname, 'dist'),
      port: 8080,
      hot: true,
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
    ],
  };
};