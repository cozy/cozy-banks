import React from 'react'
import { sumBy } from 'lodash'
import styles from './styles.styl'
import { Figure } from 'components/Figure'
import BarItem from 'components/BarItem'

const BarBalance = ({ accounts }) => (
  <BarItem>
    <Figure
      className={styles['BarBalance']}
      currency="€"
      decimalNumbers={0}
      coloredPositive={true}
      coloredNegative={true}
      total={sumBy(accounts, 'balance')}
    />
  </BarItem>
)

export default BarBalance
