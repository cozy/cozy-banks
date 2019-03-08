import fromPairs from 'lodash/fromPairs'

let iconsByCatName
if (require.context) {
  // Require all icons automatically
  const context = require.context('assets/icons/categories', false, /\.svg$/)

  // Remove ./icon-cat- and .svg from filename returned in context
  const cleanIconFilename = filename => filename.slice(11, -4)

  iconsByCatName = fromPairs(
    context
      .keys()
      .map(filename => [cleanIconFilename(filename), context(filename).default])
  )
} else {
  iconsByCatName = {}
}

export default iconsByCatName
