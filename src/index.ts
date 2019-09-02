import { puppeteerSettings } from "./enviroments/settings";
import { PuppeteerDomain } from "./scriping/puppeteerDomain";

exports.handler = (event: any, context: any, callback: Function) =>  {
  const settings = puppeteerSettings();
  (new PuppeteerDomain(settings).orderBento());
};

function main() {
  const settings = puppeteerSettings();
  (new PuppeteerDomain(settings).orderBento());
}

// for debug
main();
