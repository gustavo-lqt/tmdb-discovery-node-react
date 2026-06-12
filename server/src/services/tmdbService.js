// Handles all communication with the TMDB API.
import { config } from "../config/env.js";
import { toCardDTO, toHeroDTO, toDetailDTO } from "./mappers.js";
import { getCache, setCache } from "../utils/cache.js";

const BASE_URL = "https://api.themoviedb.org/3";

// ---------- every TMDB call goes through here ----------

async function fetchFromTMDB(path) {
  // 1. Try the cache first
  const cached = getCache(path);
  if (cached) return cached;
  // 2. Cache miss → fetch from TMDB
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }
  const data = await response.json();

  // 3. Save for 5 minutes and return
  setCache(path, data, 5 * 60 * 1000);
  return data;
}

// Popular movies (Popular Filmes section)
export async function getPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular?language=en-US");
  return data.results.map(toCardDTO);
}
// Popular tv shows (Popular Series section)
export async function getPopularTVShows() {
  const data = await fetchFromTMDB("/tv/popular?language=en-US");
  return data.results.map(toCardDTO);
}
// Trending with toggle: type is "movie" or "tv"
export async function getTrending(type = "movie") {
  const data = await fetchFromTMDB(`/trending/${type}/week?language=en-US`);
  return data.results.map(toCardDTO);
}
// Upcoming movies (movies only — tv has no upcoming concept on TMDB)
export async function getUpcomingMovies() {
  const data = await fetchFromTMDB("/movie/upcoming?language=en-US");
  return data.results.map(toCardDTO);
}
// Featured "top 1" banner (top trending of the week)
export async function getHero() {
  const data = await fetchFromTMDB("/trending/all/week?language=en-US");
  const top = data.results[0];
  return toHeroDTO(top);
}
// Full details (movie or tv) including cast, in a single request
export async function getDetail(type, id) {
  const data = await fetchFromTMDB(
    `/${type}/${id}?language=en-US&append_to_response=credits`,
  );
  return toDetailDTO(data, type);
}
// Search movies and tv shows by query (mixed results)
export async function search(query) {
  const encoded = encodeURIComponent(query);
  const data = await fetchFromTMDB(
    `/search/multi?language=en-US&query=${encoded}&include_adult=false`,
  );
  // keep only movies and tv
  const results = data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );
  return results.map(toCardDTO);
}
