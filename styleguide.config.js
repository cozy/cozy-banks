const path = require('path')

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
        'src/components/SharingIcon.jsx'
      ],
    },
    {
      name: 'Forms',
      components: () => [
        'src/components/Field.jsx',
        'src/components/Select.jsx',
      ],
    },
    {
      name: 'Bank',
      components: () => [
        'src/components/Figure/Figure.jsx',
        'src/components/Figure/FigureBlock.jsx'
      ],
    },
    {
      name: 'Loading',
      components: () => [
        'src/components/Loading.jsx'
      ],
    },
    {
      name: 'Misc',
      components: () => [
        'src/components/DisplayError.js',
        'src/components/Media.jsx',
        'src/components/BackButton/index.jsx'
      ]
    },
  ]
}
