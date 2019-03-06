import React from 'react'
import Icon from 'cozy-ui/react/Icon'
import SelectBox, { SelectBoxWithFixedOptions } from 'cozy-ui/react/SelectBox'
import styles from './styles.styl'
import { find } from 'lodash'
import palette from 'cozy-ui/react/palette'
import { mergeStyles } from './styleUtils'

const smallArrowStyle = { paddingLeft: '0.25rem' }
const IndicatorSeparator = () => null
const SmallArrow = () => (
  <Icon
    className={styles.Select__Icon}
    style={smallArrowStyle}
    icon="small-arrow"
    width={12}
    height={12}
  />
)
const componentsOptions = {
  DropdownIndicator: SmallArrow,
  IndicatorSeparator
}

const mkControlStyle = props => base => {
  return {
    ...base,
    border: 0,
    background: 'transparent',
    width: props.width || '10rem',
    boxShadow: 'none',
    '&:focus': {
      border: 0,
      boxShadow: 'none'
    },
    flexGrow: 1
  }
}

const singleValueStyle = base => ({ ...base, color: palette.slateGrey })
const valueContainerStyle = base => ({ ...base, paddingLeft: 0 })
const menuStyle = base => ({ ...base, minWidth: '9.375rem' })

const optionIsFixed = option => option.fixed

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.updateComponent(props)
    this.updateControlStyle(props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.updateComponent(nextProps)
    }
    if (this.props.width !== nextProps.width) {
      this.updateControlStyle(nextProps)
    }
  }

  updateControlStyle(props) {
    this.controlStyle = mkControlStyle(props)
  }

  updateComponent(props) {
    this.Component = find(props.options, optionIsFixed)
      ? SelectBoxWithFixedOptions
      : SelectBox
  }

  render() {
    const {
      name,
      value,
      options,
      onChange,
      styles = {},
      placeholder
    } = this.props
    const Component = this.Component

    return (
      <Component
        value={
          value ? find(options, option => option.value == value) : options[0]
        }
        isSearchable={false}
        getOptionLabel={x => x.name}
        components={componentsOptions}
        classNamePrefix="needsclick cz"
        styles={mergeStyles(
          {
            singleValue: singleValueStyle,
            control: this.controlStyle,
            valueContainer: valueContainerStyle,
            menu: menuStyle
          },
          styles
        )}
        name={name}
        placeholder={placeholder}
        onChange={option => {
          onChange(option.value, options.indexOf(option.value), name)
        }}
        options={options}
      />
    )
  }
}

export default Select
