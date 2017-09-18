import categoriesMap from './categoriesMap'

// This function builds a map of categories and sub-categories, each containing a list of related transactions, a name and a color
export const transactionsByCategory = transactions => {
  let categories = {}

  for (const transaction of transactions) {
    // Creates a map of categories, where each entry contains a list of related operations and a breakdown by sub-category
    let category = categoriesMap.get(operation.category) || categoriesMap.get('uncategorized_others')

    // create a new parent category if necessary
    if (!categories.hasOwnProperty(category.name)) {
      categories[category.name] = {
        name: category.name,
        color: category.color,
        transactions: [],
        subcategories: {}
      }
    }

    // create the subcategory if necessary
    if (!categories[categoryId].subcategories.hasOwnProperty(transaction.category)) {
      categories[categoryId].subcategories[categoryId] = {
        name: categoriesMap.get(categoryId).name,
        transactions: []
      }
    }

    categories[categoryId].transactions.push(transaction)
    categories[categoryId].subcategories[categoryId].transactions.push(transaction)
  }

  return categories
}

// Very specific to this component: takes the transactions by category as returned by the `transactionsByCategory` function, and turns it into a flat array, while computing derived data such as totals and curencies.
// The result is used pretty much as is down the chain by other components, so changing property names here should be done with care.
export const computeCategorieData = transactionsByCategory => {
  return Object.values(transactionsByCategory).map(category => {
    let subcategories = Object.values(category.subcategories).map(subcategory => {
      const debit = subcategory.transactions.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
      const credit = subcategory.transactions.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

      return {
        name: subcategory.name,
        amount: credit + debit,
        debit: debit,
        credit: credit,
        percentage: 0,
        currency: subcategory.transactions[0].currency,
        transactionsNumber: subcategory.transactions.length
      }
    })

    const debit = category.transactions.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
    const credit = category.transactions.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

    return {
      name: category.name,
      color: category.color,
      amount: credit + debit,
      debit: debit,
      credit: credit,
      percentage: 0,
      currency: category.transactions[0].currency,
      transactionsNumber: category.transactions.length,
      subcategories: subcategories
    }
  })
}
