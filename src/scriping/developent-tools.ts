/* eslint-disable @typescript-eslint/explicit-function-return-type */
import puppeteer from "puppeteer";

// Needed for all mixins
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

// a mixin that adds a property and methods
export function DevelopmentTools<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    // デバッグ用（現在のページをスクショしたりする
    async debugPrint(page: puppeteer.Page, path: string, ignoreBody = false) {
      await page.screenshot({ path: path });
      console.log(`success screanhost: ${path}`);
      if (ignoreBody) {
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        console.log(bodyHTML);
      }
    }
  };
}
