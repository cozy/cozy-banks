import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Icon } from 'cozy-ui/react'
import styles from './styles.styl'
import cx from 'classnames'

const SmallArrow = () => (
  <Icon
    className={styles.Select__icon}
    style={{ paddingLeft: '.5rem' }}
    icon="small-arrow"
    width={12}
    height={12}
  />
)

const Select = ({ name, value, options, onChange, className }) => (
  <span>
    <select
      className={cx(styles.Select, className)}
      name={name}
      onChange={e =>
        onChange(e.target.value, options.indexOf(e.target.value), name)
      }
    >
      {options.map(optionValue => (
        <option
          key={optionValue.value || optionValue}
          value={
            optionValue.value !== undefined ? optionValue.value : optionValue
          }
          selected={value === optionValue.value || value === optionValue}
        >
          {optionValue.name || optionValue}
        </option>
      ))}
    </select>
    <SmallArrow />
  </span>
)

export default translate()(props => <Select {...props} />)
