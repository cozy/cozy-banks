import React from 'react'
import { flowRight as compose } from 'lodash'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import { IntentOpener, translate, withBreakpoints } from 'cozy-ui/react'
import styles from '../TransactionActions.styl'
import linkOutIcon from 'assets/icons/actions/icon-link-out.svg'
import palette from 'cozy-ui/stylus/settings/palette.json'
const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

const Action = ({t, transaction, actionProps: { brands, urls }, breakpoints: { isDesktop }}) => {
  const brand = findMatchingBrand(brands, transaction.label)
  if (!brand) return

  if (isDesktop) {
    return (
      <IntentOpener
        action='CREATE'
        doctype='io.cozy.accounts'
        options={{slug: brand.konnectorSlug}}
      >
        <a
          style={{ color: PRIMARY_ACTION_COLOR }}
          className={styles.TransactionAction}
        >{t('Transactions.actions.konnector', {vendor: brand.name})}</a>
      </IntentOpener>
    )
  }

  const collectUrl = `${urls['COLLECT']}providers/all/${brand.konnectorSlug}`

  return (
    <a
      href={collectUrl}
      style={{ color: PRIMARY_ACTION_COLOR }}
      className={styles.TransactionAction}
    >{t('Transactions.actions.konnector', {vendor: brand.name})}</a>
  )
}

const action = {
  name: 'KonnectorAction',
  icon: linkOutIcon,
  match: (transaction, { brands }) => {
    return brands && matchBrands(brands, transaction.label)
  },
  Component: compose(
    withBreakpoints(),
    translate()
  )(Action)
}

export default action
