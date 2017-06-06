import styles from 'styles/figureBlock'

import React, { Component } from 'react'
import Figure from 'components/Figure'

class FigureBlock extends Component {
  render () {
    const {
      label, total, currency, coloredPositive, coloredNegative, signed, decimalNumbers
    } = this.props
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
}

export default FigureBlock
