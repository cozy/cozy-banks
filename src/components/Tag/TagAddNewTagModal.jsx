import React, { useState, useReducer } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Buttons'

import { TAGS_DOCTYPE } from 'doctypes'
import useDocument from 'components/useDocument'
import { addTag, getCountOfTagsByTransaction } from 'ducks/transactions/helpers'
import { useEffect } from 'react'

const TagAddNewTagModal = ({ transaction, selectedTagIds, onClose }) => {
  const client = useClient()
  const { t } = useI18n()
  const [label, setLabel] = useState('')
  const [tagSaved, setTagSaved] = useState(null)
  const [isBusy, toggleBusy] = useReducer(prev => !prev, false)

  const tagFromDoc = useDocument(TAGS_DOCTYPE, tagSaved?._id || ' ')

  const handleChange = ev => {
    setLabel(ev.target.value)
  }

  const handleClick = async () => {
    toggleBusy()

    const { data: tag } = await client.save({
      _type: TAGS_DOCTYPE,
      label
    })

    if (
      getCountOfTagsByTransaction(transaction) < 5 &&
      selectedTagIds.length < 5
    ) {
      setTagSaved(tag)
    } else onClose()
  }

  useEffect(() => {
    if (tagSaved) {
      addTag(transaction, tagFromDoc)
      setTagSaved(null)
      onClose()
    }
  }, [transaction, tagFromDoc, tagSaved, onClose])

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      title={t('Tag.add-new-tag')}
      content={
        <>
          <TextField
            fullWidth
            margin="normal"
            label={t('Tag.tag-name')}
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            autoFocus
            onChange={handleChange}
          ></TextField>
        </>
      }
      actions={
        <>
          <Button
            fullWidth
            variant="secondary"
            label={t('Confirmation.cancel')}
            onClick={onClose}
          />
          <Button
            fullWidth
            label={t('Confirmation.ok')}
            busy={isBusy}
            disabled={label.length === 0}
            onClick={handleClick}
          />
        </>
      }
    />
  )
}

export default TagAddNewTagModal
