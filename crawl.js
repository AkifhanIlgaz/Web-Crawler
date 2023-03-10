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

async function crawlPage(baseURL, currentURL, pages) {
  if (!isOnSameDomain(baseURL, currentURL)) {
    return pages;
  }

  const normalizedCurrentURL = normalizeUrl(currentURL);

  if (normalizedCurrentURL in pages) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.error(`HTTP error, Status Code: ${res.status}`);
      return pages;
    }

    if (!res.headers.get("Content-Type").includes("text/html")) {
      console.error("Content type isn't HTML");
      return pages;
    }

    const body = await res.text();
    const urls = getURLsFromHTML(body, baseURL);

    for (const nextURL of urls) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(error.message);
  }

  return pages;
}

function isOnSameDomain(url1, url2) {
  url1 = new URL(url1);
  url2 = new URL(url2);
  return url1.hostname === url2.hostname;
}

module.exports = { normalizeUrl, getURLsFromHTML, crawlPage };
