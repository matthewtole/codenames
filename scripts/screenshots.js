const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:7777');
  await page.screenshot({path: 'docs/images/homepage-01.png'});
  await page.click('.button:nth-child(2)');
  await page.click('.green.button');
  await page.waitFor('.Card')
  await page.click('.Card[data-role="red"]');
  await page.click('.Card[data-role="red"]');
  await page.waitFor('.dimmer')
  await page.click('.dimmer')
  await page.click('.Card[data-role="blue"]');
  await page.click('.Card[data-role="blue"]');
  await page.screenshot({path: 'docs/images/controller-01.png'});
  const url = await page.evaluate(() => Promise.resolve(window.location.href));
  console.log(url);
  await page.goto(url.replace('controller', 'viewer'));
  await page.screenshot({path: 'docs/images/viewer-01.png'});
  await browser.close();
})();