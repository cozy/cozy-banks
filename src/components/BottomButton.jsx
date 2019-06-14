import React from 'react'
import { Button } from 'cozy-ui/react'

import Bottom from 'components/Bottom'
import Padded from 'components/Spacing/Padded'

const buttonStyle = {
  transition: 'transform 0.5s ease'
}

const styles = {
  invisibleWrapper: {
    pointerEvents: 'none'
  },
  visibleButton: {
    ...buttonStyle,
    opacity: 1,
    transform: `translateY(0px)`
  },
  invisibleButton: {
    ...buttonStyle,
    opacity: 0,
    transform: `translateY(100px)`
  }
}

/** Button displayed at the bottom of the view on mobile, appears from the bottom */
const _BottomButton = ({ visible, ...buttonProps }) => (
  <Bottom style={!visible ? styles.invisibleWrapper : null}>
    <Padded>
      <Button
        extension="full"
        theme="primary"
        style={visible ? styles.visibleButton : styles.invisibleButton}
        {...buttonProps}
      />
    </Padded>
  </Bottom>
)

const BottomButton = React.memo(_BottomButton)

BottomButton.defaultProps = {
  visible: true
}

export default BottomButton
