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
import ActionLink from './ActionLink'

const name = 'konnector'

const Component = ({
  t,
  transaction,
  actionProps,
  breakpoints: { isDesktop },
  compact,
  itemsOnly
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
        <ButtonAction
          label={label}
          leftIcon="plus"
          type="new"
          compact={compact}
        />
      </IntentOpener>
    )
  }

  const url = `${urls['COLLECT']}#/providers/all/${brand.konnectorSlug}`

  if (itemsOnly) {
    return <ActionLink text={label} icon="plus" href={url} />
  }

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
