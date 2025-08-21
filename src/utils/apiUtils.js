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
      ...(token ? { Authorization: token && `Bearer ${token}` } : {}),
    },
    mode: 'cors',
  };

  if (body && method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    let message;
    try {
      const json = await response.json();
      message = json.message || json.stringify(json);
    } catch {
      message = await response.text();
    }
    throw new Error(`${response.status}: ${response.statusText}: ${message}`);
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
