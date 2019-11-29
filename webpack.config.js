const path = require('path');

const srcPath = path.resolve(__dirname, 'src', 'client');
const publicPath = path.resolve(__dirname, 'public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: srcPath,
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  node: {
    net: 'empty',
    http2: 'empty'
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 2190,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:2190',
        headers: {
          Host: 'ufc.localhost'
        }
      }
    }
  }
};
