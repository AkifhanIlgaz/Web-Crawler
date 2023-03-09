const { JSDOM } = require("jsdom");

/**
 *
 * @param {string} url
 * @returns {string}
 */
function normalizeUrl(url) {
  const urlObject = new URL(url);
  let fullPath = urlObject.hostname + urlObject.pathname;

  if (fullPath.length > 0 && fullPath.endsWith("/")) {
    return fullPath.slice(0, -1);
  }

  return fullPath;
}

/**
 *
 * @param {string} HTMLInput
 * @param {string} baseURL
 * @returns {string[]}
 */

function getURLsFromHTML(HTMLBody, baseURL) {
  const dom = new JSDOM(HTMLBody);
  const links = [];

  for (const a of dom.window.document.querySelectorAll("a")) {
    if (a.href.startsWith("/")) {
      try {
        links.push(new URL(a.href, baseURL).href);
      } catch (error) {
        console.log(`${error}: ${a.href}`);
      }
    } else {
      try {
        links.push(new URL(a.href).href);
      } catch (error) {
        console.log(`${error}: ${a.href}`);
      }
    }
  }

  return links;
}

module.exports = { normalizeUrl, getURLsFromHTML };
