 const webpack = require('webpack')

 module.exports = {
   plugins: [
     new webpack.DefinePlugin({
       __PIWIK_SITEID__: 255, // TODO change for real value
       __PIWIK_SITEID_MOBILE__: 255,
       __PIWIK_DIMENSION_ID_APP__: 1,
       __PIWIK_TRACKER_URL__: JSON.stringify('https://matomo.cozycloud.cc')
     })
   ]
 }
