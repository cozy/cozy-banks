import startCase from 'lodash/startCase'

export const prettyLabel = label => {
  return startCase(label.toLowerCase())
}
