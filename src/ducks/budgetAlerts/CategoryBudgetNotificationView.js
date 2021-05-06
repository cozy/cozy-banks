import sumBy from 'lodash/sumBy'
import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import sortBy from 'lodash/sortBy'
import formatDate from 'date-fns/format'

import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import NotificationView from 'ducks/notifications/BaseNotificationView'
import { getCurrentDate } from 'ducks/notifications/utils'
import { getCategoryName } from 'ducks/categories/categoriesMap'
import { getGroupLabel } from 'ducks/groups/helpers'
import { getAccountLabel } from 'ducks/account/helpers'

import template from './template.hbs'
import { fetchCategoryAlerts } from './index'
import { buildNotificationData } from './service'

import logger from 'cozy-logger'

import { Q } from 'cozy-client'

const log = logger.namespace('category-budgets')

const fetchDoctypeById = async (client, doctype) => {
  const { data } = await client.query(Q(doctype))
  return keyBy(data, x => x._id)
}

const getAccountOrGroupLabelFromAlert = (
  alert,
  accountsById,
  groupsById,
  t
) => {
  if (!alert.accountOrGroup) {
    return t('AccountSwitch.all-accounts')
  } else {
    const { _id, _type } = alert.accountOrGroup
    const col = _type === ACCOUNT_DOCTYPE ? accountsById : groupsById
    const doc = col[_id]
    if (doc) {
      return _type === ACCOUNT_DOCTYPE
        ? getAccountLabel(doc)
        : getGroupLabel(doc, t)
    } else {
      return ''
    }
  }
}

const transformForTemplate = (budgetAlert, t, accountsById, groupsById) => {
  const catId = budgetAlert.alert.categoryId
  const catName = getCategoryName(catId)
  const type = budgetAlert.alert.categoryIsParent
    ? 'categories'
    : 'subcategories'
  const accountOrGroupLabel = getAccountOrGroupLabelFromAlert(
    budgetAlert.alert,
    accountsById,
    groupsById,
    t
  )

  return {
    ...budgetAlert.alert,
    categoryLabel: t(`Data.${type}.${catName}`),
    currentAmount: (-sumBy(budgetAlert.expenses, tr => tr.amount)).toFixed(0),
    accountOrGroupLabel
  }
}

const formatBudgetAlertToCategoryId = budgetAlert =>
  `${budgetAlert.categoryId}:${budgetAlert.maxThreshold}`

class CategoryBudget extends NotificationView {
  constructor(options) {
    super(options)
    this.currentDate = options.currentDate
    this.force = options.force
  }

  shouldSend(templateData) {
    const willSend = !!templateData.budgetAlerts
    if (!willSend) {
      log('info', 'Nothing to send, bailing out')
    }
    return willSend
  }

  async buildData() {
    const client = this.client
    const alerts = await fetchCategoryAlerts(client)

    const budgetAlerts = await buildNotificationData(client, alerts, {
      currentDate: this.currentDate,
      force: this.force
    })

    this.updatedAlerts = budgetAlerts && budgetAlerts.map(x => x.alert)

    if (!budgetAlerts) {
      return {}
    }

    const accountsById = await fetchDoctypeById(client, ACCOUNT_DOCTYPE)
    const groupsById = await fetchDoctypeById(client, GROUP_DOCTYPE)

    const alertsToShow = budgetAlerts
      ? budgetAlerts.filter(x => x.expenses)
      : null
    const data = {
      date: getCurrentDate(),
      budgetAlerts: alertsToShow
        ? alertsToShow.map(budgetAlert =>
            transformForTemplate(budgetAlert, this.t, accountsById, groupsById)
          )
        : null
    }

    this.templateData = data

    return data
  }

  getUpdatedAlerts() {
    if (this.updatedAlerts === undefined) {
      throw new Error(
        'Notification must have been sent before calling getUpdatedAlerts'
      )
    }
    return this.updatedAlerts
  }

  getTitle(templateData) {
    const { budgetAlerts } = templateData
    const hasMultipleAlerts = budgetAlerts.length > 1
    return hasMultipleAlerts
      ? this.t('Notifications.categoryBudgets.email.title-multi', {
          alertCount: budgetAlerts.length
        })
      : this.t('Notifications.categoryBudgets.email.title-single', {
          categoryLabel: budgetAlerts[0].categoryLabel
        })
  }

  getPushContent(templateData) {
    const { budgetAlerts } = templateData
    return budgetAlerts.length > 1
      ? budgetAlerts
          .map(
            alert =>
              `${alert.categoryLabel}: ${alert.currentAmount}€ > ${alert.maxThreshold}€`
          )
          .join(', ')
      : `${budgetAlerts[0].currentAmount}€ > ${budgetAlerts[0].maxThreshold}€`
  }

  getExtraAttributes() {
    if (!this.templateData) {
      return
    }
    const { budgetAlerts } = this.templateData
    return merge(super.getExtraAttributes(), {
      data: {
        route: '/analysis/categories'
      },
      categoryId: budgetAlerts.map(formatBudgetAlertToCategoryId).join(','),
      state: JSON.stringify({
        budgetAlerts: sortBy(
          budgetAlerts,
          budgetAlert => budgetAlert.categoryId
        ).map(budgetAlert => ({
          categoryId: budgetAlert.categoryId,
          date: formatDate(new Date(), 'YYYY-MM-DD'),
          maxThreshold: budgetAlert.maxThreshold
        }))
      })
    })
  }
}

CategoryBudget.template = template
CategoryBudget.category = 'budget-alerts'
CategoryBudget.preferredChannels = ['mobile', 'mail']

export default CategoryBudget
