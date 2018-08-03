import React from 'react'
import Types from 'prop-types'
import cx from 'classnames'
import styles from './Figure.styl'

const currencySigns = {
  EUR: '€',
  USD: '$'
}

/**
 * Shows a number, typically a balance or an important financial
 * number in a bold way.
 */
const stylePositive = styles['Figure-content--positive']
const styleNegative = styles['Figure-content--negative']
const styleWarning = styles['Figure-content--warning']
const styleBig = styles['Figure--big']
const Figure = props => {
  const {
    currency,
    withCurrencySpacing = true,
    coloredPositive,
    coloredNegative,
    coloredWarning,
    warningLimit,
    signed,
    className,
    total,
    totalClassName,
    currencyClassName,
    size
  } = props

  let { decimalNumbers } = props
  decimalNumbers = isNaN(decimalNumbers) ? 2 : decimalNumbers

  const totalLocalized =
    typeof total === 'number'
      ? total.toLocaleString('fr-FR', {
          minimumFractionDigits: decimalNumbers,
          maximumFractionDigits: decimalNumbers
        })
      : total
  const isTotalPositive = total > 0
  const isTotalInLimit = total > warningLimit
  const isWarning = !isTotalPositive && !isTotalInLimit && coloredWarning

  return (
    <div
      className={cx(
        {
          [stylePositive]: isTotalPositive && coloredPositive,
          [styleNegative]:
            total !== 0 && !isTotalPositive && !isWarning && coloredNegative,
          [styleWarning]: isWarning,
          [styleBig]: size == 'big'
        },
        className
      )}
    >
      <span className={cx(styles['Figure-total'], totalClassName)}>
        {isTotalPositive && signed && '+'}
        {totalLocalized}
      </span>
      {currency && (
        <span
          className={cx(
            styles['Figure-currency'],
            {
              [styles['Figure__currency--withSpacing']]: withCurrencySpacing
            },
            currencyClassName
          )}
        >
          {currencySigns[currency] || currency}
        </span>
      )}
    </div>
  )
}

Figure.propTypes = {
  /** Number to display */
  total: Types.oneOfType([Types.number, Types.string]).isRequired,
  /** Class name applied to the element wrapping the number */
  totalClassName: Types.string,
  /** Currency to show */
  currency: Types.string,
  currencyClassName: Types.string,
  /** Colors positive numbers in green */
  coloredPositive: Types.bool,
  /** Colors negative numbers in red */
  coloredNegative: Types.bool,
  /** Displays the sign */
  signed: Types.bool,
  /** Numbers of decimals to show (default=2) */
  decimalNumbers: Types.number,
  /** Whether to add a specific class to show warning */
  warningLimit: Types.number,
  /** Whether to add some spacing between the figure and the currency or not */
  withCurrencySpacing: Types.bool
}

export default Figure
