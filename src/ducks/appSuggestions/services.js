import logger from 'cozy-logger'
import { findMatchingBrand, getNotInstalledBrands } from 'ducks/brandDictionary'
import { getLabel } from 'ducks/transactions/helpers'
import { getKonnectorFromTrigger } from 'utils/triggers'
import { BankTransaction } from 'cozy-doctypes'
import AppSuggestion from './AppSuggestion'
import Trigger from './Trigger'
import { groupBy, flatMap } from 'lodash'

const log = logger.namespace('app-suggestions')

export const findSuggestionForTransaction = async (transaction, brands) => {
  const matchingBrand = findMatchingBrand(brands, getLabel(transaction))

  if (!matchingBrand) {
    return null
  }

  let originalSuggestion = await AppSuggestion.fetchBySlug(
    matchingBrand.konnectorSlug
  )

  if (!originalSuggestion) {
    log(
      'info',
      `No existing suggestion for ${
        matchingBrand.konnectorSlug
      }. Creating a new one`
    )
    originalSuggestion = AppSuggestion.init(
      matchingBrand.konnectorSlug,
      'FOUND_TRANSACTION'
    )
  }

  const suggestion = AppSuggestion.linkTransaction(
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

export const findAppSuggestions = async setting => {
  log('info', 'Fetch transactions changes and triggers')
  const [transactionsToCheck, triggers] = await Promise.all([
    BankTransaction.fetchChanges(setting.appSuggestions.lastSeq),
    Trigger.fetchAll()
  ])

  setting.appSuggestions.lastSeq = transactionsToCheck.newLastSeq

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
  for (const suggestion of normalizedSuggestions) {
    await AppSuggestion.createOrUpdate(suggestion)
  }
}
