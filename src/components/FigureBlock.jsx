import styles from '../styles/figureBlock'

import React, { Component } from 'react'

class FigureBlock extends Component {
  render () {
    const { label, total, currency, colored, signed } = this.props
    const isTotalPositive = total > 0
    let totalCSSClass = ''
    if (colored && total !== 0) {
      totalCSSClass = isTotalPositive ? 'bnk-figure-total--positive' : 'bnk-figure-total--negative'
    }
    return (
      <div className={styles['bnk-figure-wrapper']}>
        <h4 className={styles['bnk-figure-label']}>
          {label}
        </h4>
        <div className={styles[totalCSSClass]}>
          {(isTotalPositive && signed) && '+'}
          <span className={styles['bnk-figure-total']}>
            {total.toLocaleString('fr-FR')}
          </span>
          {currency &&
            <span className={styles['bnk-figure-currency']}>
              {currency}
            </span>
          }
        </div>
      </div>
    )
  }
}

export default FigureBlock
