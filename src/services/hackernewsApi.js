export default async function fetchContent(url) {
  try {
    let result = await fetch(url)
      .then(response => response.json())
      .then(data => data);
    return result;
  } catch (error) {
    return null;
  }
}
