import React from 'react'
import { Modal } from 'cozy-ui/react'
import Intent from './Intent'
import styles from './Intent.styl'

/*
 * This component aims to display intent modal
 */

class IntentButton extends React.Component {
  state = {
    modalOpened: false
  }

  openModal = () => {
    this.setState({
      modalOpened: true
    })
  }

  closeModal = () => {
    this.setState({
      modalOpened: false
    })
  }

  render () {
    const { data, action, docType, children } = this.props
    const { modalOpened } = this.state
    return (
      <span>
        {modalOpened && (
          <Modal className={styles.intentModal} secondaryAction={() => this.closeModal()} withCross={false}>
            <Intent
              action={action}
              docType={docType}
              data={data}
              callback={this.closeModal}
            />
          </Modal>
        )}
        <span onClick={() => this.openModal()}>
          {children}
        </span>
      </span>
    )
  }
}

export default IntentButton
