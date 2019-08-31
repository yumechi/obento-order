import { DotEnvDomain } from "../enviroments/dotenvDomain";

import commandLineArgs from "command-line-args";
import { puppeteerSettings } from "../enviroments/settings";
import { PuppeteerDomain } from "../scriping/puppeteerDomain";

function getArgs(): { [key: string]: boolean; } {
  const optionDefinitions = [
    {
      name: "dotenv",
      alias: "d",
      type: Boolean
    },
    {
      name: "puppeteer",
      alias: "p",
      type: Boolean
    },
    {
      name: "order",
      alias: "o",
      type: Boolean
    },
  ];
  return commandLineArgs(optionDefinitions);
}

function callDotenvTest(): void {
  console.log("dotenv called");
  (new DotEnvDomain()).readDotenvTest();
}

function callPuppeteerTest(): void {
  // mock
  console.log("Puppeteer called");
  const settings = puppeteerSettings();
  (new PuppeteerDomain(settings)).testScreanShot();
}

function callOrder(): void {
  // mock
  console.log("Order called");
  const settings = puppeteerSettings();
  (new PuppeteerDomain(settings).orderBento());
}


function main(): void {
  const options: {[key: string]: boolean} = getArgs();
  if(options["dotenv"]) {
    callDotenvTest();
  }
  if(options["puppeteer"]) {
    callPuppeteerTest();
  }
  if(options["order"]) {
    callOrder();
  }
  console.log(options);
}

main();
