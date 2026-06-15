const BASE_URL = "http://localhost:3000/api";

async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
}

export const api = {
  trending: (type) => get(`/trending?type=${type}`),
  popularMovies: () => get("/popular/movies"),
  popularSeries: () => get("/popular/series"),
  upcoming: () => get("/upcoming"),
  hero: () => get("/hero"),
  detail: (type, id) => get(`/title/${type}/${id}`),
  search: (query) => get(`/search?q=${encodeURIComponent(query)}`),
};