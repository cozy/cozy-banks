import React from 'react'
import Figure from './Figure'
import styles from './FigureBlock.styl'

const FigureBlock = props => {
  const {
    label, total, currency, coloredPositive, coloredNegative, signed, decimalNumbers
  } = props

  return (
    <div className={styles['bnk-figure-wrapper']}>
      <h4 className={styles['bnk-figure-label']}>
        {label}
      </h4>
      <Figure
        total={total}
        currency={currency}
        coloredPositive={coloredPositive}
        coloredNegative={coloredNegative}
        signed={signed}
        decimalNumbers={decimalNumbers}
      />
    </div>
  )
}

export default FigureBlock
