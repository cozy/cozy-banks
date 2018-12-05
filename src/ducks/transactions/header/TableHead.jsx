import React from 'react'
import PropTypes from 'prop-types'
import { flowRight as compose } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Table } from 'components/Table'

import transactionsStyles from '../Transactions.styl'
import styles from './TableHead.styl'

const TableHead = ({ t, breakpoints, isSubcategory, color }) => {
  if (breakpoints.isMobile || breakpoints.isTablet) {
    return null
  }

  return (
    <Table className={styles[`TableHead_${color}`]}>
      <thead>
        <tr>
          <td className={transactionsStyles.ColumnSizeDesc}>
            {t(
              isSubcategory
                ? 'Categories.headers.movements'
                : 'Transactions.header.description'
            )}
          </td>
          <td className={transactionsStyles.ColumnSizeDate}>
            {t('Transactions.header.date')}
          </td>
          <td className={transactionsStyles.ColumnSizeAmount}>
            {t('Transactions.header.amount')}
          </td>
          <td className={transactionsStyles.ColumnSizeAction}>
            {t('Transactions.header.action')}
          </td>
        </tr>
      </thead>
    </Table>
  )
}

TableHead.propTypes = {
  color: PropTypes.oneOf(['default', 'primary'])
}

export default compose(
  withBreakpoints(),
  translate()
)(TableHead)
