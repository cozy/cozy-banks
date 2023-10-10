import React, { createContext } from 'react'
import omit from 'lodash/omit'
import { useBrands } from 'ducks/brandDictionary/useBrands'

export const TransactionActionsContext = createContext()

export const DumbTransactionActionsProvider = props => {
  const propsWithoutChildren = omit(props, 'children')
  const brands = useBrands()

  const value = Object.assign({}, propsWithoutChildren, { brands })

  return (
    <TransactionActionsContext.Provider value={value}>
      {props.children}
    </TransactionActionsContext.Provider>
  )
}
