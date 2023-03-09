const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML } = require("./crawl");

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

// getURLsFromHTML

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
