import fromPairs from 'lodash/fromPairs'
import { QueryDefinition, HasManyInPlace } from 'cozy-client'

export class HasManyBills extends HasManyInPlace {
  get data() {
    return this.raw
      ? this.raw.map(doctypeId => {
          const [doctype, id] = doctypeId.split(':')
          return this.get(doctype, id)
        })
      : []
  }

  /**
   * Query is redefined since the ids are prepended with their doctype.
   * Also does not refetch if documents have already been fetched once.
   */
  static query(doc, client, assoc) {
    const included = doc[assoc.name]
    if (!included || !included.length) {
      return null
    }

    const ids = included.indexOf(':')
      ? included.map(x => x.split(':')[1])
      : included

    const docs = fromPairs(
      ids.map(id => {
        return [id, client.getDocumentFromState(assoc.doctype, id)]
      })
    )

    const missingIds = Object.keys(docs).filter(id => !docs[id])
    if (!missingIds || !missingIds.length) {
      return Object.values(docs)
    } else {
      return new QueryDefinition({ doctype: assoc.doctype, ids: missingIds })
    }
  }
}

export class HasManyReimbursements extends HasManyInPlace {
  get raw() {
    return this.target[this.name]
  }

  get data() {
    return (this.raw || []).map(reimbursement => {
      if (!reimbursement.billId) {
        return reimbursement
      }
      return {
        ...reimbursement,
        bill: this.get('io.cozy.bills', reimbursement.billId.split(':')[1])
      }
    })
  }

  static query(doc, client, assoc) {
    const included = doc[assoc.name]
    if (!included || !included.length) {
      return null
    }
    const missingIds = included
      .map(doc => doc.billId && doc.billId.split(':')[1])
      .filter(Boolean)

    return new QueryDefinition({ doctype: assoc.doctype, ids: missingIds })
  }
}
