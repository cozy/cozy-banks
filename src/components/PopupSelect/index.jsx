import React, { Component } from 'react'
import cx from 'classnames'
import { Modal } from 'cozy-ui/react'
import { Media, Bd, Img } from 'components/Media'

import styles from './styles.styl'

class PopupSelect extends Component {
  renderList = () => {
    const { list, onSelect } = this.props
    return (
      <div className={styles.content}>
        {list.map(item => {
          return (
            <Media
              className={cx(styles.row, `u-ph-1 u-pv-half${item.selected ? ' u-text-bold' : ''}`)}
              onClick={() => onSelect(item)}
            >
              {item.icon && <Img className='u-pr-1' style={{ height: '2rem' }}>
                {item.icon}
              </Img>}
              <Bd className='u-ellipsis'>
                {item.text}
              </Bd>
            </Media>
          )
        })}
      </div>
    )
  }

  render () {
    const { title, onCancel } = this.props
    return (
      <Modal
        title={title}
        description={this.renderList()}
        secondaryAction={onCancel}
      />
    )
  }
}

export default PopupSelect
