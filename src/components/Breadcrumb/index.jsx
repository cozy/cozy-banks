import React from 'react'
import BackButton from 'components/BackButton'
import styles from './style.styl'

const DEFAULT_SEPARATOR = '/'
const DEFAULT_LAST_SEPARATOR = false
const DEFAULT_TAG = 'span'

const BreadcrumbSeparator = ({separator}) => (
  <span className={styles.separator}>{separator}</span>
)

const BreadcrumbItem = ({item}) => {
  const Tag = item.tag
  console.log('previewOnClick', item.previewOnClick)
  return (
    <span className={item.isLast ? styles.last : styles.notLast}>
      {item.previewOnClick && item.isLast && <BackButton onClick={item.previewOnClick} />}
      <Tag className={styles.title}>
        {item.name}
        {item.displaySeparator && <BreadcrumbSeparator separator={item.separator} />}
      </Tag>
    </span>
  )
}

const BreadcrumbLink = ({item}) => {
  return (
    <span onClick={item.onClick} className={styles.link}>
      <BreadcrumbItem item={item} />
    </span>
  )
}

/*
items = {
  name,
  onClick,
  displaySeparator,
  separator,
  isLast,

}
*/
export const Breadcrumb = ({items, withLastSeparator = DEFAULT_LAST_SEPARATOR, separator = DEFAULT_SEPARATOR, tag = DEFAULT_TAG}) => {
  let previewOnClick = ''
  return (
    <div className={styles.Breadcrumb}>{
      items.map((item, idx) => {
        const isLastItem = idx === items.length - 1
        item.isLast = isLastItem

        if (item.displaySeparator === undefined) item.displaySeparator = withLastSeparator || !isLastItem
        if (item.separator === undefined) item.separator = separator
        if (item.tag === undefined) item.tag = tag
        if (previewOnClick) item.previewOnClick = previewOnClick
        if (item.onClick) previewOnClick = item.onClick

        return item.onClick ? <BreadcrumbLink item={item} /> : <BreadcrumbItem item={item} />
      })
    }</div>
  )
}

export default Breadcrumb
