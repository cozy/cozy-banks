import React, { Component } from 'react'
import { Modal, Panel, IntentIframe } from 'cozy-ui/react'
import ventePrivee from 'assets/vente-privee.png'
import styles from './AugmentedModal.styl'
import ventePriveeInfo from 'assets/venteprivee-info.png'

const { ModalBrandedHeader } = Modal

class Content extends Component {
  render() {
    const { fileId } = this.props
    return (
      <Panel.Group>
        <Panel.Main className={styles.AugmentedModalIntent}>
          <IntentIframe
            action="OPEN"
            type="io.cozy.files"
            data={{ id: fileId }}
          />
        </Panel.Main>
        <Panel.Side>
          <img src={ventePriveeInfo} />
        </Panel.Side>
      </Panel.Group>
    )
  }
}

const AugmentedModal = ({ onClose, fileId }) => (
  <Modal
    into="body"
    dismissAction={onClose}
    size="xxlarge"
    overflowHidden={true}
  >
    <ModalBrandedHeader
      bg="#eee"
      logo={ventePrivee}
      style={{ marginBottom: 0 }}
    />
    <Content fileId={fileId} />
  </Modal>
)

export default AugmentedModal
