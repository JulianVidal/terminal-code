const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  await page.goto('https://www.mathplayground.com/ASB_TugTeamMultiplication.html', {
    waitUntil: 'domcontentloaded'
  })
  await page.screenshot({
    path: 'test.png'
  })

  setTimeout(async () => {
    await browser.close()
  }, 10000)
}

run()
