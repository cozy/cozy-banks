import React, { useState } from 'react'
import compose from 'lodash/flowRight'
import { withClient, queryConnect } from 'cozy-client'
import { Button, Stack, Alerter, translate } from 'cozy-ui/transpiled/react'

import { TogglePaneSubtitle, TogglePaneText } from 'ducks/settings/TogglePane'

import { ToggleRowWrapper } from 'ducks/settings/ToggleRow'

import { settingsConn } from 'doctypes'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'

import CategoryAlertCard from 'ducks/settings/CategoryAlerts/CategoryAlertCard'
import CategoryAlertEditModal from 'ducks/settings/CategoryAlerts/CategoryAlertEditModal'

import { getAlertId, getNextAlertId, makeNewAlert } from 'ducks/budgetAlerts'
import useList from '../useList'

export const CreateCategoryAlert = translate()(({ createAlert, t }) => {
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const handleCreateAlert = async newAlert => {
    setCreating(false)
    try {
      setSaving(true)
      await createAlert(newAlert)
    } finally {
      setSaving(false)
    }
  }
  return (
    <>
      <Button
        className="u-ml-0"
        theme="subtle"
        icon="plus"
        label={t('Settings.create-alert')}
        busy={saving}
        onClick={() => {
          setCreating(true)
        }}
      />
      {creating ? (
        <CategoryAlertEditModal
          onDismiss={() => setCreating(false)}
          initialAlert={makeNewAlert()}
          onEditAlert={handleCreateAlert}
        />
      ) : null}
    </>
  )
})

const updateBudgetAlerts = async (client, settings, categoryBudgetAlerts) => {
  const updatedSettings = {
    ...settings,
    categoryBudgetAlerts
  }
  await client.save(updatedSettings)
}

const CategoryAlertsPane = ({ client, settingsCollection, t }) => {
  const settings = getDefaultedSettingsFromCollection(settingsCollection)
  const onUpdate = updatedAlerts =>
    updateBudgetAlerts(client, settings, updatedAlerts)
  const onError = () =>
    Alerter.error(t('Settings.budget-category-alerts.saving-error'))
  const [alerts, createOrUpdateAlert, removeAlert] = useList(
    settings.categoryBudgetAlerts,
    {
      onUpdate,
      onError,
      getId: getAlertId,
      getNextId: getNextAlertId
    }
  )

  return (
    <ToggleRowWrapper>
      <TogglePaneSubtitle>
        {t('Settings.budget-category-alerts.pane-title')}
      </TogglePaneSubtitle>
      <TogglePaneText>
        {t('Settings.budget-category-alerts.pane-description')}
      </TogglePaneText>
      <Stack spacing="s">
        {alerts
          ? alerts.map((alert, i) => (
              <div key={i}>
                <CategoryAlertCard
                  updateAlert={createOrUpdateAlert}
                  removeAlert={removeAlert}
                  alert={alert}
                />
              </div>
            ))
          : null}
        <CreateCategoryAlert createAlert={createOrUpdateAlert} />
      </Stack>
    </ToggleRowWrapper>
  )
}

export default compose(
  withClient,
  translate(),
  queryConnect({
    settingsCollection: settingsConn
  })
)(CategoryAlertsPane)
