export async function apiFetch(
  url,
  token = null,
  body = null,
  method = 'GET',
  headers = { 'Content-Type': 'application/json' }
) {
  const options = {
    method,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    mode: 'cors',
  };

  if (body && method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Handle errors
  if (!response.ok) {
    const text = await response.text();
    let message;

    try {
      const json = JSON.parse(text);
      message = json.message || JSON.stringify(json);
    } catch {
      message = text;
    }

    return new Error(`${response.status}: ${response.statusText}: ${message}`);
  }

  return await response.json();
}

export function clientHostName() {
  if (import.meta.env.MODE === 'development') {
    return window.location.hostname + ':' + window.location.port;
  }
  return window.location.hostname;
}

export function serverHostName() {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:5000';
  }
  return import.meta.env.VITE_REMOTE_HOST;
}
