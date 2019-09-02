import puppeteer from "puppeteer";

// Needed for all mixins
type Constructor<T = {}> = new (...args: any[]) => T;

// a mixin that adds a property and methods
export function DevelopmentTools<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    // デバッグ用（現在のページをスクショしたりする
    async debug_print(
      page: puppeteer.Page,
      path: string,
      ignore_body: boolean = false
    ) {
      await page.screenshot({ path: path });
      console.log(`success screanhost: ${path}`);
      if (ignore_body) {
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        console.log(bodyHTML);
      }
    }
  };
}
