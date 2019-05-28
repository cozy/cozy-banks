/* global __DEV__ */

import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react'
import Chip from 'cozy-ui/react/Chip'
import FileOpener from 'ducks/transactions/FileOpener'
import FileIcon from 'ducks/transactions/actions/AttachedDocsAction/FileIcon'
import { Figure } from 'components/Figure'
import styles from 'ducks/transactions/actions/AttachedDocsAction/Bill.styl'

class DumbBill extends React.PureComponent {
  static propTypes = {
    bill: PropTypes.object.isRequired
  }

  getInvoiceId(bill) {
    if (!bill.invoice) {
      if (__DEV__) {
        console.warn('Bill without invoice', bill) // eslint-disable-line no-console
      }
      throw new Error('Bill without invoice')
    }

    const [doctype, id] = bill.invoice.split(':')

    if (!doctype || !id) {
      throw new Error('Invoice is malformed. invoice: ' + bill.invoice)
    }

    return [doctype, id]
  }

  render() {
    const { bill, t } = this.props
    const [, invoiceId] = this.getInvoiceId(bill)

    return (
      <FileOpener fileId={invoiceId} key={invoiceId}>
        <Chip component="button" size="small" variant="outlined">
          <FileIcon
            color={bill.isRefund ? 'var(--emerald)' : undefined}
            className={styles.Bill__fileIcon}
          />
          {bill.isRefund ? (
            <Figure total={bill.amount} coloredPositive signed symbol="€" />
          ) : (
            t('Transactions.actions.attachedDocs.bill')
          )}
        </Chip>
      </FileOpener>
    )
  }
}

const Bill = translate()(DumbBill)

export default Bill
