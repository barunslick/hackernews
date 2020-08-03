export default async function fetchContent(url) {
  let result = await fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch ( _ => {return null});

  return result;
}