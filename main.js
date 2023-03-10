const { crawlPage } = require("./crawl");

async function main() {
  const cliArguments = process.argv;

  if (cliArguments.length < 3) {
    console.error("Not enough arguments");
    process.exit(1);
  } else if (cliArguments.length > 3) {
    console.error("Too many arguments");
    process.exit(1);
  }

  const baseUrl = cliArguments[2];
  console.log(`starting to search ${baseUrl}`);

  await crawlPage(baseUrl, baseUrl, {});
}

main();
