const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
      path: path.resolve(__dirname,'dist'),
      filename: "main.js",
  },
  module: {
    rules: [
      {
          test: /\.ts$/,
          use: "ts-loader",
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: [
      ".js",
      ".ts"
    ],
    modules: [
      path.resolve(__dirname,'src/js'),
      path.resolve(__dirname,'src/css'),
      path.resolve(__dirname,'node_modules'),
    ]
  }
};