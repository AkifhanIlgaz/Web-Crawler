const { test, expect } = require("@jest/globals");
const { normalizeUrl } = require("./crawl");

test("normalize url https", () => {
  const input = "https://wagslane.dev/path/";
  const output = normalizeUrl(input);
  const expectedOutput = "wagslane.dev/path";
  expect(output).toEqual(expectedOutput);
});

test("normalize url with http", () => {
  const input = "http://wagslane.dev/path/";
  const output = normalizeUrl(input);
  const expectedOutput = "wagslane.dev/path";
  expect(output).toEqual(expectedOutput);
});

test("normalize url that contains uppercase", () => {
  const input = "https://wagsLANE.Dev/path";
  const output = normalizeUrl(input);
  const expectedOutput = "wagslane.dev/path";
  expect(output).toEqual(expectedOutput);
});

test("normalize url ends with /", () => {
  const input = "https://wagslane.dev/path/";
  const output = normalizeUrl(input);
  const expectedOutput = "wagslane.dev/path";
  expect(output).toEqual(expectedOutput);
});
