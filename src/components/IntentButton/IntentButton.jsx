import React from 'react'
import { Modal } from 'cozy-ui/react'
import styles from './IntentButton.styl'
import Intent from './Intent'

class IntentButton extends React.Component {
  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render () {
    const { data, action, docType, children } = this.props
    const { modalIsOpen } = this.state
    return (
      <span className={styles.intentButton}>
        {modalIsOpen && (
          <Modal secondaryAction={() => this.closeModal()}>
            <Intent
              action={action}
              docType={docType}
              data={data}
              closeModal={this.closeModal}
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
