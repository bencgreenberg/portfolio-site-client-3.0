export const getApiData = async (url) => {
  url = JSON.stringify(url);
  let response = await fetch(url);
  let data = await response.json();
  return data;
}
