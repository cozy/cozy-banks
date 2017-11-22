import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Hammer from 'hammerjs'
import { Backdrop } from 'components/Menu'

import Menu from './Menu'
import styles from './ActionMenu.styl'

class ActionMenu extends Component {
  componentDidMount () {
    this.gesturesHandler = new Hammer.Manager(this.fam, {
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]]
    })

    this.actionMenuNode = this.actionMenu.base.children[0]

    // to be completely accurate, `maximumGestureDelta` should be the difference between the top of the menu and the
    // bottom of the page; but using the height is much easier to compute and accurate enough.
    const maximumGestureDistance = this.actionMenuNode.getBoundingClientRect().height
    // between 0 and 1, how far down the gesture must be to be considered complete upon release
    const minimumCloseDistance = 0.6
    // a gesture faster than this will dismiss the menu, regardless of distance traveled
    const minimumCloseVelocity = 0.6

    let currentGestureProgress = null

    this.gesturesHandler.on('panstart', e => {
      // disable css transitions during the gesture
      this.actionMenuNode.classList.remove(styles['with-transition'])
      currentGestureProgress = 0
    })
    this.gesturesHandler.on('pan', e => {
      currentGestureProgress = e.deltaY / maximumGestureDistance
      this.applyTransformation(currentGestureProgress)
    })
    this.gesturesHandler.on('panend', e => {
      // re enable css transitions
      this.actionMenuNode.classList.add(styles['with-transition'])
      // dismiss the menu if the swipe pan was bigger than the treshold, or if it was a fast, downward gesture
      let shouldDismiss = e.deltaY / maximumGestureDistance >= minimumCloseDistance ||
                          (e.deltaY > 0 && e.velocity >= minimumCloseVelocity)

      if (shouldDismiss) {
        if (currentGestureProgress >= 1) {
          // the menu was already hidden, we can close it right away
          this.dismissHandler()
        } else {
          // we need to transition the menu to the bottom before dismissing it
          this.actionMenuNode.addEventListener('transitionend', this.dismissHandler, false)
          this.applyTransformation(1)
        }
      } else {
        this.applyTransformation(0)
      }
    })
  }

  componentWillUnmount () {
    this.gesturesHandler.destroy()
  }

  // applies a css trasnform to the element, based on the progress of the gesture
  applyTransformation (progress) {
    // wrap the progress between 0 and 1
    progress = Math.min(1, Math.max(0, progress))
    this.actionMenuNode.style.transform = 'translateY(' + (progress * 100) + '%)'
  }

  dismissHandler = () => {
    this.props.onClose()
    // remove the event handler so subsequent transitions don't trigger dismissals
    this.actionMenuNode.removeEventListener('transitionend', this.dismissHandler)
    this.applyTransformation(0)
  }

  render (props) {
    return (
      <div className={styles['fil-actionmenu-wrapper']} ref={fam => { this.fam = fam }}>
        <Backdrop {...props} />
        <Menu {...props} ref={actionMenu => { this.actionMenu = actionMenu }} />
      </div>
    )
  }
}

export default translate()(ActionMenu)
