import React from 'react'
import { translate } from 'cozy-ui/react'
import Modal, { ModalDescription } from 'cozy-ui/react/Modal'
import Radio from 'cozy-ui/react/Radio'
import { List, Row } from 'components/List'
import styles from 'ducks/transactions/actions/ReimbursementStatusAction/ReimbursementStatusModal.styl'

class _ReimbursementStatusModal extends React.PureComponent {
  render() {
    const { currentStatus, onChange, t, ...rest } = this.props
    const choices = ['pending', 'reimbursed', 'no-reimbursement']

    return (
      <Modal {...rest}>
        <ModalDescription
          className={styles.ReimbursementStatusModal__description}
        >
          <form>
            <List>
              {choices.map(choice => (
                <Row key={choice}>
                  <Radio
                    key={choice}
                    name="reimbursementStatus"
                    value={choice}
                    label={t(`Transactions.reimbursementStatus.${choice}`)}
                    checked={currentStatus === choice}
                    onChange={onChange}
                    className={styles.ReimbursementStatusModal__radio}
                  />
                </Row>
              ))}
            </List>
          </form>
        </ModalDescription>
      </Modal>
    )
  }
}

const ReimbursementStatusModal = translate()(_ReimbursementStatusModal)

export default ReimbursementStatusModal
