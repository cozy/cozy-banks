import React from 'react'
import { flowRight as compose } from 'lodash'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import { IntentOpener, translate, withBreakpoints } from 'cozy-ui/react'
import styles from '../TransactionActions.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'
const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

export const TYPE = 'konnector'

export const match = ({ transaction, brands }) => {
  return matchBrands(brands, transaction.label)
}

const Action = ({t, transaction, brands, urls, breakpoints: { isDesktop }}) => {
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

export default compose(
  withBreakpoints(),
  translate()
)(Action)
