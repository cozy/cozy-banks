import React from 'react'
import styles from './Figure.styl'

const Figure = props => {
  const {
    total, currency, coloredPositive, coloredNegative, signed
  } = props

  let { decimalNumbers } = props
  decimalNumbers = isNaN(decimalNumbers) ? 2 : decimalNumbers

  const isTotalPositive = total > 0
  let totalCSSClass = ''
  if (total !== 0) {
    if (isTotalPositive && coloredPositive) {
      totalCSSClass = 'bnk-figure-content--positive'
    } else if (!isTotalPositive && coloredNegative) {
      totalCSSClass = 'bnk-figure-content--negative'
    }
  }

  return (
    <div className={styles[totalCSSClass]}>
      {(isTotalPositive && signed) && '+'}
      <span className={styles['bnk-figure-total']}>
        {total.toLocaleString(
          'fr-FR',
          {maximumFractionDigits: decimalNumbers,
            minimumFractionDigits: decimalNumbers})
        }
      </span>
      {currency &&
        <span className={styles['bnk-figure-currency']}>
          {currency}
        </span>
      }
    </div>
  )
}

export default Figure
