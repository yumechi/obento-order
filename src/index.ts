import { puppeteerSettings } from "./enviroments/settings";
import { PuppeteerDomain } from "./scriping/puppeteerDomain";

exports.handler = (event: any, context: any, callback: Function) =>  {
  console.log("Order called");
  const settings = puppeteerSettings();
  (new PuppeteerDomain(settings).orderBento());
};
