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
    const check_price = await page.$('span.aPrice.large span');
    const check_missing_or_moved = await page.$eval('h1', txt => txt.innerText);
    
    console.log(check_missing_or_moved);

    if (check_missing_or_moved == 'Looks Like This Page Is Missing or Moved') {
      error = '[Error] - This page is missing or moved.';
      prices.push(error);
      console.log(error);
      continue

    } else if (!check_price) {
      error = '[Error] - Price not found, link may be unaivailable.';
      prices.push(error);
      console.log(error);
      continue;
    }

    const price = await page.$eval('span.aPrice.large span', price => {
      return price.innerText
    });

    if (!price) {
      error = '[Error] - Internal error, price not found';
      prices.push(error);
      console.log(error)
    } else {    
      prices.push(price);
      console.log(price);
    }
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

