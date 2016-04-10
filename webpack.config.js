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
          plugins: ["transform-flow-strip-types", "transform-class-properties"]
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
      {
        test: /\.json/,
        loaders: ['json'],
        include: [
          path.join(__dirname, 'src'),
        ],
      },

    ]
  },
  resolve: {
    extensions: ['','.js', '.jsx', '.scss', '.json']
  }
};