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

const name = 'konnector'

const Component = ({
  t,
  transaction,
  actionProps,
  breakpoints: { isDesktop },
  compact
}) => {
  const { brands, urls } = actionProps
  const brand = findMatchingBrand(brands, transaction.label)
  if (!brand) return

  if (isDesktop) {
    return (
      <IntentOpener
        onComplete={() => {}}
        onDismiss={() => {}}
        action="CREATE"
        doctype="io.cozy.accounts"
        options={{ slug: brand.konnectorSlug }}
      >
        <ButtonAction
          label={t('Transactions.actions.konnector', { vendor: brand.name })}
          leftIcon="plus"
          type="new"
          compact={compact}
        />
      </IntentOpener>
    )
  }

  const url = `${urls['COLLECT']}#/providers/all/${brand.konnectorSlug}`
  return (
    <ButtonAction
      onClick={() => open(url)}
      rightIcon="plus"
      type="new"
      compact={true}
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
