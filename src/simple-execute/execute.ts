import { DotEnvTest } from "../environments/dotenv-domain";

import commandLineArgs from "command-line-args";
import { puppeteerSettings } from "../environments/settings";
import { PuppeteerTest } from "../scriping/puppeteer-domain";
import { DevelopmentTools } from "../scriping/developent-tools";

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
  (new DotEnvTest()).readDotenvTest();
}

function callPuppeteerTest(): void {
  // mock
  console.log("Puppeteer called");
  const settings = puppeteerSettings();
  const WithDebugPuppeterTest = DevelopmentTools(PuppeteerTest);
  (new WithDebugPuppeterTest(settings)).testScreanShot();
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
