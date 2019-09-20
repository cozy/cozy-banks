import template from './balance-lower.hbs'
import { partials, helpers } from './index'
import { collectInfo, injectContent } from './utils'
import Handlebars_ from 'handlebars'
import layouts from 'handlebars-layouts'

const Handlebars = Handlebars_.create()

beforeAll(() => {
  layouts.register(Handlebars)
  Handlebars.registerPartial(partials)
  Handlebars.registerHelper(helpers)
  Handlebars.registerHelper({
    t: x => x,
    tGlobal: x => x
  })
})

describe('template utils', () => {
  it('should extract parts and parents from template', () => {
    const templateInfo = collectInfo(template, partials)
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
    expect(templateInfo.parents).toEqual(['bank-layout', 'cozy-layout'])
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
      supportURL: 'supportURL'
    })

    const compiled = Handlebars.compile(ast)
    const rendered = compiled()
    expect(rendered).toMatchSnapshot()
  })
})
