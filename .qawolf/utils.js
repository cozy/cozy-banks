const fs = require('fs')
const path = require('path')

const takeScreenshot = (scenarioName, screenshotName) => {
  const directory = path.join(__dirname, 'screenshots', scenarioName)
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }
  return page.screenshot({ path: path.join(directory, `${screenshotName}.png`) })
}

module.exports = {
  takeScreenshot
}
