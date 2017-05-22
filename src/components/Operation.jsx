/* global cozy */
import styles from '../styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'
import Modal from 'cozy-ui/react/Modal'
import { translate } from '../lib/I18n'
import confirm from '../lib/confirm'

const wrapIframe = (element, doctype, id) => {
  cozy.client.intents
  .create('OPEN', doctype, { id })
  .start(element)
  .then(response => console.log('intent service response: ', response))
}

const showIframeModal = ({doctype, id}) => {
  confirm(<Modal
    title={'title'}
    description={<div ref={iframeHolder => wrapIframe(iframeHolder, doctype, id)} />}
    secondaryText={'secondary text'}
    secondaryAction={() => {}}
    primaryType='danger'
    primaryText={'primary text'}
    primaryAction={() => {}}
   />)
}

import Figure from '../components/Figure'

class ViewAction extends React.Component {
  render () {
    const { action, t } = this.props
    console.log(action.payload)
    return (
      <a onClick={() => showIframeModal(action.payload)} className={styles['bnk-table-actions-link']}>{t(`Movements.actions.${action.type}`)}</a>
    )
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
