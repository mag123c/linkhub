import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage();

  // 1280x800 크기 설정
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
  });

  // HTML 파일 로드
  const htmlPath = join(__dirname, '..', 'screenshot.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // 스크린샷 저장 (PNG, 알파 없음)
  await page.screenshot({
    path: join(__dirname, '..', 'screenshot-1280x800.png'),
    type: 'png',
    omitBackground: false,
  });

  console.log('✅ screenshot-1280x800.png 생성 완료');

  // 640x400 버전도 생성
  await page.setViewport({
    width: 640,
    height: 400,
    deviceScaleFactor: 1,
  });

  await page.screenshot({
    path: join(__dirname, '..', 'screenshot-640x400.png'),
    type: 'png',
    omitBackground: false,
  });

  console.log('✅ screenshot-640x400.png 생성 완료');

  await browser.close();
}

captureScreenshot().catch(console.error);
