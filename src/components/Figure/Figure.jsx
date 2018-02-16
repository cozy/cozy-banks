import React from 'react'
import Types from 'prop-types'
import classNames from 'classnames'
import styles from './Figure.styl'

const currencySigns = {
  'EUR': '€',
  'USD': '$'
}

/**
 * Shows a number, typically a balance or an important financial
 * number in a bold way.
 */
const Figure = props => {
  const {
    currency, coloredPositive, coloredNegative, coloredWarning, warningLimit, signed, className, total
  } = props

  let { decimalNumbers } = props
  decimalNumbers = isNaN(decimalNumbers) ? 2 : decimalNumbers

  const totalLocalized = total.toLocaleString('fr-FR', {
    minimumFractionDigits: decimalNumbers,
    maximumFractionDigits: decimalNumbers
  })
  const isTotalPositive = total > 0
  const isTotalInLimit = total > warningLimit
  let totalCSSClass = ''
  if (total !== 0) {
    if (isTotalPositive && coloredPositive) {
      totalCSSClass = 'bnk-figure-content--positive'
    } else if (!isTotalPositive && coloredNegative) {
      totalCSSClass = 'bnk-figure-content--negative'
    } else if (!isTotalInLimit && coloredWarning) {
      totalCSSClass = 'bnk-figure-content--warning'
    }
  }

  return (
    <div className={classNames(styles[totalCSSClass], className)}>
      <span className={styles['bnk-figure-total']}>
        {(isTotalPositive && signed) && '+'}
        {totalLocalized}
      </span>
      {currency &&
        <span className={styles['bnk-figure-currency']}>
          {currencySigns[currency] || currency}
        </span>
      }
    </div>
  )
}

Figure.propTypes = {
  /** Number to display */
  total: Types.number.isRequired,
  /** Currency to show */
  currency: Types.string,
  /** Colors positive numbers in green */
  coloredPositive: Types.bool,
  /** Colors negative numbers in red */
  coloredNegative: Types.bool,
  /** Displays the sign */
  signed: Types.bool,
  /** Numbers of decimals to show (default=2) */
  decimalNumbers: Types.number,
  /** Whether to add a specific class to show warning */
  warningLimit: Types.number
}

export default Figure
