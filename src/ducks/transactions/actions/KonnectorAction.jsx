/* global __TARGET__ */

import React from 'react'
import PropTypes from 'prop-types'
import { flowRight as compose } from 'lodash'
import cx from 'classnames'
import { connect } from 'react-redux'
import { fetchCollection } from 'cozy-client'
import { TRIGGER_DOCTYPE } from 'doctypes'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import {
  IntentModal,
  translate,
  ButtonAction,
  Modal,
  ModalDescription,
  Button,
  Title,
  Text,
  Caption,
  Icon
} from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import styles from '../TransactionActions.styl'
import { TransactionModalRow } from '../TransactionModal'
import palette from 'cozy-ui/stylus/settings/palette.json'
import iconCollectAccount from 'assets/icons/icon-collect-account.svg'

const name = 'konnector'

const _InformativeModal = ({ brand, onCancel, onConfirm, t }) => (
  <Modal into="body" mobileFullscreen dismissAction={onCancel}>
    <ModalDescription className={styles.InformativeModal__content}>
      <Icon
        icon={iconCollectAccount}
        width={192}
        height={112}
        className={styles.InformativeModal__illustration}
      />
      <Title tag="h2" className={cx('u-mt-1-half', 'u-mb-0', 'u-text-center')}>
        {t('Transactions.actions.informativeModal.title')}
      </Title>
      <Text tag="p">
        {t('Transactions.actions.informativeModal.description', {
          brand: brand.name
        })}
      </Text>
      <div className={styles.InformativeModal__bottom}>
        <Caption tag="p" className={cx('u-mt-0', 'u-mb-1')}>
          {t('Transactions.actions.informativeModal.caption')}
        </Caption>
        <div className={styles.InformativeModal__buttons}>
          <Button onClick={onCancel} theme="secondary">
            {t('Transactions.actions.informativeModal.cancel')}
          </Button>
          <Button onClick={onConfirm}>
            {t('Transactions.actions.informativeModal.confirm')}
          </Button>
        </div>
      </div>
    </ModalDescription>
  </Modal>
)

const InformativeModal = translate()(_InformativeModal)

class Component extends React.Component {
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

  onInformativeModalConfirm = () => {
    this.hideInformativeModal()
    this.showIntentModal()
  }

  onIntentComplete = () => {
    this.props.fetchTriggers()
    this.hideIntentModal()
  }

  render() {
    const { t, transaction, actionProps, compact, isModalItem } = this.props

    const { brands, urls } = actionProps
    const brand = findMatchingBrand(brands, transaction.label)
    if (!brand) return

    const label = t('Transactions.actions.konnector', { vendor: brand.name })

    if (__TARGET__ === 'browser') {
      return (
        <div>
          {isModalItem ? (
            <TransactionModalRow
              iconLeft="plus"
              style={{ color: palette.dodgerBlue }}
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
              brand={brand}
              onCancel={this.hideInformativeModal}
              onConfirm={this.onInformativeModalConfirm}
            />
          )}
          {this.state.showIntentModal && (
            <IntentModal
              dismissAction={this.hideIntentModal}
              onComplete={this.onIntentComplete}
              action="CREATE"
              doctype="io.cozy.accounts"
              options={{ slug: brand.konnectorSlug }}
              mobileFullscreen
            />
          )}
        </div>
      )
    }

    const url = `${urls['COLLECT']}#/providers/all/${brand.konnectorSlug}`

    if (isModalItem) {
      return (
        <TransactionModalRow
          iconLeft="plus"
          onClick={() => open(url)}
          style={{ color: palette.dodgerBlue }}
        >
          {label}
        </TransactionModalRow>
      )
    }

    return (
      <ButtonAction
        onClick={() => open(url)}
        rightIcon="plus"
        type="new"
        compact={true}
        className={styles.TransactionActionButton}
      />
    )
  }
}

Component.propTypes = {
  t: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  actionProps: PropTypes.object.isRequired,
  compact: PropTypes.bool,
  isModalItem: PropTypes.bool,
  fetchTriggers: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  fetchTriggers: () => dispatch(fetchCollection('triggers', TRIGGER_DOCTYPE))
})

const action = {
  name,
  icon,
  match: (transaction, { brands, urls }) => {
    return brands && matchBrands(brands, transaction.label) && urls['COLLECT']
  },
  Component: compose(connect(null, mapDispatchToProps), translate())(Component)
}

export default action
