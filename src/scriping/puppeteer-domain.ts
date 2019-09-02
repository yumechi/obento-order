import puppeteer from "puppeteer";

/**
 * スクレイピングをして弁当を頼むクラス
 */
export class PuppeteerDomainBase {
  settings: { [key: string]: any };
  constructor(settings: { [key: string]: any }) {
    this.settings = settings;
  }

  async debug_print(page: puppeteer.Page, path: string) {
    /**
     * Mixinに上書きされるだけのモック
     */
    // console.log("Debug nothing...");
  }
}

export class PuppeteerTest extends PuppeteerDomainBase {
  testScreanShot() {
    /**
     * Googleのトップページをスクショするやつ・結構時間がかかる
     * refer: https://qiita.com/kanoe/items/9043a81d28a1b733b2e2
     */
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.google.com");
      await this.debug_print(page, "screenshot.png");
      await browser.close();
    })();
  }
}
