/* CLI used in development to generate emails from template and data */

const { EMAILS, renderTemplate } = require('./common-test')

describe('emails', () => {
  for (const lang of ['en', 'fr']) {
    for (const templateName of Object.keys(EMAILS)) {
      it(`should render ${templateName} in ${lang}`, () => {
        expect(renderTemplate(templateName, lang)).toMatchSnapshot()
      })
    }
  }
})
