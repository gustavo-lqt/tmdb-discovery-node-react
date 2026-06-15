# KiwiCine

A movie and TV show discovery app powered by the [TMDB API](https://www.themoviedb.org/).
Browse trending titles, popular movies and series, upcoming releases, search,
and view detailed pages with cast, ratings, genres, runtime, and synopsis.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React, Tailwind CSS, React Router
- **Data:** TMDB API

## Architecture

A full-stack app with a layered REST API backend and a React frontend.

**Backend** — a REST API built in layers, each with a single responsibility:

- **routes** — map URLs to controllers
- **controllers** — validate input and handle requests/responses
- **services** — communicate with the TMDB API
- **mappers** — transform raw TMDB responses into clean DTOs
- **middlewares** — centralized error handling

It includes an in-memory cache (with TTL) to reduce latency and respect TMDB
rate limits, and normalizes movies and TV shows into a single consistent shape
for the client.

**Frontend** — a React SPA that consumes the API:

- a single API client layer mirroring the backend endpoints
- a `useFetch` hook isolating loading/error/data state
- a `useDebounce` hook for search-as-you-type
- presentational components (cards, sections) fed by props

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

## Getting Started

```bash
# Backend
cd server
npm install
cp .env.example .env   # add your TMDB token
npm run dev            # runs on http://localhost:3000

# Frontend (in another terminal)
cd client
npm install
npm run dev            # runs on http://localhost:5173
```

## License

This project uses data from TMDB but is not endorsed or certified by TMDB.

## Author

Made by [gustavo-lqt](https://github.com/gustavo-lqt)