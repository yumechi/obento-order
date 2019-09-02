import { puppeteerSettings } from "./environments/settings";
import { ObentOrderPuppeteerDomain } from "./scriping/obent-order";

exports.handler = (event: any, context: any, callback: Function) =>  {
  const settings = puppeteerSettings();
  (new ObentOrderPuppeteerDomain(settings).orderBento());
};

function main() {
  const settings = puppeteerSettings();
  (new ObentOrderPuppeteerDomain(settings).orderBento());
}

// for debug
main();
