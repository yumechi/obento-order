import puppeteer from "puppeteer";

/**
 * スクレイピングをして弁当を頼むクラス
 */
export class PuppeteerDomain {
  settings: { [key: string]: any };
  constructor(settings: { [key: string]: any }) {
    this.settings = settings;
  }

  testScreanShot() {
    /**
     * Googleのトップページをスクショするやつ・結構時間がかかる
     * refer: https://qiita.com/kanoe/items/9043a81d28a1b733b2e2
     */
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.google.com");
      await page.screenshot({ path: "screenshot.png" });
      await browser.close();
    })();
  }

  orderBento() {
    /**
     * ログインするところまでできた弁当を注文するやつ
     */
    const startUrl = this.settings["login_url"];
    const corpId = this.settings["CORP_ID"];
    const account = this.settings["ACCOUNT"];
    const pass = this.settings["PASS"];

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(startUrl);

      await page.type('input[name="CORPORATION_CD"]', corpId);
      await page.type('input[name="LOGINID"]', account);
      await page.type('input[name="PASSWORD"]', pass);

      // imageのclickがsubmit兼ねてるタイプ
      // なおここにawaitをつけると一生帰ってこないのでつけてはいけない
      page.click('input[type="image"]');
      await page.waitForNavigation({
        timeout: 60000,
        waitUntil: "domcontentloaded"
      });

      // デバッグ用（現在のページをスクショしたりする
      // とりあえずログインできてるのは見えた
      {
        await page.screenshot({ path: "screenshot1.png" });
        //let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        //console.log(bodyHTML);
      }

      page.click(".order");
      await page.waitForNavigation({
        timeout: 60000,
        waitUntil: "domcontentloaded"
      });

      // デバッグ用（現在のページをスクショしたりする
      // とりあえずログインできてるのは見えた
      {
        await page.screenshot({ path: "screenshot2.png" });
        //let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        //console.log(bodyHTML);
      }
      let items = await page.$$(".cartButtonArea");
      let pickup = await items[0].$("input");
      console.log(items[0]);
      console.log(pickup);
      if (!pickup) {
        await browser.close();
        return;
      }
      pickup.click();
      await page.waitForNavigation({
        timeout: 60000,
        waitUntil: "domcontentloaded"
      });

      // デバッグ用（現在のページをスクショしたりする
      // とりあえずログインできてるのは見えた
      {
        await page.screenshot({ path: "screenshot3.png" });
        //let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        //console.log(bodyHTML);
      }

      page.click("#confirm-modal");
      await page.waitForNavigation({
        timeout: 60000,
        waitUntil: "domcontentloaded"
      });

      // デバッグ用（現在のページをスクショしたりする
      // とりあえずログインできてるのは見えた
      {
        await page.screenshot({ path: "screenshot4.png" });
        //let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        //console.log(bodyHTML);
      }

      await browser.close();
    })();
  }
}
