# KiwiCine

A movie and TV show discovery app powered by the [TMDB API](https://www.themoviedb.org/).
Browse trending titles, popular movies and series, upcoming releases, and view
detailed pages with cast, ratings, and synopsis.

## Status

**In development** — backend complete, frontend in progress.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React, Tailwind CSS *(planned)*
- **Data:** TMDB API

## Architecture

The backend is a REST API built in layers, each with a single responsibility:

- **routes** — map URLs to controllers
- **controllers** — validate input and handle requests/responses
- **services** — communicate with the TMDB API
- **mappers** — transform raw TMDB responses into clean DTOs
- **middlewares** — centralized error handling

It also includes an in-memory cache (with TTL) to reduce latency and respect
TMDB rate limits, and normalizes movies and TV shows into a single consistent
shape for the client.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/trending?type=movie\|tv` | Trending titles (movie default) |
| GET | `/api/popular/movies` | Popular movies |
| GET | `/api/popular/series` | Popular TV shows |
| GET | `/api/upcoming` | Upcoming movies |
| GET | `/api/hero` | Featured top title |
| GET | `/api/title/:type/:id` | Full details (movie or tv) |
| GET | `/api/search?q=...` | Search movies and TV shows |

## Roadmap

- [x] Backend REST API (Express)
- [x] TMDB integration with DTO mapping
- [ ] Frontend (React + Tailwind): home, detail page, search
- [ ] Browse/Discover page with pagination, genre filters, and sorting

## License

This project uses data from TMDB but is not endorsed or certified by TMDB.