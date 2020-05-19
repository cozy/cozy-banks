const qawolf = require('qawolf')

let browser
let page

beforeAll(async () => {
  browser = await qawolf.launch()
  const context = await browser.newContext()
  await qawolf.register(context)
  page = await context.newPage()
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
})

test('banks transactions', async () => {
  await page.goto('http://banks.cozy.tools:8080/')
  await page.click('#password')
  await page.type('#password', 'cozy')
  await page.click('text=SE CONNECTER')
  await page.click('[data-testid="nav.my-accounts"]')
  await page.screenshot({ path: 'screenshots/my-accounts.png' })

  await page.click('[data-testid="balance.account-row.compteisa1"]')
  await page.screenshot({ path: 'screenshots/compte-isa1.png' })

  await page.click(
    '[data-testid="transaction.row.isa_remboursement_pret_immo_nov_2018"]'
  )
  await page.screenshot({ path: 'screenshots/transaction-modal-opened.png' })
})
