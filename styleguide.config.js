const path = require('path')

const docgen = require('react-docgen')
const { findAllExportedComponentDefinitions } = docgen.resolver

const customResolver = function (ast, recast) {
  const definitions = findAllExportedComponentDefinitions(ast, recast)
  recast.visit(ast, {
    visitCallExpression: function (path) {
      // Add mkComponent based components
      if (path.node.callee.name == 'mkComponent') {
        definitions.push(path.parent.parent)
        return false
      } else {
        return this.traverse(path)
      }
    }
  })
  return definitions
}

let i = 0
module.exports = {
  require: [
    path.resolve(__dirname, 'build/app.css'),
    path.resolve(__dirname, 'docs/styleguide/style.css'),
    path.resolve(__dirname, 'docs/styleguide/setup.js')
  ],
  serverPort: 6061,
  showUsage: true,
  styleguideDir: 'docs/build/styleguide',
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, 'docs/styleguide/Wrapper')
  },
  sections: [
    {
      name: 'General',
      components: () => [
        'src/components/Table/index.jsx',
        'src/components/SharingIcon/SharingIcon.jsx'
      ]
    },
    {
      name: 'Forms',
      components: () => [
        'src/components/Field/Field.jsx',
        'src/components/Select.jsx'
      ]
    },
    {
      name: 'Banks',
      components: () => [
        'src/components/Figure/Figure.jsx',
        'src/components/Figure/FigureBlock.jsx'
      ]
    },
    {
      name: 'Loading',
      components: () => [
        'src/components/Loading/Loading.jsx'
      ]
    },
    {
      name: 'Misc',
      components: () => [
        'src/components/DisplayError.js',
        'src/components/Media/Media.jsx',
        'src/components/BackButton/index.jsx',
        'src/components/Layout/index.jsx'
      ]
    }
  ],
  resolver: customResolver
}
