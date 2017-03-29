import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import Field from './Field'

const Select = ({ t, name, value, options, onChange }) => (
  <select
    name={name}
    onBlur={e => onChange(name, e.target.value)}
    >
    {options.map(optionValue => (
      <option
        value={optionValue}
        selected={value === optionValue}
      >
        {optionValue}
      </option>
    ))}
  </select>
)

export default translate()(props => (
  <Field {...props}>
    <Select {...props} />
  </Field>
))
