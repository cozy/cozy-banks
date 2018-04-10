import React from 'react'
import cx from 'classnames'
import styles from './style.styl'

const DEFAULT_SEPARATOR = '/'
const DEFAULT_LAST_SEPARATOR = false
const DEFAULT_TAG = 'span'

const BreadcrumbSeparator = ({ separator }) => (
  <span className={styles.Breadcrumb__separator}>{separator}</span>
)

const BreadcrumbItem = ({ item }) => {
  const Tag = item.tag
  return (
    <div
      onClick={item.onClick}
      className={cx(
        styles.Breadcrumb__crumb,
        item.isLast && styles.Breadcrumb__last,
        { [styles.Breadcrumb__link]: item.onClick }
      )}
    >
      <Tag className={styles.Breadcrumb__title}>
        {item.name}
        {item.displaySeparator && (
          <BreadcrumbSeparator separator={item.separator} />
        )}
      </Tag>
    </div>
  )
}

/**
 * Display a Breadcrumb
 * - On browser like this: This > is > path
 * - On mobile: path
 *
 * ```jsx
 * <Breadcrumb
 *   tag='h2'
 *   separator='>'
 *   onClick={() => console.log('back button' )}
 *   items={[{name: 'this'},{name: 'is'}, {name: 'path'}]} />
 * ```
 *
 * All parameter for item:
 * - name: string
 * - displaySeparator: boolean
 * - separator: string
 * - tag: string
 * - onClick: function
 */
export const Breadcrumb = ({
  items,
  withLastSeparator = DEFAULT_LAST_SEPARATOR,
  separator = DEFAULT_SEPARATOR,
  tag = DEFAULT_TAG
}) => {
  let previousOnClick
  return (
    <div className={styles.Breadcrumb}>
      {items.map((item, idx) => {
        const isLastItem = idx === items.length - 1
        item.isLast = isLastItem

        if (item.displaySeparator === undefined)
          item.displaySeparator = withLastSeparator || !isLastItem
        if (item.separator === undefined) item.separator = separator
        if (item.tag === undefined) item.tag = tag
        if (previousOnClick) item.previousOnClick = previousOnClick
        if (item.onClick) previousOnClick = item.onClick

        return <BreadcrumbItem key={item.name} item={item} />
      })}
    </div>
  )
}

export default Breadcrumb
