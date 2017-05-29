/* global cozy */
import styles from '../styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'
import Modal from 'cozy-ui/react/Modal'
import { translate } from '../lib/I18n'
import Figure from './Figure'
import FullscreenIntentModal from './FullscreenIntentModal'

class ViewAction extends React.Component {
  constructor () {
    super()
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  createIntent () {
    const { doctype, id } = this.props.action.payload
    return cozy.client.intents.create('OPEN', doctype, { id })
  }

  showModal () {
    this.setState({ intent: this.createIntent() })
  }

  closeModal () {
    this.setState({ intent: null })
  }

  render () {
    const { action, t } = this.props
    return <span>
      <a onClick={ this.showModal } className={styles['bnk-table-actions-link']}>{t(`Movements.actions.${action.type}`)}</a>
      { this.state.intent
        ? <FullscreenIntentModal
            intent={ this.state.intent }
            onIntentError={ this.handleModalError }
            secondaryAction={ this.closeModal } />
        : null }
    </span>
  }

  handleModalError (err) {
    this.setState({ intent: null })
    console.warn(err)
  }
}

export const Operation = ({ t, f, operation }) => (
  <tr className={styles['coz-table-row']}>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-date'])}>
      {f(operation.date, 'DD MMMM YYYY')}
    </td>
    <td className={classNames(
        styles['coz-table-cell'],
        styles['bnk-table-desc'],
        styles[`bnk-table-desc--${operation.category}`])}
    >
      {operation.label}
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
      <Figure
        total={operation.amount}
        currency={operation.currency}
        signed
        coloredPositive
      />
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
      {!operation.action && '－'}
      {operation.action &&
        <ViewAction t={t} action={operation.action} />
      }
    </td>
  </tr>
)

export default translate()(Operation)
