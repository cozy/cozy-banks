module.exports.rules = {
  'bundle-validation': context => ({
    ForStatement: node => {
      if (node.init.kind == 'let') {
        context.report(node, 'No let in initialisation of for statement')
      }
    },

    ExperimentalSpreadProperty: node => {
      context.report(node, 'No ExperimentalSpreadProperty')
    }
  })
}
