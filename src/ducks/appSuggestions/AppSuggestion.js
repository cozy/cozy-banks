import { Document } from 'cozy-doctypes'
import { head } from 'lodash'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import get from 'lodash/get'
import setWith from 'lodash/setWith'
import clone from 'lodash/clone'

const setIn = (obj, path, value) => {
  return setWith(clone(obj), path, value, clone)
}

const pushAtPath = (obj, path, value) => {
  const arr = get(obj, path, [])
  arr.push(value)
  return setIn(obj, path, arr)
}

class AppSuggestion extends Document {
  static fetchBySlug(slug) {
    return this.queryAll({ slug }).then(head)
  }

  static linkTransaction(suggestion, transaction) {
    const transactionRelationship = { _id: transaction._id, _type: TRANSACTION_DOCTYPE }
    return pushAtPath(suggestion, 'relationships.transactions.data', transactionRelationship)
  }

  static init(slug, reasonCode) {
    return {
      slug,
      silenced: false,
      reason: {
        code: reasonCode
      },
      relationships: {
        transactions: {
          data: []
        }
      }
    }
  }
}

AppSuggestion.doctype = 'io.cozy.apps.suggestions'
AppSuggestion.idAttributes = ['slug']
AppSuggestion.createdByApp = 'banks'

export default AppSuggestion
