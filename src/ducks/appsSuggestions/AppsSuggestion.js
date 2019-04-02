import { Document } from 'cozy-doctypes'
import { head } from 'lodash'
import { TRANSACTION_DOCTYPE } from 'doctypes'

class AppsSuggestion extends Document {
  static fetchBySlug(slug) {
    return this.queryAll({ slug }).then(head)
  }

  static linkTransaction(suggestion, transaction) {
    return {
      ...suggestion,
      relationships: {
        ...suggestion.relationships,
        transactions: {
          data: [
            ...suggestion.relationships.transactions.data,
            { _id: transaction._id, _type: TRANSACTION_DOCTYPE }
          ]
        }
      }
    }
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

AppsSuggestion.doctype = 'io.cozy.apps.suggestions'
AppsSuggestion.idAttributes = ['slug']

export default AppsSuggestion
