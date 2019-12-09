import React, { useState } from 'react'
import { translate, Media, Bd, Img, Icon } from 'cozy-ui/react'
import SettingCard from 'components/SettingCard'
import EditionModal, { CHOOSING_TYPES } from 'components/EditionModal'
import { ToggleRowTitle, ToggleRowWrapper } from './ToggleRow'
import Switch from 'components/Switch'

const fieldSpecs = {
  value: {
    type: CHOOSING_TYPES.threshold,
    getValue: notification => notification.value,
    updater: (notification, value) => ({ ...notification, value })
  }
}

const AlertEditModal = translate()(
  ({ t, onDismiss, initialAlert, onEditAlert, modalTitle }) => {
    return (
      <EditionModal
        initialDoc={initialAlert}
        onEdit={onEditAlert}
        fieldSpecs={fieldSpecs}
        fieldOrder={['value']}
        fieldLabels={{
          value: t('Settings.budget-category-alerts.edit.threshold-label')
        }}
        onDismiss={onDismiss}
        okButtonLabel={() => 'OK'}
        cancelButtonLabel={() => 'Cancel'}
        modalTitle={modalTitle}
      />
    )
  }
)

// Since the toggle has a large height, we need to compensate negatively
// so that the height of the switch does not impact the height of the card
const toggleStyle = { margin: '-8px 0' }

const HighlightedValue = ({ children }) => <b>{children}</b>

const EditableSettingCard = props => {
  const {
    enabled,
    value,
    title,
    description,
    onChangeValue,
    name,
    onToggle,
    unit
  } = props

  const hasValue = value !== undefined
  const [editing, setEditing] = useState(false)

  return (
    <>
      <ToggleRowWrapper>
        {title && <ToggleRowTitle>{title}</ToggleRowTitle>}
        <SettingCard dashed={!enabled} onClick={() => setEditing(true)}>
          <Media className="u-row-xs" align="top">
            <Bd>
              <span dangerouslySetInnerHTML={{ __html: description }} />{' '}
              {hasValue && (
                <HighlightedValue>
                  {value} {unit}
                </HighlightedValue>
              )}
            </Bd>
            {onToggle ? (
              <Img style={toggleStyle}>
                <Switch
                  disableRipple
                  className="u-mh-s"
                  checked={enabled}
                  color="primary"
                  onClick={e => e.stopPropagation()}
                  onChange={e => onToggle(!enabled)}
                />
              </Img>
            ) : null}
          </Media>
        </SettingCard>
      </ToggleRowWrapper>
      {editing ? (
        <AlertEditModal
          initialAlert={{ value }}
          onEditAlert={alert => {
            onChangeValue(alert.value)
            setEditing(false)
          }}
          onDismiss={() => {
            setEditing(false)
          }}
          modalTitle={title}
        />
      ) : null}
    </>
  )
}

export default EditableSettingCard
