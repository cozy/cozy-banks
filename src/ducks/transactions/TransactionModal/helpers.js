import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { getParsedTransactionDate } from 'ducks/transactions/helpers'

export const showAlertAfterApplicationDateUpdate = (transaction, t, f) => {
  const date = getParsedTransactionDate(transaction)
  Alerter.success(
    t('Transactions.infos.applicationDateChangedAlert', {
      applicationDate: f(date, 'MMMM')
    })
  )
}

export const stopPropagation = ev => ev.stopPropagation()
