import React, { useState } from 'react'
import { translate, Media, Bd, Img, Icon } from 'cozy-ui/react'
import SettingCard from 'components/SettingCard'
import EditionModal, { CHOOSING_TYPES } from 'components/EditionModal'
import { ToggleRowTitle, ToggleRowWrapper } from './ToggleRow'

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
            <Img>
              <Icon color="var(--coolGrey)" icon="pen" />
            </Img>
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
