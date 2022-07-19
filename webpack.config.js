const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          contentBase: path.join(__dirname, 'public'),
        },
      };

const esLint = (isDev) =>
  isDev ? [] : [new ESLintPlugin({ extensions: ['js'] })];

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,

  entry: './src/script.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
  },

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/' },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      { test: /\.(pug|jade)$/, loader: 'pug-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      /* data: {
        dataset: require('./src/assets/dataset.json'),
      }, */
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CopyPlugin({
      patterns: [{ from: './public', to: './assets' }],
    }),
    new CleanWebpackPlugin(),
    ...esLint(development),
  ],

  resolve: {
    extensions: ['.js'],
  },

  ...devServer(development),
});
