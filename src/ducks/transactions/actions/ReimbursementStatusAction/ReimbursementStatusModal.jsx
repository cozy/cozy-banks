import React from 'react'
import { translate } from 'cozy-ui/react'
import Modal from 'cozy-ui/react/Modal'
import Icon from 'cozy-ui/react/Icon'
import { Title, Text } from 'cozy-ui/react/Text'
import cx from 'classnames'
import { List, Row, Radio } from 'components/List'
import iconReimbursement from 'assets/icons/icon-reimbursement-detailed.svg'
import styles from 'ducks/transactions/actions/ReimbursementStatusAction/ReimbursementStatusModal.styl'
import { getReimbursementStatus, getLabel } from 'ducks/transactions/helpers'

class _ReimbursementStatusModal extends React.PureComponent {
  render() {
    const { transaction, onChange, t, className, ...rest } = this.props
    const choices = ['pending', 'reimbursed', 'no-reimbursement']
    const status = getReimbursementStatus(transaction)

    return (
      <Modal mobileFullscreen className={cx('u-pt-2', className)} {...rest}>
        <header className="u-ta-center">
          <Icon icon={iconReimbursement} size={56} color="var(--slateGrey)" />
          <Title className="u-mt-1">
            {t('Transactions.actions.reimbursementStatus.modal.title')}
          </Title>
          <Text className={styles.ReimbursementStatusModal__transactionLabel}>
            {getLabel(transaction)}
          </Text>
        </header>
        <form className="u-mt-1">
          <List bordered>
            {choices.map(choice => (
              <Row key={choice}>
                <Radio
                  key={choice}
                  name="reimbursementStatus"
                  value={choice}
                  label={t(`Transactions.reimbursementStatus.${choice}`)}
                  checked={status === choice}
                  onChange={onChange}
                  className={cx('u-mb-0', styles.Radio)}
                />
              </Row>
            ))}
          </List>
        </form>
      </Modal>
    )
  }
}

const ReimbursementStatusModal = translate()(_ReimbursementStatusModal)

export default ReimbursementStatusModal
