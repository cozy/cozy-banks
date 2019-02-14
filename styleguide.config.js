const path = require('path')
const glob = require('glob')

module.exports = {
  require: [
    ...glob.sync(path.resolve(__dirname, 'build/app.*.css')),
    path.resolve(__dirname, 'docs/styleguide/style.css'),
    path.resolve(__dirname, 'docs/styleguide/setup.js')
  ],
  serverPort: 6061,
  styleguideDir: 'docs/build/styleguide',
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, 'docs/styleguide/Wrapper')
  },
  sections: [
    {
      name: 'General',
      components: () => [
        // 'src/components/Table/index.jsx',
        'src/components/SharingIcon/SharingIcon.jsx',
        'src/components/SelectDates/SelectDates.jsx',
        'src/components/Select/index.jsx',
        'src/components/Switch.jsx'
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
      name: 'Chart',
      components: () => [
        'src/components/Chart/LineChart.jsx'
      ]
    },
    {
      name: 'Balance',
      components: () => [
        'src/ducks/balance/History.jsx'
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
        'src/components/DisplayError.js'
      ]
    }
  ]
}
