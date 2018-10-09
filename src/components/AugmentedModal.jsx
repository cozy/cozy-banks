import React, { Component } from 'react'
import { Modal, ModalDescription, Panel, IntentIframe } from 'cozy-ui/react'
import ventePrivee from 'assets/vente-privee.png'
import styles from './AugmentedModal.styl'
import ventePriveeInfo from 'assets/venteprivee-info.png'
import ventePriveeInfo2x from 'assets/venteprivee-info@2x.png'

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
          <div className={styles.FakeInfos}>
            <a
              href="https://secure.fr.vente-privee.com/authentication/portal/FR"
              className={styles.FakeInfosLinkVendor}
            />
            <a
              href="https://isabelledurand-drive.mycozy.cloud/#/folder/7aadd73f48591c0df263640687052a2d"
              className={styles.FakeInfosLinkDrive}
            />
            <img
              src={ventePriveeInfo}
              srcSet={`${ventePriveeInfo2x} 2x`}
              alt=""
            />
          </div>
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
    <ModalDescription className={styles.AugmentedModalDescription}>
      <Content fileId={fileId} />
    </ModalDescription>
  </Modal>
)

export default AugmentedModal
