const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

const refrigerators_path = path.join(__dirname, '../../data/refrigerators.csv');
const prices_path = path.join(__dirname, '../../data/prices.csv');

puppeteer.use(AdblockerPlugin());
puppeteer.use(StealthPlugin());

const scrapingPrice = async (links) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');

  prices = [];

  for(link of links) {
    await page.goto(link);
    const check = await page.$('span.aPrice.large span');

    if (!check) {
      error = 'Error';
      prices.push(error);
      console.log(error);
      continue;
    }

    await page.waitForSelector('span.aPrice.large span');

    const price = await page.$eval('span.aPrice.large span', price => {
      return price.innerText
    });

    console.log(price);
    prices.push(price);
  }
  console.log(prices);
  browser.close();
  return prices;
}


const links = []

fs.createReadStream(refrigerators_path)
.pipe(csv({}))
.on('data', row => { links.push(row.URL) })
.on('end', async () => { 
  const prices = await scrapingPrice(links);

  const csvWriter = createCsvWriter({
    path: prices_path,
    header: [
      { id: 'price', title: 'Price' },
    ]
  })

  csvWriter.writeRecords(prices).then(() => console.log('The CSV file was written successfully'))
})

