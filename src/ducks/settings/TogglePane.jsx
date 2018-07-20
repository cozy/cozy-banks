import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Title } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'
import { flowRight as compose } from 'lodash'
import ToggleRow from './ToggleRow'
import { createSettings, updateSettings, getSettingsFromCollection } from '.'
import { queryConnect } from 'utils/client-compat'
import { SETTINGS_DOCTYPE } from 'doctypes'

class TogglePane extends Component {
  onToggle = (setting, checked) => {
    const { settingsCollection, dispatch } = this.props
    const settings = getSettingsFromCollection(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings[this.props.settingsKey][setting].enabled = checked
    dispatch(updateOrCreate(settings))
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection, dispatch } = this.props
    const settings = getSettingsFromCollection(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings[this.props.settingsKey][setting].value = value.replace(/\D/i, '')
    dispatch(updateOrCreate(settings))
  }

  render() {
    const { rows, settingsCollection, settingsKey, t, title } = this.props

    if (settingsCollection.fetchStatus === 'loading') {
      return null
    }

    const settings = getSettingsFromCollection(settingsCollection)

    return (
      <div>
        <Title>{title}</Title>
        <p>
          {rows.map(row => {
            const setting = settings[settingsKey][row.name]

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

TogglePane.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  settingsKey: PropTypes.string.isRequired
}

export default compose(
  translate(),
  // We keep `connect` just so the component still receive the `dispatch` function as prop
  // This has to be removed when we handle the mutations with the new cozy-client
  connect(),
  queryConnect({
    settingsCollection: {
      query: client => client.all(SETTINGS_DOCTYPE),
      as: 'settings'
    }
  })
)(TogglePane)
