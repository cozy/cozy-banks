'use strict'

/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { I18n } from 'cozy-ui/react/I18n'
import App from '../src/components/App'

test('Hello world', () => {
  const component = renderer.create(
    <I18n lang='en' dictRequire={(lang) => require(`../src/locales/${lang}`)}>
      <App />
    </I18n>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
