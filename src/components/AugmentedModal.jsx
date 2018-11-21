import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalDescription, Panel, IntentIframe } from 'cozy-ui/react'
import ventePrivee from 'assets/vente-privee.png'
import styles from './AugmentedModal.styl'
import ventePriveeInfo from 'assets/venteprivee-info.png'
import ventePriveeInfo2x from 'assets/venteprivee-info@2x.png'
import { Intents } from 'cozy-interapp'

const { ModalBrandedHeader } = Modal

class Content extends Component {
  static contextTypes = {
    client: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.intents = new Intents({ client: this.context.client })
  }

  render() {
    const { fileId } = this.props
    return (
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
          <div className={styles.FakeInfos}>
            <a
              href="https://secure.fr.vente-privee.com/authentication/portal/FR"
              className={styles.FakeInfosLinkVendor}
              target="_blank"
              rel="noreferrer noopener"
            />
            <a
              href="https://isabelledurand-drive.mycozy.cloud/#/folder/7aadd73f48591c0df263640687052a2d"
              className={styles.FakeInfosLinkDrive}
              target="_blank"
              rel="noreferrer noopener"
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

const modalBrandedHeaderStyle = { marginBottom: 0 }
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
      style={modalBrandedHeaderStyle}
    />
    <ModalDescription className={styles.AugmentedModalDescription}>
      <Content fileId={fileId} />
    </ModalDescription>
  </Modal>
)

export default AugmentedModal
