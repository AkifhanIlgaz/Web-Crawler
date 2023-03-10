function printReport(pages) {
  let pagesAndCounts = Object.entries(pages);
  pagesAndCounts.sort((a, b) => b[1] - a[1]);

  for (const [page, count] of pagesAndCounts) {
    console.log(`Found ${count} internal links to ${page}`);
  }
}

module.exports = { printReport };
