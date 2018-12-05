import React from 'react'
import { flowRight as compose } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Table } from 'components/Table'

import transactionsStyles from '../Transactions.styl'
import styles from './TableHead.styl'

const TableHead = ({ t, breakpoints, isSubcategory }) => {
  if (breakpoints.isMobile || breakpoints.isTablet) {
    return null
  }

  return (
    <div className={styles.TableHead}>
      <Table className={transactionsStyles.TransactionTable}>
        <thead>
          <tr>
            <td className={transactionsStyles['bnk-op-desc']}>
              {t(
                isSubcategory
                  ? 'Categories.headers.movements'
                  : 'Transactions.header.description'
              )}
            </td>
            <td className={transactionsStyles['bnk-op-date']}>
              {t('Transactions.header.date')}
            </td>
            <td className={transactionsStyles['bnk-op-amount']}>
              {t('Transactions.header.amount')}
            </td>
            <td className={transactionsStyles['bnk-op-action']}>
              {t('Transactions.header.action')}
            </td>
          </tr>
        </thead>
      </Table>
    </div>
  )
}

export default compose(
  withBreakpoints(),
  translate()
)(TableHead)
