import { cozyClient, log } from 'cozy-konnector-libs'
import { createClassifier, categorize, tokenizer } from 'ducks/categorization'
import fs from 'fs'
import path from 'path'
import maxBy from 'lodash/maxBy'

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})

const getParameters = () => {
  return cozyClient.fetchJSON(
    'GET',
    '/remote/assets/bank_classifier_nb_and_voc'
  )
}

log('info', 'Retrieving parameters from the stack')

getParameters()
  .then(parameters => {
    log('info', 'Got parameters from the stack')
    log('info', 'Instanciating a classifier with the parameters')

    const options = { tokenizer }
    const classifier = createClassifier(parameters, options)

    log('info', maxBy(classifier.categorize('dab société générale').likelihoods, 'proba'))
  })
  .catch(err => log('info', err))
