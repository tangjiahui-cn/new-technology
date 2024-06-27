const htmlWebpackPlugin = require('html-webpack-plugin');
const { name: packageName } = require('./package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    host: '0.0.0.0',
    port: 10002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'image/[hash]_[ext]_[query]'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: packageName,
      template: './index.html'
    }),
    new ModuleFederationPlugin({
      name: 'appB',
      remotes: {
        appA: 'appA@http://127.0.0.1:10001/remoteEntry.js'
      }
  })
  ]
}