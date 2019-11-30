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
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 4200,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:4201',
        headers: {
          Host: 'ufc.localhost'
        }
      }
    }
  }
};
