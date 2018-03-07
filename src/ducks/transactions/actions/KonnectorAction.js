import React from 'react'
import { matchBrands, findMatchingBrand } from 'ducks/brandDictionary'
import { IntentOpener, translate } from 'cozy-ui/react'
import styles from '../TransactionActions.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'
const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

export const TYPE = 'konnector'

export const match = ({ transaction, brands }) => {
  return matchBrands(brands, transaction.label)
}

const Action = ({t, transaction, brands}) => {
  const brand = findMatchingBrand(brands, transaction.label)
  if (!brand) return

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

export default translate()(Action)
