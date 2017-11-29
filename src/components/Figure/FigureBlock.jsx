import React from 'react'
import Types from 'prop-types'
import classNames from 'classnames'
import Figure from './Figure'
import styles from './FigureBlock.styl'

/**
 * Shows a `Figure` with a label.
 *
 * A part from `className` and `label`, takes same properties
 * as `Figure`.
 */
const FigureBlock = ({className, label, total, currency, coloredPositive, coloredNegative, signed, decimalNumbers = 0}) => (
  <div className={classNames(styles['bnk-figure-wrapper'], className)}>
    <h4 className={styles['bnk-figure-label']}>
      {label}
    </h4>
    <Figure
      className={styles['bnk-figure']}
      total={total}
      currency={currency}
      coloredPositive={coloredPositive}
      coloredNegative={coloredNegative}
      signed={signed}
      decimalNumbers={decimalNumbers}
    />
  </div>
)

FigureBlock.propTypes = {
  /** Label of the figure */
  label: Types.string.isRequired,
  /** Extra classname */
  className: Types.string
}

export default FigureBlock
