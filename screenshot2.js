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
  await page.goto(url, { timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  const fp = path.join(outputDir, filename);
  await page.screenshot({ path: fp, fullPage: false });
  console.log(`✅ Saved: ${fp} (${require('fs').statSync(fp).size} bytes)`);
  await browser.close();
}

async function main() {
  const urls = [
    ['/p2-unit-3.html', '02-p2-unit-3.png'],
    ['/p2-math-unit-1.html', '03-p2-math-unit-1.png'],
    ['/hk-english-grammar.html', '04-grammar.png'],
    ['/quiz-6-revision.html', '05-quiz6.png'],
  ];
  for (const [url, filename] of urls) {
    await screenshot(baseUrl + url, filename);
  }
  console.log('\nAll done!');
}

main().catch(e => { console.error(e); process.exit(1); });
