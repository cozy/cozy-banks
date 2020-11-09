import React from 'react'
import compose from 'lodash/flowRight'

import { withRouter } from 'react-router'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withClient, queryConnect } from 'cozy-client'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import Field from 'cozy-ui/transpiled/react/Field'
import Stack from 'cozy-ui/transpiled/react/Stack'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import PersonalInfoInfos from 'ducks/personal-info/Infos'
import { trackPage } from 'ducks/tracking/browser'
import Loading from 'components/Loading'
import { myselfConn } from 'doctypes'
import countries from './nationalities.json'

const defaultNationality = { label: 'French', value: 'FR' }

const makeNationalitiesOptions = lang =>
  countries
    .map(country => {
      return {
        label: country[`${lang}_nationality`] || country['en_nationality'],
        value: country.alpha_2_code
      }
    })
    .sort((a, b) => a.label > b.label)

/**
 * Loads the myself contact and displays the form
 */
class PersonalInfoDialog extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      saving: false,
      formData: {},
      formDataFilled: false
    }
    this.nationalityOptions = makeNationalitiesOptions(props.lang)
  }

  componentDidMount() {
    trackPage('virements:informations')
  }

  componentDidUpdate() {
    const nowMyself = this.props.myselfCol
    if (nowMyself.fetchStatus === 'loaded' && !this.state.formDataFilled) {
      const myself = nowMyself.data[0]
      this.setState({
        formDataFilled: true,
        formData: {
          birthcity: myself.birthcity,
          nationality:
            this.nationalityOptions.find(
              x => myself.nationality && x.value === myself.nationality
            ) || defaultNationality
        }
      })
    }
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
    const { client, onSaveSuccessful, myself, t } = this.props
    const { formData } = this.state
    ev && ev.preventDefault()
    this.setState({ saving: true })
    try {
      const attributes = {
        _type: 'io.cozy.contacts',
        nationality: formData.nationality.value,
        birthcity: formData.birthcity,
        myself: true
      }
      const updatedMyself = {
        ...myself,
        ...attributes
      }
      const { data: ret } = await client.save(updatedMyself)
      onSaveSuccessful && onSaveSuccessful(ret)
      Alerter.success(t('PersonalInfo.info-saved-succesfully'))
    } finally {
      this.setState({ saving: false })
    }
  }

  handleClose() {
    this.props.router.push('/balances')
  }

  render() {
    const { t, myselfCol } = this.props
    const { saving, formData } = this.state
    const data = myselfCol.lastError ? {} : myselfCol.data && myselfCol.data[0]

    if (!data) {
      return (
        <Dialog
          open={true}
          onClose={this.handleClose}
          title={t('PersonalInfo.modal-title')}
          content={<Loading />}
        />
      )
    }

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        title={t('PersonalInfo.modal-title')}
        content={
          <Stack spacing="xl">
            <Stack spacing="s">
              <Field
                value={formData.birthcity || ''}
                onChange={ev =>
                  this.handleChangeField('birthcity', ev.target.value)
                }
                type="text"
                name="birthcity"
                label={t('PersonalInfo.birthcity')}
                placeholder={t('PersonalInfo.birthcity-placeholder')}
                className="u-mh-0 u-mb-0"
              />
              <Field
                onChange={option =>
                  this.handleChangeField('nationality', option)
                }
                value={formData.nationality || 'FR'}
                type="select"
                name="nationality"
                options={this.nationalityOptions}
                label={t('PersonalInfo.nationality')}
                className="u-mh-0 u-mb-0"
              />
            </Stack>
            <PersonalInfoInfos />
          </Stack>
        }
        actions={
          <Button
            extension="full"
            busy={saving}
            disabled={saving}
            onClick={this.handleSave}
            label={t('PersonalInfo.save-cta')}
            variant="primary"
          />
        }
      />
    )
  }
}

export default compose(
  translate(),
  withRouter,
  withClient,
  queryConnect({
    myselfCol: myselfConn
  })
)(PersonalInfoDialog)
