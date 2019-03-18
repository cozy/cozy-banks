module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['cozy-app'],
    plugins: ['babel-plugin-lodash', 'babel-plugin-date-fns']
  }
}
