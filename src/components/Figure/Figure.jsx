import React from 'react'
import Types from 'prop-types'
import classNames from 'classnames'
import styles from './Figure.styl'

/**
 * Shows a number, typically a balance or an important financial
 * number in a bold way.
 */
const Figure = props => {
  const {
    total, currency, coloredPositive, coloredNegative, signed, className
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
    <div className={classNames(styles[totalCSSClass], className)}>
      <span className={styles['bnk-figure-total']}>
        {(isTotalPositive && signed) && '+'}
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
  decimalNumbers: Types.number
}

export default Figure
