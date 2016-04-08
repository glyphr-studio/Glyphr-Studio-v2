var path = require('path');

module.exports = {
  entry: "./src/main.jsx",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"],
          // plugins: ["transform-es2015-modules-amd"]
        },
        include: [
          path.join(__dirname, 'src')
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: [
          path.join(__dirname, 'src/style'),
        ],
      },
    ]
  },
  resolve: {
    extensions: ['','.js', '.jsx', '.scss']
  }
};