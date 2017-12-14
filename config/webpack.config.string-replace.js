const StringReplacePlugin = require('string-replace-webpack-plugin')

// Fix for global is undefined
// Found here: https://github.com/mozilla/nunjucks/issues/520
// TODO: Remove it when cozy-client-js remove PouchDB dependency
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [

            {
              pattern: /global\.MutationObserver/g,
              replacement: function () {
                return "window.MutationObserver";
              }
            },
            {
              pattern: /global\.WebKitMutationObserver/g,
              replacement: function () {
                return "window.WebKitMutationObserver";
              }
            },
            {
              pattern: /global\.document/g,
              replacement: function () {
                return "window.document";
              }
            },
            {
              pattern: /global\.setImmediate/g,
              replacement: function () {
                return "window.setImmediate";
              }
            }
          ]
        })
      }
    ]
  }
}
