import React from 'react'
import Icon from 'cozy-ui/react/Icon'
import styles from './styles.styl'
import SelectBox, { SelectBoxWithFixedOptions } from 'cozy-ui/react/SelectBox'
import find from 'lodash/find'

const SmallArrow = () => (
  <Icon
    className={styles.Select__icon}
    style={{ paddingLeft: '.5rem' }}
    icon="small-arrow"
    width={12}
    height={12}
  />
)

const IndicatorSeparator = () => null

const mkControlStyle = props => base => {
  return {
    ...base,
    border: 0,
    background: 'transparent',
    width: props.width || '10rem',
    boxShadow: '',
    '&:focus': {
      border: 0,
      boxShadow: ''
    }
  }
}

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.Component = find(props.options, o => o.fixed)
      ? SelectBoxWithFixedOptions
      : SelectBox
    this.controlStyle = mkControlStyle(props)
  }

  render() {
    const { name, value, options, onChange } = this.props
    const Component = this.Component

    return (
      <Component
        value={
          value ? find(options, option => option.value == value) : options[0]
        }
        getOptionLabel={x => x.name}
        components={{
          DropdownIndicator: SmallArrow,
          IndicatorSeparator
        }}
        styles={{
          control: this.controlStyle
        }}
        name={name}
        onChange={option => {
          onChange(option.value, options.indexOf(option.value), name)
        }}
        options={options}
      />
    )
  }
}

export default Select
