import React, { Component } from 'react'
import Modal, { ModalDescription } from 'cozy-ui/react/Modal'
import Panel from 'cozy-ui/react/Panel'
import { withClient } from 'cozy-client'
import IntentIframe from 'cozy-ui/react/IntentIframe'
import styles from './AugmentedModal.styl'
import { Intents } from 'cozy-interapp'
import {
  Header as VentePriveeHeader,
  Side as VentePriveeSide
} from './VentePrivee'

class AugmentedModal extends Component {
  constructor(props, context) {
    super(props, context)
    this.intents = new Intents({ client: props.client })
  }

  render() {
    const { onClose, fileId } = this.props
    const header = <VentePriveeHeader />
    const sideContent = <VentePriveeSide />
    return (
      <Modal
        into="body"
        dismissAction={onClose}
        size="xxlarge"
        overflowHidden={true}
      >
        {header}
        <ModalDescription className={styles.AugmentedModalDescription}>
          <Panel.Group>
            <Panel.Main className={styles.AugmentedModalIntent}>
              <IntentIframe
                action="OPEN"
                type="io.cozy.files"
                data={{ id: fileId }}
                create={this.intents.create}
              />
            </Panel.Main>
            <Panel.Side>
              <div className={styles.FakeInfos}>{sideContent}</div>
            </Panel.Side>
          </Panel.Group>
        </ModalDescription>
      </Modal>
    )
  }
}

export default withClient(AugmentedModal)
