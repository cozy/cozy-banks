import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, Button, translate } from 'cozy-ui/react'
import useList from './useList'

export const AddRuleButton = ({ label, busy, onClick }) => (
  <Button
    className="u-ml-0"
    theme="subtle"
    icon="plus"
    label={label}
    busy={busy}
    onClick={onClick}
  />
)

const Rules = ({
  rules,
  children,
  onUpdate,
  onError,
  getId,
  getNextId,
  addButtonLabelKey,
  ItemEditionModal,
  makeNewItem,
  t
}) => {
  const [items, createOrUpdate, remove] = useList({
    list: rules,
    onUpdate,
    onError,
    getId,
    getNextId
  })
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const handleCreateItem = async newItem => {
    setCreating(false)
    try {
      setSaving(true)
      await createOrUpdate(newItem)
    } finally {
      setSaving(false)
    }
  }
  return (
    <Stack spacing="s">
      {items
        ? items.map((item, i) => children(item, i, createOrUpdate, remove))
        : null}

      <AddRuleButton
        label={t(addButtonLabelKey)}
        busy={saving}
        onClick={() => {
          setCreating(true)
        }}
      />
      {creating ? (
        <ItemEditionModal
          onDismiss={() => setCreating(false)}
          initialDoc={makeNewItem()}
          onEdit={handleCreateItem}
        />
      ) : null}
    </Stack>
  )
}

Rules.propTypes = {
  rules: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  getId: PropTypes.func.isRequired,
  getNextId: PropTypes.func.isRequired,
  addButtonLabelKey: PropTypes.string.isRequired,
  makeNewItem: PropTypes.func.isRequired,
  ItemEditionModal: PropTypes.object.isRequired
}

export default translate()(Rules)
