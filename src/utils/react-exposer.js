if (process.env.__USE_PREACT__) {
  require('expose-loader?React!preact-compat')
  require('expose-loader?ReactDOM!preact-compat')
} else {
  require('expose-loader?React!react')
  require('expose-loader?ReactDOM!react-dom')
}
