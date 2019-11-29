import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal, { ModalDescription } from 'cozy-ui/react/Modal'
import Panel from 'cozy-ui/react/Panel'
import IntentIframe from 'cozy-ui/react/IntentIframe'
import styles from './AugmentedModal.styl'
import { Intents } from 'cozy-interapp'
import {
  Header as VentePriveeHeader,
  Side as VentePriveeSide
} from './VentePrivee'

class Content extends Component {
  static contextTypes = {
    client: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.intents = new Intents({ client: this.context.client })
  }

  render() {
    const { fileId, sideContent } = this.props
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
          <div className={styles.FakeInfos}>{sideContent}</div>
        </Panel.Side>
      </Panel.Group>
    )
  }
}

const AugmentedModal = ({ onClose, fileId }) => {
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
        <Content
          fileId={fileId}
          sideContent={sideContent}
          transaction={transaction}
        />
      </ModalDescription>
    </Modal>
  )
}

/**
 * This is like a `FileOpener`, but it opens an `AugmentedModal`.
 * This is used for demo purposes only
 */
export class AugmentedModalOpener extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = { isOpen: false }

  handleOpen = () => this.setState({ isOpen: true })
  handleClose = () => this.setState({ isOpen: false })

  render() {
    return (
      <>
        {React.cloneElement(this.props.children, { onClick: this.handleOpen })}
        {this.state.isOpen && (
          <AugmentedModal
            onClose={this.handleClose}
            fileId={this.props.fileId}
          />
        )}
      </>
    )
  }
}

export default AugmentedModal
