const qawolf = require('qawolf')
const fs = require('fs')
const path = require('path')

const { takeScreenshot } = require('./utils')

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
  await page.evaluate(() => {
    document.body.classList.add('qawolf')
  })
  await takeScreenshot('banks transactions', 'my-accounts')

  await page.click('[data-testid="balance.account-row.compteisa1"]')
  await takeScreenshot('banks transactions', 'compteisa1')
  await page.click(
    '[data-testid="transaction.row.isa_remboursement_pret_immo_nov_2018"]'
  )
  await takeScreenshot('banks transactions', 'modal-opened')
})
