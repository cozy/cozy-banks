/* global __TARGET__ */

import React from 'react'
import PropTypes from 'prop-types'
import { flowRight as compose } from 'lodash'
import { withClient } from 'cozy-client'
import { findMatchingBrand } from 'ducks/brandDictionary'
import { translate } from 'cozy-ui/react'
import IntentModal from 'cozy-ui/react/IntentModal'
import ButtonAction from 'cozy-ui/react/ButtonAction'
import icon from 'assets/icons/actions/icon-link-out.svg'
import styles from 'ducks/transactions/TransactionActions.styl'
import { TransactionModalRow } from 'ducks/transactions/TransactionModal'
import palette from 'cozy-ui/react/palette'
import { triggersConn } from 'doctypes'
import InformativeModal from 'ducks/transactions/actions/KonnectorAction/InformativeModal'

const name = 'konnector'

function getBrandsWithoutTrigger(brands) {
  return brands.filter(brand => !brand.hasTrigger)
}

const transactionModalRowStyle = { color: palette.dodgerBlue }
class _Component extends React.Component {
  state = {
    showInformativeModal: false,
    showIntentModal: false
  }

  showInformativeModal = () =>
    this.setState({
      showInformativeModal: true
    })

  hideInformativeModal = () =>
    this.setState({
      showInformativeModal: false
    })

  showIntentModal = () =>
    this.setState({
      showIntentModal: true
    })

  hideIntentModal = () =>
    this.setState({
      showIntentModal: false
    })

  onInformativeModalConfirm = async () => {
    this.hideInformativeModal()

    if (__TARGET__ === 'browser') {
      this.showIntentModal()
    } else if (__TARGET__ === 'mobile') {
      const brand = this.findMatchingBrand()
      const cozyClient = this.props.client
      const intentWindow = await cozyClient.intents.redirect(
        'io.cozy.apps',
        {
          slug: brand.konnectorSlug,
          type: 'konnector'
        },
        open
      )

      intentWindow.addEventListener('exit', this.props.fetchTriggers)
    }
  }

  onIntentComplete = () => {
    this.props.fetchTriggers()
    this.hideIntentModal()
  }

  findMatchingBrand() {
    const brandsWithoutTrigger = getBrandsWithoutTrigger(
      this.props.actionProps.brands
    )

    return findMatchingBrand(brandsWithoutTrigger, this.props.transaction.label)
  }

  render() {
    const { t, compact, isModalItem } = this.props

    const brand = this.findMatchingBrand()
    if (!brand) return

    const healthOrGeneric = brand.health ? 'health' : 'generic'
    const label = t(`Transactions.actions.konnector.${healthOrGeneric}`)
    const translationKey = `Transactions.actions.informativeModal.${healthOrGeneric}`
    const cozyClient = this.props.client

    return (
      <div>
        {isModalItem ? (
          <TransactionModalRow
            iconLeft="plus"
            style={transactionModalRowStyle}
            onClick={this.showInformativeModal}
          >
            {label}
          </TransactionModalRow>
        ) : (
          <ButtonAction
            label={label}
            leftIcon="plus"
            type="new"
            compact={compact}
            className={styles.TransactionActionButton}
            onClick={this.showInformativeModal}
          />
        )}
        {this.state.showInformativeModal && (
          <InformativeModal
            onCancel={this.hideInformativeModal}
            onConfirm={this.onInformativeModalConfirm}
            title={t(`${translationKey}.title`)}
            description={t(`${translationKey}.description`, {
              brandName: brand.name
            })}
            caption={t('Transactions.actions.informativeModal.caption')}
            cancelText={t('Transactions.actions.informativeModal.cancel')}
            confirmText={t('Transactions.actions.informativeModal.confirm')}
          />
        )}
        {this.state.showIntentModal && (
          <IntentModal
            dismissAction={this.hideIntentModal}
            onComplete={this.onIntentComplete}
            action="INSTALL"
            doctype="io.cozy.apps"
            options={{ slug: brand.konnectorSlug }}
            create={cozyClient.intents.create.bind(cozyClient.intents)}
            mobileFullscreen
          />
        )}
      </div>
    )
  }
}

_Component.propTypes = {
  t: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  actionProps: PropTypes.object.isRequired,
  compact: PropTypes.bool,
  isModalItem: PropTypes.bool,
  fetchTriggers: PropTypes.func.isRequired
}

const Component = withClient(_Component)

const mkFetchTriggers = client => () =>
  client.query(triggersConn.query(client), { as: triggersConn.as })
const addFetchTriggers = Component => {
  const res = (props, context) => (
    <Component {...props} fetchTriggers={mkFetchTriggers(context.client)} />
  )
  res.contextTypes = {
    client: PropTypes.object.isRequired
  }
  res.displayName = `withAddTrigger(${Component.displayName})`
  return res
}

const action = {
  name,
  icon,
  match: (transaction, { brands, urls }) => {
    const brandsWithoutTrigger = getBrandsWithoutTrigger(brands)

    if (!brandsWithoutTrigger) {
      return false
    }

    const matchingBrand = findMatchingBrand(
      brandsWithoutTrigger,
      transaction.label
    )

    return (
      matchingBrand &&
      !matchingBrand.maintenance &&
      (urls['COLLECT'] || urls['HOME'])
    )
  },
  Component: compose(
    translate(),
    addFetchTriggers
  )(Component)
}

export default action
