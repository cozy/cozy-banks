import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import PercentageLine from 'components/PercentageLine'
import { BackButtonMobile } from 'components/BackButton'

const styles = {
  percBackground: {
    backgroundColor: 'var(--silver)'
  },
  percLine: {
    height: 5,
    marginBottom: '0.5rem'
  }
}
/**
 * Controlled component responsible for containing a list of views like
 * a carousel. Progression bar at the top and back button displayed when
 * not on first view.
 */
class Stepper extends React.Component {
  render() {
    const { current, children, onBack } = this.props
    return (
      <>
        <div style={styles.percBackground}>
          <PercentageLine
            color="var(--primaryColor)"
            style={styles.percLine}
            value={Math.max((current / children.length) * 100, 1)}
          />
        </div>
        {current > 0 ? <BackButtonMobile onClick={onBack} /> : null}
        <SwipeableViews animateHeight disabled index={current}>
          {React.Children.map(children, (child, i) => {
            return React.cloneElement(child, { active: i === current })
          })}
        </SwipeableViews>
      </>
    )
  }
}

export default Stepper
