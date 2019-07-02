/* global __DEV__ */

import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react'
import Chip from 'cozy-ui/react/Chip'
import flag from 'cozy-flags'
import FileOpener from 'ducks/transactions/FileOpener'
import FileIcon from 'ducks/transactions/actions/AttachedDocsAction/FileIcon'
import { Figure } from 'components/Figure'
import { AugmentedModalOpener } from 'components/AugmentedModal'

export class DumbBillChip extends React.PureComponent {
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
    let invoiceId

    try {
      invoiceId = this.getInvoiceId(bill)[1]
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    }

    const isVentePrivee = flag('demo') && bill.vendor === 'Vente Privée'

    const Wrapper = isVentePrivee ? AugmentedModalOpener : FileOpener

    return (
      <Wrapper fileId={invoiceId} key={invoiceId}>
        <Chip component="button" size="small" variant="outlined">
          <FileIcon
            color={bill.isRefund ? 'var(--emerald)' : undefined}
            className="u-flex-shrink-0"
          />
          {bill.isRefund ? (
            <>
              {bill.vendor && (
                <span className="u-valid u-mr-half">{bill.vendor}</span>
              )}
              <Figure total={bill.amount} coloredPositive signed symbol="€" />
            </>
          ) : (
            t('Transactions.actions.attachedDocs.bill')
          )}
        </Chip>
      </Wrapper>
    )
  }
}

const BillChip = translate()(DumbBillChip)

export default BillChip
