import styles from '../styles/figureBlock'

import React, { Component } from 'react'
import Figure from './Figure'

class FigureBlock extends Component {
  render () {
    const { label, total, currency, colored, signed } = this.props
    return (
      <div className={styles['bnk-figure-wrapper']}>
        <h4 className={styles['bnk-figure-label']}>
          {label}
        </h4>
        <Figure
          total={total}
          currency={currency}
          colored={colored}
          signed={signed}
        />
      </div>
    )
  }
}

export default FigureBlock
