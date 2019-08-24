const commandLineArgs = require("command-line-args");

function getArgs(): { [key: string]: boolean} {
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
  // mock
  console.log("dotenv called");
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
