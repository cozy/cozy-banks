/* CLI used in development to generate emails from template and data */

jest.mock('./utils', () => {
  const originalUtils = jest.requireActual('./utils')
  return {
    ...originalUtils,
    getCurrentDate: () => new Date('05-07-2019')
  }
})

const { EMAILS, buildNotificationAttributes } = require('./common-test')

describe('emails', () => {
  for (const lang of ['en', 'fr']) {
    for (const templateName of Object.keys(EMAILS)) {
      it(`should render ${templateName} in ${lang}`, async () => {
        const attrs = await buildNotificationAttributes(templateName, lang)
        expect(attrs.content_html).toMatchSnapshot()
      })
    }
  }
})
