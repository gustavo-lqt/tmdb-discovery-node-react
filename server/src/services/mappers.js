// Maps raw TMDB responses into clean DTOs for the client.

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

// Build the full poster URL and the full backdrop
function buildPoster(path) {
  return path ? `${IMG_BASE}${path}` : null;
}
function buildBackdrop(path) {
  return path ? `${BACKDROP_BASE}${path}` : null;
}

// DTO: turn a raw TMDB movie into a clean card object
export function toCardDTO(item) {
  const type = item.media_type || (item.title ? "movie" : "tv");

  return {
    id: item.id,
    type: type,
    title: item.title || item.name,
    year: (item.release_date || item.first_air_date)?.slice(0, 4) ?? "-",
    rating: Math.round(item.vote_average * 10) / 10,
    poster: buildPoster(item.poster_path),
  };
}
// DTO: the featured "top 1" banner on the home page
export function toHeroDTO(item) {
  const type = item.media_type || (item.title ? "movie" : "tv");
  return {
    id: item.id,
    type,
    title: item.title || item.name,
    backdrop: buildBackdrop(item.backdrop_path),
    about: item.overview,
    rating: Math.round(item.vote_average * 10) / 10,
  };
}

// ---- Details ----
// Sub-DTO: one cast member
export function toCastMemberDTO(person) {
  return {
    id: person.id,
    name: person.name,
    character: person.character,
    photo: person.profile_path ? `${IMG_BASE}${person.profile_path}` : null,
  };
}
// DTO: full detail page (movie or tv)
export function toDetailDTO(item, type) {
  return {
    id: item.id,
    type,
    title: item.title || item.name,
    date: item.release_date || item.first_air_date || null,
    rating: Math.round(item.vote_average * 10) / 10,
    cover: buildBackdrop(item.backdrop_path),
    about: item.overview,
    seasons: item.number_of_seasons ?? null, // null for movies
    episodes: item.number_of_episodes ?? null, // null for movies
    cast: (item.credits?.cast ?? []).slice(0, 10).map(toCastMemberDTO),
  };
}
