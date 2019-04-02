import { cozyClient } from 'cozy-konnector-libs'
import logger from 'cozy-logger'
import { findMatchingBrand, getNotInstalledBrands } from 'ducks/brandDictionary'
import { getLabel } from 'ducks/transactions/helpers'
import { getKonnectorFromTrigger } from 'utils/triggers'
import { BankTransaction } from 'cozy-doctypes'
import AppsSuggestion from './AppsSuggestion'
import Trigger from './Trigger'
import { groupBy, flatMap } from 'lodash'

const log = logger.namespace('apps-suggestions')

AppsSuggestion.registerClient(cozyClient)
Trigger.registerClient(cozyClient)
BankTransaction.registerClient(cozyClient)

export const findSuggestionForTransaction = async (transaction, brands) => {
  const matchingBrand = findMatchingBrand(brands, getLabel(transaction))

  if (!matchingBrand) {
    return null
  }

  let originalSuggestion = await AppsSuggestion.fetchBySlug(
    matchingBrand.konnectorSlug
  )

  if (!originalSuggestion) {
    log(
      'info',
      `No existing suggestion for ${
        matchingBrand.konnectorSlug
      }. Creating a new one`
    )
    originalSuggestion = AppsSuggestion.init(
      matchingBrand.konnectorSlug,
      'FOUND_TRANSACTION'
    )
  }

  const suggestion = AppsSuggestion.linkTransaction(
    originalSuggestion,
    transaction
  )

  return suggestion
}

export const normalizeSuggestions = suggestions => {
  const filteredSuggestions = suggestions.filter(Boolean)

  const normalizedSuggestions = Object.values(
    groupBy(filteredSuggestions, s => s.slug)
  ).map(mergeSuggestions)

  return normalizedSuggestions
}

const mergeSuggestions = suggestions => {
  const allTransactions = flatMap(
    suggestions,
    s => s.relationships.transactions.data
  )

  return {
    ...suggestions[0],
    relationships: {
      transactions: {
        data: allTransactions
      }
    }
  }
}

export const findAppsSuggestions = async setting => {
  log('info', 'Fetch transactions changes and triggers')
  const [transactionsToCheck, triggers] = await Promise.all([
    BankTransaction.fetchChanges(setting.appsSuggestions.lastSeq),
    Trigger.fetchAll()
  ])

  setting.appsSuggestions.lastSeq = transactionsToCheck.newLastSeq

  log('info', 'Get not installed brands')
  const installedSlugs = triggers.map(getKonnectorFromTrigger)
  const brands = getNotInstalledBrands(installedSlugs)

  log('info', 'Find suggestions')
  const suggestions = await Promise.all(
    transactionsToCheck.documents.map(t =>
      findSuggestionForTransaction(t, brands)
    )
  )
  const normalizedSuggestions = normalizeSuggestions(suggestions)

  log('info', 'Save suggestions')
  return AppsSuggestion.bulkSave(normalizedSuggestions)
}
