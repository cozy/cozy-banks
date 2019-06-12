import React from 'react'
import { Button } from 'cozy-ui/react'

import Bottom from 'components/Bottom'
import Padded from 'components/Spacing/Padded'

/** Button displayed at the bottom of the view on mobile, appears from the bottom */
const BottomButton = ({ visible, ...buttonProps }) => (
  <Bottom
    style={{
      pointerEvents: visible ? '' : 'none'
    }}
  >
    <Padded>
      <Button
        extension="full"
        theme="primary"
        style={{
          transition: 'transform 0.5s ease',
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 100}px)`
        }}
        {...buttonProps}
      />
    </Padded>
  </Bottom>
)

BottomButton.defaultProps = {
  visible: true
}

export default BottomButton
