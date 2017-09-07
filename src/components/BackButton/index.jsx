import React from 'react'
import { TopbarLeft } from 'ducks/commons/Topbar'
import styles from './style.styl'
import withBackSwipe from 'utils/backSwipe'
import { onlyMobile } from 'utils/mobileAware'
import { flowRight as compose } from 'lodash'

// props.router is provided by withRouter in withBackSwipe
const BackButton = ({ to, router }) => (
  <TopbarLeft className={styles['back-button']}>
    <a onClick={() => router.push(to)} />
  </TopbarLeft>
)

export default compose(
  onlyMobile,
  withBackSwipe({ getLocation: ownProps => ownProps.to })
)(BackButton)
