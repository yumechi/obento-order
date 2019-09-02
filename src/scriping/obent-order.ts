/* eslint-disable @typescript-eslint/explicit-function-return-type */
import puppeteer from "puppeteer";
import { PuppeteerDomainBase } from "./puppeteer-domain";

/**
 * お弁当注文時エラー
 */
class ObentOrderError extends Error {
  page: puppeteer.Page;

  constructor(m: string, p: puppeteer.Page) {
    super(m);
    this.page = p;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 弁当を頼むクラス
 */
export class ObentOrderPuppeteerDomain extends PuppeteerDomainBase {
  /**
   * お弁当を頼むメソッド
   * 設定は事前にコンストラクタに渡しておく
   */
  orderBento(): void {
    this.__orderBento().catch(e => {
      if (e instanceof ObentOrderError) {
        e.page.screenshot({ path: "error.png" });
      }
      console.log(e);
    });
  }

  /**
   * お弁当を頼む実処理
   * FIXME: ページ遷移処理がすべて一緒なので統一可能だと思う
   * FIXME: Promissで書くのが正解な気がする
   */
  async __orderBento() {
    const startUrl = this.settings["loginUrl"];
    const corpId = this.settings["CORP_ID"];
    const account = this.settings["ACCOUNT"];
    const pass = this.settings["PASS"];

    // login pageに遷移
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(startUrl);

    // login処理
    {
      try {
        await page.type('input[name="CORPORATION_CD"]', corpId);
        await page.type('input[name="LOGINID"]', account);
        await page.type('input[name="PASSWORD"]', pass);

        // imageのclickがsubmit兼ねてるタイプ
        // なおここにawaitをつけると一生帰ってこないのでつけてはいけない
        const pagePromiss = page.waitForNavigation({
          timeout: 60000,
          waitUntil: "domcontentloaded"
        });
        await page.click('input[type="image"]');
        await pagePromiss;
        this.debugPrint(page, "screenshot1.png");
      } catch (e) {
        await browser.close();
        throw new ObentOrderError("ログイン失敗", page);
      }
    }

    // 会員トップページ
    {
      try {
        const pagePromiss = page.waitForNavigation({
          timeout: 60000,
          waitUntil: "domcontentloaded"
        });
        await page.click(".order");
        await pagePromiss;

        this.debugPrint(page, "screenshot2.png");
      } catch (e) {
        await browser.close();
        throw new ObentOrderError("注文ページ遷移失敗", page);
      }
    }

    // 注文ページ
    {
      try {
        const items = await page.$$(".cartButtonArea");
        const pickup = await items[0].$("input");
        if (!pickup) {
          await browser.close();
          throw new ObentOrderError("注文ページでセレクターの取得に失敗", page);
        }
        const pagePromiss = page.waitForNavigation({
          timeout: 60000,
          waitUntil: "domcontentloaded"
        });
        await pickup.click();
        await pagePromiss;
        this.debugPrint(page, "screenshot3.png");
      } catch (e) {
        await browser.close();
        throw new ObentOrderError("確認ページ遷移失敗", page);
      }
    }

    // 確認ページ
    {
      try {
        const pagePromiss = page.waitForNavigation({
          timeout: 60000,
          waitUntil: "domcontentloaded"
        });
        await page.click("#confirm-modal");
        await pagePromiss;
        this.debugPrint(page, "screenshot4.png");
      } catch (e) {
        await browser.close();
        throw new ObentOrderError("確定失敗", page);
      }
    }
    await browser.close();
  }
}
