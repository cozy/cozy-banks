import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './style.styl'
import arrowLeftIcon from 'assets/icons/icon-arrow-left.svg'
import palette from 'cozy-ui/react/palette'
import { Icon } from 'cozy-ui/react'

const BreadcrumbSeparator = () => (
  <span className={styles.BreadcrumbSeparator}>/</span>
)

const BreadcrumbItem = ({
  name,
  onClick,
  isCurrent = false,
  tag = 'span',
  showSeparator = false
}) => {
  const Tag = tag
  return (
    <div
      className={cx(styles.BreadcrumbItem, {
        [styles['BreadcrumbItem--current']]: isCurrent
      })}
    >
      <Tag
        onClick={onClick}
        className={cx({
          'u-clickable': onClick
        })}
      >
        {name}
      </Tag>
      {showSeparator && <BreadcrumbSeparator />}
    </div>
  )
}

const itemPropTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tag: PropTypes.element
}

BreadcrumbItem.propTypes = {
  ...itemPropTypes,
  isCurrent: PropTypes.bool,
  showSeparator: PropTypes.bool
}

export const Breadcrumb = ({ items, className }) => {
  const previousItems = items.slice(0, -1)
  const [lastPreviousItem] = previousItems.slice(-1)
  const [currentItem] = items.slice(-1)

  return (
    <div className={cx(styles.Breadcrumb, className)}>
      {items.length > 1 && (
        <Icon
          icon={arrowLeftIcon}
          color={palette.coolGrey}
          className={styles.Breadcrumb__previousButton}
          onClick={lastPreviousItem.onClick}
        />
      )}
      <div className={styles.Breadcrumb__items}>
        <div className={styles.Breadcrumb__previousItems}>
          {previousItems.map(({ name, onClick, tag }, index) => (
            <BreadcrumbItem
              key={name}
              name={name}
              onClick={onClick}
              tag={tag}
              showSeparator={index < previousItems.length - 1}
            />
          ))}
        </div>
        <BreadcrumbItem
          name={currentItem.name}
          tag={currentItem.tag}
          isCurrent
        />
      </div>
    </div>
  )
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(itemPropTypes))
}

export default Breadcrumb
