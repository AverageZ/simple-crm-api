const webpack = require('webpack');
const path = require('path');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({
    // Compile into js/dist.js and then the deploy script will mv to build/
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'awesome-typescript-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: options.plugins.concat([
    new webpack.NamedModulesPlugin(),
  ]),

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.mjs',
      '.js',
      '.ts',
    ],
  },
  devtool: options.devtool,
  target: 'node',
  performance: options.performance || {},
});
