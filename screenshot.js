const puppeteer = require('puppeteer-core');
const path = require('path');

const baseUrl = 'http://localhost:8080';
const outputDir = '/root/study-materials/screenshots';

async function screenshot(url, filename, width=1280, height=800) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  const fp = path.join(outputDir, filename);
  await page.screenshot({ path: fp, fullPage: false });
  console.log(`✅ Saved: ${fp}`);
  await browser.close();
}

async function main() {
  const fs = require('fs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  await screenshot(baseUrl + '/index.html', '01-index.png');
  await screenshot(baseUrl + '/p2-unit-3.html', '02-p2-unit-3.png');
  await screenshot(baseUrl + '/p2-math-unit-1.html', '03-p2-math-unit-1.png');
  await screenshot(baseUrl + '/hk-english-grammar.html', '04-grammar.png');
  await screenshot(baseUrl + '/quiz-6-revision.html', '05-quiz6.png');

  console.log('\nAll screenshots taken!');
}

main().catch(e => { console.error(e); process.exit(1); });
