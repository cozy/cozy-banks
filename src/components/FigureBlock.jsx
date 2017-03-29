import styles from '../styles/figureBlock'

import React, { Component } from 'react'
import Figure from './Figure'

class FigureBlock extends Component {
  render () {
    const {
      label, total, currency, coloredPositive, coloredNegative, signed
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
        />
      </div>
    )
  }
}

export default FigureBlock
