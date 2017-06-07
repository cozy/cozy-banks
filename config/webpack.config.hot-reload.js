const webpack = require('webpack')

const PORT = 8282

module.exports = {
  entry: ['webpack/hot/dev-server', 'preact/devtools'],
  output: {
    filename: 'app.js',
    publicPath: 'http://localhost:' + PORT + '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      'window.React': 'preact-compat'
    })
  ],
  devServer: {
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
}
