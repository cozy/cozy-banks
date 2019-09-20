import appTemplate from './__tests__/app-layout.hbs'
import template from './__tests__/email-layout.hbs'
import {
  collectInfo,
  injectContent,
  partials as globalPartials,
  register
} from './index'

import Handlebars_ from 'handlebars'

const partials = {
  'app-layout': appTemplate,
  ...globalPartials
}

const Handlebars = Handlebars_.create()
register(Handlebars)
Handlebars.registerHelper({
  tGlobal: x => x,
  t: x => x
})
Handlebars.registerPartial({
  'app-layout': Handlebars.compile(appTemplate)
})

describe('template utils', () => {
  it('should extract parts and parents from template', () => {
    const templateInfo = collectInfo(template, partials)
    expect(templateInfo.parents).toEqual(['app-layout', 'cozy-layout'])
    expect(Object.keys(templateInfo.contentASTByName)).toEqual([
      'emailTitle',
      'emailSubtitle',
      'content',
      'logoUrl',
      'appName',
      'topLogo',
      'appURL',
      'settingsURL'
    ])
  })

  it('should inject content blocks', () => {
    const { ast } = collectInfo(template, partials)
    injectContent(ast, {
      emailTitle: 'emailTitle',
      emailSubtitle: 'emailSubtitle',
      content: 'content',
      logoUrl: 'logoUrl',
      appName: 'appName',
      topLogo: 'topLogo',
      appURL: 'appURL',
      settingsURL: 'settingsUrl',
      footerHelp: 'footerHelp'
    })

    const compiled = Handlebars.compile(ast)
    const rendered = compiled()
    expect(rendered).toMatchSnapshot()
  })
})
