import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import Field from 'cozy-ui/transpiled/react/Field'
import compose from 'lodash/flowRight'

import countries from './countries.json'
import PersonalInfoInfos from 'ducks/personal-info/Infos'

const defaultNationality = { label: 'French', value: 'FR' }

const nationalities = countries.map(country => {
  return {
    label: country.nationality,
    value: country.alpha_2_code
  }
})

/**
 * Displays a form to fill personal info into the myself contact.
 */
class PersonalInfoForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSave = this.handleSave.bind(this)

    const myself = this.props.myself

    this.state = {
      saving: false,
      formData: {
        birthcity: myself.birthcity,
        nationality:
          nationalities.find(
            x => myself.nationality && x.value === myself.nationality
          ) || defaultNationality
      }
    }
  }

  render() {
    const { t } = this.props
    const { saving, formData } = this.state

    return (
      <>
        <Field
          value={formData.birthcity}
          onChange={ev => this.handleChangeField('birthcity', ev.target.value)}
          type="text"
          name="birthcity"
          label={t('PersonalInfo.birthcity')}
        />
        <Field
          onChange={option => this.handleChangeField('nationality', option)}
          value={formData.nationality}
          type="select"
          name="nationality"
          options={nationalities}
          label={t('PersonalInfo.nationality')}
        />
        <PersonalInfoInfos />
        <Button
          busy={saving}
          disabled={saving}
          onClick={this.handleSave}
          label={t('PersonalInfo.save-cta')}
          type="primary"
          className="u-mt-1"
        />
      </>
    )
  }

  handleChangeField(name, value) {
    const formData = {
      ...this.state.formData,
      [name]: value
    }
    this.setState({
      formData
    })
  }

  async handleSave(ev) {
    const {
      client,
      onBeforeSave,
      onAfterSave,
      onSaveSuccessful,
      myself
    } = this.props
    const { formData } = this.state
    ev && ev.preventDefault()
    onBeforeSave && onBeforeSave()
    try {
      const attributes = {
        nationality: formData.nationality.value,
        birthcity: formData.birthcity
      }
      const updatedMyself = {
        ...myself,
        ...attributes
      }
      await client.save(updatedMyself)
      onSaveSuccessful && onSaveSuccessful(updatedMyself)
    } finally {
      onAfterSave && onAfterSave()
    }
  }
}

export default compose(
  translate(),
  withClient
)(PersonalInfoForm)
