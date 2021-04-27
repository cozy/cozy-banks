import React, { Component } from 'react'
import cx from 'classnames'
import Dialog, { DialogContent } from 'cozy-ui/transpiled/react/Dialog'
import Panel from 'cozy-ui/transpiled/react/Panel'
import { withClient } from 'cozy-client'
import IntentIframe from 'cozy-ui/transpiled/react/IntentIframe'
import styles from './AugmentedModal.styl'
import {
  Header as VentePriveeHeader,
  Side as VentePriveeSide
} from './VentePrivee'
import { Side as AmeliSide } from './Ameli'
import { getTransactionVendor } from './helpers'

const componentsPerTransactionVendor = {
  ventePrivee: {
    Header: VentePriveeHeader,
    Side: VentePriveeSide
  },
  ameli: {
    Side: AmeliSide
  }
}

class AugmentedModal extends Component {
  render() {
    const { onClose, fileId, transaction } = this.props
    const vendor = getTransactionVendor(transaction)
    const { Header, Side } = componentsPerTransactionVendor[vendor]
    return (
      <Dialog
        into="body"
        dismissAction={onClose}
        size="xxlarge"
        overflowHidden={true}
      >
        {Header && <Header transaction={transaction} />}
        <DialogContent
          className={cx(
            styles.AugmentedModalDescription,
            !Header && styles['AugmentedModalDescription--NoHeader']
          )}
        >
          <Panel.Group>
            <Panel.Main className={styles.AugmentedModalIntent}>
              <IntentIframe
                action="OPEN"
                type="io.cozy.files"
                data={{ id: fileId }}
              />
            </Panel.Main>
            <Panel.Side>
              <div className={styles.FakeInfos}>
                <Side transaction={transaction} />
              </div>
            </Panel.Side>
          </Panel.Group>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withClient(AugmentedModal)
