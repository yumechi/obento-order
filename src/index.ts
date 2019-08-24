import { DotEnvDomain } from "./dotenv_test";

import commandLineArgs from "command-line-args";

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
  const d = new DotEnvDomain();
  d.readDotenvTest();
}

function callPuppeteerTest(): void {
  // mock
  console.log("Puppeteer called");
}

function main(): void {
  const options: {[key: string]: boolean} = getArgs();
  if(options["dotenv"]) {
    callDotenvTest();
  } if(options["puppeteer"]) {
    callPuppeteerTest();
  }
  console.log(options);
}

main();
