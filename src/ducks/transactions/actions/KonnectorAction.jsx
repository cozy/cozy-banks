import React from 'react'
import { flowRight as compose } from 'lodash'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import { IntentOpener, translate, withBreakpoints } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import GenericComponent from './GenericComponent'

const name = 'konnector'

const Component = ({t, transaction, actionProps, breakpoints: { isDesktop }}) => {
  const { brands, urls } = actionProps
  const brand = findMatchingBrand(brands, transaction.label)
  if (!brand) return

  if (isDesktop) {
    return (
      <IntentOpener
        action='CREATE'
        doctype='io.cozy.accounts'
        options={{slug: brand.konnectorSlug}}
      >
        <GenericComponent
          text={t('Transactions.actions.konnector', {vendor: brand.name})}
        />
      </IntentOpener>
    )
  }

  const collectUrl = `${urls['COLLECT']}providers/all/${brand.konnectorSlug}`

  return (
    <GenericComponent
      href={collectUrl}
      text={t(`Transactions.actions.${name}`, {vendor: brand.name})}
    />
  )
}

const action = {
  name,
  icon,
  match: (transaction, { brands }) => {
    return brands && matchBrands(brands, transaction.label)
  },
  Component: compose(
    withBreakpoints(),
    translate()
  )(Component)
}

export default action
