import { cozyClient } from 'cozy-konnector-libs'
const abs = number => number < 0 ? -number : number

class OperationGreater {
  constructor (config) {
    this.t = config.t
    this.enabled = config.enabled
    this.maxAmount = config.value
  }

  isEnabled () {
    return this.enabled
  }

  filter (operations) {
    const maxAmount = abs(this.maxAmount)
    return operations.filter(op => abs(op.amount) > maxAmount)
  }

  async sendNotification (accounts, operations) {
    const operationsFiltered = this.filter(operations)
    if (operationsFiltered.length === 0) return

    const notification = { reference: 'operation_greater' }
    let translateKey = 'Notifications.if_operation_greater.notification.'
    if (operationsFiltered.length === 1) {
      const operation = operationsFiltered[0]
      translateKey += operation.amount > 0 ? 'credit' : 'debit'
      notification.title = this.t(`${translateKey}.title`, { amount: operation.amount, currency: operation.currency })
      notification.content = this.t(`${translateKey}.content`, { label: operation.label })
    } else {
      translateKey += 'others'
      notification.title = this.t(`${translateKey}.title`, {
        operationsLength: operationsFiltered.length,
        maxAmount: this.maxAmount
      })
      notification.content = ''
      for (const operationFiltered of operationsFiltered) {
        const key = operationFiltered.amount > 0 ? 'credit' : 'debit'
        notification.content += this.t(`${translateKey}.${key}Content`, {
          amount: operationFiltered.amount, currency: operationFiltered.currency, label: operationFiltered.label
        }) + '\n'
      }
    }
    return await cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes: notification
      }
    })
  }
}

export default OperationGreater
