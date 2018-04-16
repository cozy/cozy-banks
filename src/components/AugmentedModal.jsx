import React, { Component } from 'react'
import { Modal, Panel } from 'cozy-ui/react'
import IntentIframe from 'cozy-ui/react/IntentModal/IntentIframe'
import ventePrivee from 'assets/vente-privee.png'
import styles from './AugmentedModal.styl'

const { ModalBrandedHeader } = Modal

const Section = ({ title, children }) => (
  <div>
    <h3 key="title" style={{ color: '#e2017b' }}>
      {title}
    </h3>
    <p key="p">{children}</p>
  </div>
)

class Content extends Component {
  render() {
    const { fileId } = this.props
    return (
      <Panel.Group>
        <Panel.Main className={styles.AugemntedModalIntent}>
          <IntentIframe
            action="OPEN"
            doctype="io.cozy.files"
            options={{ id: fileId }}
          />
        </Panel.Main>
        <Panel.Side>
          <Section title="Date">Yop</Section>
          <Section title="Montant">Ouf</Section>
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
