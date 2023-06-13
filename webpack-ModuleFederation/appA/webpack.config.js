const htmlWebpackPlugin = require('html-webpack-plugin');
const { name: packageName } = require('./package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  devServer: {
    host: '0.0.0.0',
    port: 10001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    liveReload: false,
    historyApiFallback: true,
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
      name: 'appA',
      filename: 'remoteEntry.js',
      exposes: {
        './ComponentA': './src/components/ComponentA/index.tsx'
      },
      remotes: {
        'appA': 'appA@http://127.0.0.1:8080/remoteEntry.js'
      }
    })
  ]
}