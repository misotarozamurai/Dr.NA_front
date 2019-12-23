const path = require('path');
const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ['absolute/path/a', 'absolute/path/b'],
              },
            },
          },
        ],
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