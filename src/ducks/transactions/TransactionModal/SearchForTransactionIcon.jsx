import React from 'react'

import { getLabel } from 'ducks/transactions'

import Icon from 'cozy-ui/transpiled/react/Icon'
import MagnifierIcon from 'cozy-ui/transpiled/react/Icons/Magnifier'

import styles from 'ducks/transactions/TransactionModal/SearchForTransactionIcon.styl'

const SearchForTransactionIcon = ({ transaction, ignoreManual = false }) => {
  const label = getLabel(transaction, ignoreManual)
  return (
    <a
      className={styles.SearchForTransactionIcon}
      href={`#/search/${encodeURIComponent(label)}`}
    >
      <Icon className="u-coolGrey" icon={MagnifierIcon} />
    </a>
  )
}

export default React.memo(SearchForTransactionIcon)
