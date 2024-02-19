import { useClient } from 'cozy-client'
import React, { useCallback, useRef, useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import CrossCircleOutlineIcon from 'cozy-ui/transpiled/react/Icons/CrossCircleOutline'
import RestoreIcon from 'cozy-ui/transpiled/react/Icons/Restore'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import { CircularProgress } from 'cozy-ui/transpiled/react/Progress'
import TextField from 'cozy-ui/transpiled/react/TextField'
import Typography from 'cozy-ui/transpiled/react/Typography'
import {
  getLabel,
  hasEditedLabel,
  setTransactionLabel
} from 'ducks/transactions/helpers'

import styles from 'ducks/transactions/TransactionRow/LabelField.styl'

export default function LabelField({ transaction, variant = 'body1' }) {
  const client = useClient()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef()
  const containerRef = useRef()

  const saveAndClose = useCallback(
    async label => {
      if (
        label !== transaction.manualLabel &&
        label !== getLabel(transaction, true)
      ) {
        const sanitized = label?.trim()
        try {
          setIsSaving(true)
          await client.save(
            setTransactionLabel(
              transaction,
              sanitized?.length ? sanitized : null
            )
          )
        } finally {
          setIsSaving(false)
        }
      }
      setIsEditing(false)
    },
    [client, setIsEditing, setIsSaving, transaction]
  )

  const handleEdit = useCallback(
    event => {
      event.stopPropagation()
      setIsEditing(true)
    },
    [setIsEditing]
  )

  const handleClose = useCallback(
    () => saveAndClose(inputRef.current.value),
    [saveAndClose]
  )

  const handleRestore = useCallback(() => {
    saveAndClose(null)
  }, [saveAndClose])

  const handleKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') {
        handleClose()
      } else if (key === 'Escape') {
        setIsEditing(false)
      }
    },
    [handleClose, setIsEditing]
  )

  const handleBlur = useCallback(
    ({ relatedTarget }) => {
      if (containerRef.current?.contains(relatedTarget)) {
        // do not close when focused element is inside the component
        return
      }
      saveAndClose(inputRef.current.value)
    },
    [saveAndClose]
  )

  return isEditing ? (
    <div
      onBlur={handleBlur}
      ref={containerRef}
      onClick={e => e.stopPropagation()}
    >
      <TextField
        autoFocus
        fullWidth
        defaultValue={getLabel(transaction)}
        className={styles.EditableLabel}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        variant="outlined"
        InputProps={{
          endAdornment: isSaving ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <IconButton size="small" onClick={handleClose}>
                <Icon icon={CrossCircleOutlineIcon} size={14} />
              </IconButton>
              {hasEditedLabel(transaction) ? (
                <IconButton size="small" onClick={handleRestore}>
                  <Icon icon={RestoreIcon} size={14} />
                </IconButton>
              ) : null}
            </>
          )
        }}
      />
    </div>
  ) : (
    <div className={styles.FixedLabel}>
      <Typography variant={variant}>{getLabel(transaction)}</Typography>
      <IconButton size="small" onClick={handleEdit}>
        <Icon icon={PenIcon} color="var(--coolGrey)" size={14} />
      </IconButton>
    </div>
  )
}
