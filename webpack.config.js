const path = require('path');

module.exports = {
  entry: {
    app: ['./app/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    compress: true,
    port: 8080
  }
};