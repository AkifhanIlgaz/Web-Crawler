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

module.exports = { normalizeUrl };
