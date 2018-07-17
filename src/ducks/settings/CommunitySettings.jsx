import React, { Component } from 'react'
import { cozyConnect } from 'cozy-client'
import { connect } from 'react-redux'
import { Title } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'
import { flowRight as compose } from 'lodash'
import {
  getSettings,
  fetchSettingsCollection,
  createSettings,
  updateSettings
} from '.'
import { isCollectionLoading } from 'utils/client'
import Loading from 'components/Loading'
import ToggleRow from './ToggleRow'

class CommunitySettings extends Component {
  rows = [
    {
      title: 'CommunitySettings.auto_categorization.title',
      name: 'autoCategorization',
      description: 'CommunitySettings.auto_categorization.subtitle'
    }
  ]

  onToggle = (setting, checked) => {
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings.community[setting].enabled = checked
    dispatch(updateOrCreate(settings))
  }

  onChangeValue = (setting, value) => {
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings.community[setting].value = value.replace(/\D/i, '')
    dispatch(updateOrCreate(settings))
  }

  render() {
    const { settingsCollection, settings, t } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return <Loading />
    }

    return (
      <div>
        <Title>{t('CommunitySettings.title')}</Title>
        <p>
          {this.rows.map(row => {
            const setting = settings.community[row.name]

            return (
              <ToggleRow
                key={row.name}
                enabled={setting.enabled}
                value={setting.value}
                title={t(row.title)}
                description={t(row.description)}
                onChangeValue={this.onChangeValue}
                name={row.name}
                onToggle={this.onToggle}
              />
            )
          })}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: getSettings(state)
})

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default compose(
  translate(),
  cozyConnect(mapDocumentsToProps),
  connect(mapStateToProps)
)(CommunitySettings)
