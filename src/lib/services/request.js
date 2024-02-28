import { medusaUrl } from "./config";

export default async function medusaRequest(method, path = "", payload = {}, headers = {}) {
  const url = new URL(medusaUrl + path);

  const fetchOptions = {
    method,
    credentials: 'include', // This is equivalent to axios's withCredentials: true
    headers: {
      ...headers,
    },
  };

  if (method !== 'GET') {
    fetchOptions.body = JSON.stringify(payload);
    fetchOptions.headers['Content-Type'] = 'application/json';
  }

  return fetch(url.toString(), fetchOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return { data: await response.json(), status: response.status, statusText: response.statusText };
    })
    .catch((error) => {
      // Handle errors here
      console.error('Fetch Error:', error);
      throw error;
    });
}
