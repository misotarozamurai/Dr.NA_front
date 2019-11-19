module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
      path: `${__dirname}/dist`,
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
    ],
  },
  resolve: {
    extensions: [
      ".js",
      ".ts"
    ]
  }
};