import styles from '../styles/figure'

import React, { Component } from 'react'

class Figure extends Component {
  render () {
    const { total, currency, colored, signed } = this.props
    const isTotalPositive = total > 0
    let totalCSSClass = ''
    if (colored && total !== 0) {
      totalCSSClass = isTotalPositive ? 'bnk-figure-content--positive' : 'bnk-figure-content--negative'
    }
    return (
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
    )
  }
}

export default Figure
