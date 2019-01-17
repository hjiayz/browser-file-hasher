var webpack = require("webpack");
module.exports = {
  entry: "./main.js",
  output: {
    path: __dirname,
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
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devtool: "source-map"
};
