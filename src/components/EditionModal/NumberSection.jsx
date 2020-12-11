import React from 'react'
import { DialogContent } from 'cozy-ui/transpiled/react/Dialog'
import { InputGroup, Input, useI18n } from 'cozy-ui/transpiled/react'
import { ModalSection } from 'components/ModalSections'

const NumberSection = ({ label, value, onChange, unit, unitKey }) => {
  const { t } = useI18n()
  const handleChange = ev => {
    onChange(parseInt(ev.target.value, 10))
  }
  return (
    <ModalSection label={label}>
      <DialogContent className="u-pv-0">
        <InputGroup
          append={
            unit || unitKey ? (
              <InputGroup.Unit>{unit || t(unitKey)}</InputGroup.Unit>
            ) : (
              undefined
            )
          }
        >
          <Input type="text" onChange={handleChange} defaultValue={value} />
        </InputGroup>
      </DialogContent>
    </ModalSection>
  )
}

export default NumberSection
