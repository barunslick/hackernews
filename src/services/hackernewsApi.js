/**
 * Fetches content from the given endpoint and return it.
 *
 * @param {String} url Url of Api endpoint.
 * @returns {Object} Returns the response of fetch operation.
 */
export default async function fetchContent(url) {
  const result = await fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch ( () => {
      return null; 
    });

  return result;
}
