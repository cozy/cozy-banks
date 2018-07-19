import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cozyConnect } from 'old-cozy-client'
import { connect } from 'react-redux'
import { Title } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'
import { flowRight as compose } from 'lodash'
import ToggleRow from './ToggleRow'
import {
  getSettings,
  fetchSettingsCollection,
  createSettings,
  updateSettings
} from '.'

class TogglePane extends Component {
  onToggle = (setting, checked) => {
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings[this.props.settingsKey][setting].enabled = checked
    dispatch(updateOrCreate(settings))
  }

  onChangeValue = (setting, value) => {
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings[this.props.settingsKey][setting].value = value.replace(/\D/i, '')
    dispatch(updateOrCreate(settings))
  }

  render() {
    const { rows, settings, settingsKey, t, title } = this.props

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
)(TogglePane)
