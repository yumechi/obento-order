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

function main(): void {
  const options: {[key: string]: boolean} = getArgs();
  if(options["dotenv"]) {
    callDotenvTest();
  }
  if(options["puppeteer"]) {
    callPuppeteerTest();
  }
  console.log(options);
}

main();
