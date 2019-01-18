var webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/dist',
    filename: "index.js",
    library: "BrowserFileHasher",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: { inline: true, fallback: false }
        }
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
};
