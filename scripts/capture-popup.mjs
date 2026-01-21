import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 600, deviceScaleFactor: 2 });

  const htmlPath = join(__dirname, 'popup-screenshot.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  await page.screenshot({
    path: join(__dirname, '..', 'docs', 'images', 'popup.png'),
    type: 'png',
    omitBackground: false,
  });

  console.log('✅ docs/images/popup.png 생성 완료');

  await browser.close();
}

capture().catch(console.error);
