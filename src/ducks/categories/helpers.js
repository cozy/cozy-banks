import categoriesMap from './categoriesMap'

// This function builds a map of categories and sub-categories, each containing a list of related operations, a name and a color
export const operationsByCategory = operations => {
  let categories = {}

  for (const operation of operations) {
    // Creates a map of categories, where each entry contains a list of related operations and a breakdown by sub-category
    let category = categoriesMap.get(operation.category) || categoriesMap.get('uncategorized_others')

    // create a new parent category if necessary
    if (!categories.hasOwnProperty(category.name)) {
      categories[category.name] = {
        name: category.name,
        color: category.color,
        operations: [],
        subcategories: {}
      }
    }

    // create the subcategory if necessary
    if (!categories[category.name].subcategories.hasOwnProperty(operation.category)) {
      categories[category.name].subcategories[operation.category] = {
        name: operation.category,
        operations: []
      }
    }

    categories[category.name].operations.push(operation)
    categories[category.name].subcategories[operation.category].operations.push(operation)
  }

  return categories
}

// Very specific to this component: takes the operations by category as returned by the `operationsByCategory` function, and turns it into a flat array, while computing derived data such as totals and curencies.
// The result is used pretty much as is down the chain by other components, so changing property names here should be done with care.
export const computeCategorieData = operationsByCategory => {
  return Object.values(operationsByCategory).map(category => {
    let subcategories = Object.values(category.subcategories).map(subcategory => {
      const debit = subcategory.operations.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
      const credit = subcategory.operations.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

      return {
        name: subcategory.name,
        amount: credit + debit,
        debit: debit,
        credit: credit,
        percentage: 0,
        currency: subcategory.operations[0].currency,
        operationsNumber: subcategory.operations.length
      }
    })

    const debit = category.operations.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
    const credit = category.operations.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

    return {
      name: category.name,
      color: category.color,
      amount: credit + debit,
      debit: debit,
      credit: credit,
      percentage: 0,
      currency: category.operations[0].currency,
      operationsNumber: category.operations.length,
      subcategories: subcategories
    }
  })
}
