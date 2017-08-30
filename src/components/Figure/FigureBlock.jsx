import React from 'react'
import classNames from 'classnames'
import Figure from './Figure'
import styles from './FigureBlock.styl'

const FigureBlock = ({className, label, total, currency, coloredPositive, coloredNegative, signed, decimalNumbers}) => (
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

export default FigureBlock
