const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = process.env.NODE_ENV;

const commonConfigs = {
  mode: ENV,
  output: {
    filename: 'app.js',
    chunkFilename: '[name].app.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    mainFiles: ['index', 'registry' ],
    alias: {
      Components: path.resolve(__dirname, './src/components/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      title: 'Atomic CSS Modules',
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.NamedModulesPlugin()
  ]
};

const devConfigs = merge(commonConfigs, {
  entry: {
    client: [
      './src/entry',
      'webpack-hot-middleware/client'
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 1,
              camelCase: 'only',
              minimize: ENV === 'production'
            }
          },
          'postcss-loader'
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

const prodConfigs = merge(commonConfigs, {
  entry: './src/entry',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:3]',
              importLoaders: 1,
              camelCase: 'only',
              minimize: ENV === 'production'
            }
          },
          'postcss-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "theme-[id].css"
    }),
  ]
})

module.exports = ENV === 'production'
  ? prodConfigs
  : devConfigs;
