import React from 'react'
import { flowRight as compose } from 'lodash'
import withAppsUrls from 'ducks/apps/withAppsUrls'
import withBrands from 'ducks/brandDictionary/withBrands'

export const TransactionActionsContext = React.createContext()

class DumbTransactionActionsProvider extends React.Component {
  render() {
    const { brands, urls } = this.props

    const value = { brands, urls }

    return (
      <TransactionActionsContext.Provider value={value}>
        {this.props.children}
      </TransactionActionsContext.Provider>
    )
  }
}

export const TransactionActionsProvider = compose(
  withAppsUrls,
  withBrands
)(DumbTransactionActionsProvider)
