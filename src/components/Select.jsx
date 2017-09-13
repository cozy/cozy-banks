import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Field from 'components/Field'

const Select = ({ t, name, value, options, onChange }) => (
  <select
    name={name}
    onChange={e => onChange(name, e.target.value, options.indexOf(e.target.value))}
  >
    {options.map(optionValue => (
      <option
        value={optionValue.value !== undefined ? optionValue.value : optionValue}
        selected={value === optionValue.value || value === optionValue}
      >
        {optionValue.name || optionValue}
      </option>
    ))}
  </select>
)

export default translate()(props => (
  <Field {...props}>
    <Select {...props} />
  </Field>
))
