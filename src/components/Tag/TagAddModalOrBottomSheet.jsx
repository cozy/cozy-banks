import React, { useState, useEffect } from 'react'

import { useQueryAll, isQueryLoading, useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { tagsConn } from 'doctypes'
import TagAddModal from 'components/Tag/TagAddModal'
import TagBottomSheet from 'components/Tag/TagBottomSheet'
import TagAddNewTagModal from 'components/Tag/TagAddNewTagModal'
import {
  getTagsRelationshipByTransaction,
  getTransactionTagsIds,
  updateTagRelationshipFromTransaction
} from 'ducks/transactions/helpers'
import { makeTagsToRemove, makeTagsToAdd } from 'components/Tag/helpers'
import { trackPage, useTrackPage } from 'ducks/tracking/browser'

const getTagsRelationshipUnionByTransactions = transactions => {
  const tags = new Map()
  transactions.forEach(transaction => {
    getTagsRelationshipByTransaction(transaction)?.forEach(tag => {
      tags.set(tag._id, tag)
    })
  })
  return [...tags.values()]
}

const getTagsRelationshipIntersectionByTransactions = transactions => {
  const tags = new Map()
  if (transactions.length > 0) {
    getTagsRelationshipByTransaction(transactions[0])?.forEach(tag => {
      tags.set(tag._id, tag)
    })
    transactions.slice(1).forEach(transaction => {
      getTagsRelationshipByTransaction(transaction)?.forEach(tag => {
        tags.delete(tag._id)
      })
    })
  }
  return [...tags.values()]
}

const getAllTransactionsTagsIds = transactions => {
  const tagIds = new Set()
  transactions.forEach(transaction => {
    getTransactionTagsIds(transaction)?.forEach(tagId => {
      tagIds.add(tagId)
    })
  })
  return [...tagIds]
}

const updateTagRelationshipFromAllTransactions = async ({
  client,
  transactions,
  tagsToRemove,
  tagsToAdd
}) => {
  for (const transaction of transactions) {
    await updateTagRelationshipFromTransaction({
      client,
      transaction,
      tagsToRemove,
      tagsToAdd
    })
  }
}

const TagAddModalOrBottomSheet = ({ transactions, onClose }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const client = useClient()
  const [showAddNewTagModal, setShowAddNewTagModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedTagIds, setSelectedTagIds] = useState(() =>
    getAllTransactionsTagsIds(transactions)
  )
  // TODO: currrently this is initialized with the union of tags already present on transactions. Is this the right thing to do? Should it be the intersection instead? No tags?

  useTrackPage('mon_compte:depense:ajout-label-saisie')

  const toggleAddNewTagModal = () => setShowAddNewTagModal(prev => !prev)

  const { data: tags, ...tagsQueryRest } = useQueryAll(tagsConn.query, tagsConn)
  const isLoading = isQueryLoading(tagsQueryRest) || tagsQueryRest.hasMore

  useEffect(() => {
    setSelectedTagIds(getAllTransactionsTagsIds(transactions))
  }, [transactions])
  // TODO: currrently this is updated with the union of tags already present on transactions. Is this the right thing to do? Should it be the intersection instead? No tags? Should this side effect be removed?

  const handleClick = tag => {
    if (selectedTagIds.some(tagId => tagId === tag._id)) {
      setSelectedTagIds(prev => prev.filter(id => id !== tag._id))
    } else if (selectedTagIds.length < 5) {
      setSelectedTagIds(prev => [...prev, tag._id])
    }
    // TODO: what to do with this limit when selecting multiple transactions? Enforce it on all the selected transactions? Enforce it on each selected transaction? Remove it?
    // If one transaction has tags A, B, C, D and E and another one has tag F, when unselecting any of the tags, it becomes disabled and it can't be selected back.
  }

  const handleConfirm = async () => {
    trackPage('mon_compte:depense:ajout-label-confirmation')
    setIsSaving(true)

    const tagUnion = getTagsRelationshipUnionByTransactions(transactions)
    const tagIntersection =
      getTagsRelationshipIntersectionByTransactions(transactions)

    const tagsToRemove = makeTagsToRemove({
      transactionTags: tagUnion,
      selectedTagIds,
      allTags: tags
    })
    // TODO: currently this plans to remove all the unselected tags that were present on at least one selected transaction. Is this the right thing to do? Should selecting only one transaction have a consistent behavior?

    const tagsToAdd = makeTagsToAdd({
      transactionTags: tagIntersection,
      selectedTagIds,
      allTags: tags
    })
    // TODO: currently this plans to add all the selected tags that were present on all the selected transactions. Is this the right thing to do? Should selecting only one transaction have a consistent behavior?

    await updateTagRelationshipFromAllTransactions({
      client,
      transactions,
      tagsToRemove,
      tagsToAdd
    })
    // FIXME: currently this results in an error when selecting multiple transactions. How to handle updating multiple transactions and tags at the same time?

    onClose()
  }

  const ModalOrBottomSheet = isMobile ? TagBottomSheet : TagAddModal

  return (
    <>
      <ModalOrBottomSheet
        tags={tags}
        title={t('Tag.add-tag')}
        selectedTagIds={selectedTagIds}
        isSaving={isSaving}
        isLoading={isLoading}
        toggleAddNewTagModal={toggleAddNewTagModal}
        onClick={handleClick}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
      {showAddNewTagModal && (
        <TagAddNewTagModal
          onClose={toggleAddNewTagModal}
          onClick={handleClick}
        />
      )}
    </>
  )
}

export default TagAddModalOrBottomSheet
