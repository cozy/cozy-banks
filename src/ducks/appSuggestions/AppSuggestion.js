import { Document } from 'cozy-doctypes'
import { head } from 'lodash'
import { TRANSACTION_DOCTYPE } from 'doctypes'

class AppSuggestion extends Document {
  static fetchBySlug(slug) {
    return this.queryAll({ slug }).then(head)
  }

  static linkTransaction(suggestion, transaction) {
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
