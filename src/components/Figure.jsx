import styles from '../styles/figure'

import React, { Component } from 'react'

class Figure extends Component {
  render () {
    const {
      total, currency, coloredPositive, coloredNegative, signed
    } = this.props
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
