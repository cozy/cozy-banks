const webpack = require('webpack')

module.exports = process.env.USE_REACT ? {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.USE_REACT': 'true',
    })
  ]
} : {
  resolve: {
    extensions: ['.jsx'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  }
}
