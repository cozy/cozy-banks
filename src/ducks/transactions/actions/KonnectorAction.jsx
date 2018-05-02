import React from 'react'
import { flowRight as compose } from 'lodash'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import {
  IntentOpener,
  translate,
  withBreakpoints,
  ButtonAction
} from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import styles from '../TransactionActions.styl'
import { TransactionModalRow } from '../TransactionModal'
import palette from 'cozy-ui/stylus/settings/palette.json'

const name = 'konnector'

const Component = ({
  t,
  transaction,
  actionProps,
  breakpoints: { isDesktop },
  compact,
  isModalItem
}) => {
  const { brands, urls } = actionProps
  const brand = findMatchingBrand(brands, transaction.label)
  if (!brand) return

  const label = t('Transactions.actions.konnector', { vendor: brand.name })

  if (isDesktop) {
    return (
      <IntentOpener
        onComplete={() => {}}
        onDismiss={() => {}}
        action="CREATE"
        doctype="io.cozy.accounts"
        options={{ slug: brand.konnectorSlug }}
      >
        {isModalItem ? (
          <TransactionModalRow
            iconLeft="plus"
            style={{ color: palette.dodgerBlue }}
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
          />
        )}
      </IntentOpener>
    )
  }

  const url = `${urls['COLLECT']}#/providers/all/${brand.konnectorSlug}`

  if (isModalItem) {
    return (
      <TransactionModalRow
        text={label}
        iconLeft="plus"
        onClick={() => open(url)}
      />
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

const action = {
  name,
  icon,
  match: (transaction, { brands, urls }) => {
    return brands && matchBrands(brands, transaction.label) && urls['COLLECT']
  },
  Component: compose(withBreakpoints(), translate())(Component)
}

export default action
