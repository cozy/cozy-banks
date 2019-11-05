import React from 'react'
import PercentageLine from 'cozy-ui/transpiled/react/PercentageLine'
import cx from 'classnames'
import styles from 'ducks/loan/LoanPercentageLine.styl'

const LoanPercentageLine = props => {
  const { className, ...rest } = props

  return (
    <PercentageLine
      className={cx(styles.LoanPercentageLine, className)}
      color="var(--emerald)"
      {...rest}
    />
  )
}

export default LoanPercentageLine
