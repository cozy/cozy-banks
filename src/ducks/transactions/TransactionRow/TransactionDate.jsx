import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import parse from 'date-fns/parse'

import { getDate } from 'ducks/transactions/helpers'

const TransactionDate = ({ isExtraLarge, transaction }) => {
  const { t, f } = useI18n()

  return (
    <span
      title={
        transaction.realisationDate &&
        transaction.date !== transaction.realisationDate
          ? t('Transactions.will-be-debited-on', {
              // XXX: f() is an old version of date-fns/format which does not
              // understand the new format string.
              date: f(transaction.date, 'D MMMM YYYY')
            })
          : null
      }
    >
      {
        // XXX: f() is an old version of date-fns/format which does not
        // understand the new format string.
        f(
          parse(getDate(transaction), 'yyyy-MM-dd', new Date()),
          `D ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`
        )
      }
    </span>
  )
}

export default React.memo(TransactionDate)
