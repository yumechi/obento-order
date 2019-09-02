import { puppeteerSettings } from "./environments/settings";
import { ObentOrderPuppeteerDomain } from "./scriping/obent-order";
import { DevelopmentTools } from "./scriping/developent-tools";

exports.handler = (event: any, context: any, callback: Function) =>  {
  const settings = puppeteerSettings();
  (new ObentOrderPuppeteerDomain(settings).orderBento());
};

function main() {
  const settings = puppeteerSettings();
  const WithDebugObentOrder = DevelopmentTools(ObentOrderPuppeteerDomain);
  (new WithDebugObentOrder(settings).orderBento());
}

// for debug
main();
