const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const NodePolyfillPlugin = require ('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    src: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // target: 'node',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './client/index.html'),
    }),
    // new NodePolyfillPlugin()
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'build')
    },
    historyApiFallback: true,
    compress: true,
    port: 8080,
    proxy: {
      '/personal/': {
        target: 'http://localhost:3000/personal/',
        secure: false
      },
      '/api.*': {
        target: 'openbrewerydb.org/breweries?by_state=california&',
        secure: false
      },
    }
  },
  // resolve: {
  //   modules: [path.resolve('./src'), path.resolve('./node_modules')],
  //   fallback: {
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //     "stream": false,
  //     "crypto": false,
  //     "crypto-browserify": require.resolve('crypto-browserify')
  //   },
  // }
  // resolve: {
  //   extensions: [".js", ".jsx"],
  //   fallback: {
  //     "fs": false,
      // "stream": require.resolve("stream-browserify"),
      // "path": require.resolve("path-browserify"),
      // "http": require.resolve("stream-http")
  //   }
  // }
};