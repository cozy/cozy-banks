import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './styles.styl'
import { Icon, SubTitle } from 'cozy-ui/react'

export const Infos = ({ icon, children, className, title, variant }) => {
  return (
    <div
      className={cx(
        styles['infos'],
        'u-p-1',
        styles[`infos--${variant}`],
        className
      )}
    >
      <div className={styles['infos--container']}>
        {icon && <Icon icon={icon} className={styles['infos--icon']} />}
        <div
          className={cx(styles['infos--content'], {
            ['u-pl-half']: icon !== null
          })}
        >
          {title && (
            <SubTitle className={styles['infos--title']}>{title}</SubTitle>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

Infos.defaultProps = {
  icon: null,
  variant: 'normal'
}

Infos.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.node,
  variant: PropTypes.oneOf(['normal', 'error'])
}
export default React.memo(Infos)
