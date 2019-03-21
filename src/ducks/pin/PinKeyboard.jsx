import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

import styles from 'ducks/pin/styles'
import Round from 'ducks/pin/Round'

class PinKeyboard extends React.PureComponent {
  constructor(props) {
    super(props)
  }



  }

  render() {
    return (
      <div className={styles.PinKeyboard}>
        {range(1, 10).map(n => (
          <Round key={n}>{n}</Round>
        ))}
        <Round>0</Round>
        <Round className="u-hide" />
      </div>
    )
  }

}

export default PinKeyboard
