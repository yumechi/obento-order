/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import puppeteer from "puppeteer";

/**
 * スクレイピングをして弁当を頼むクラス
 */
export class PuppeteerDomainBase {
  settings: { [key: string]: any };
  constructor(settings: { [key: string]: any }) {
    this.settings = settings;
  }

  async debugPrint(page: puppeteer.Page, path: string) {
    /**
     * Mixinに上書きされるだけのモック
     * 未使用変数とかがあって面倒なので、うまいこと解消したい
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
      await this.debugPrint(page, "screenshot.png");
      await browser.close();
    })();
  }
}
