import {
  getPopularMovies,
  getPopularTVShows,
  getTrending,
  getUpcomingMovies,
  getDetail,
  search,
  getHero,
} from "../services/tmdbService.js";

export async function popularMovies(req, res, next) {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (err) {
    next(err); // pass the error to the error handler
  }
}
export async function popularSeries(req, res, next) {
  try {
    const series = await getPopularTVShows();
    res.json(series);
  } catch (err) {
    next(err); // pass the error to the error handler
  }
}

export async function trending(req, res, next) {
  try {
    const type = req.query.type === "tv" ? "tv" : "movie"; // only allow "movie" or "tv", default to "movie"
    const items = await getTrending(type);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function upcoming(req, res, next) {
  try {
    const movies = await getUpcomingMovies();
    res.json(movies);
  } catch (err) {
    next(err);
  }
}

export async function hero(req, res, next) {
  try {
    const data = await getHero();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const { type, id } = req.params;

    // validate type: only "movie" or "tv" allowed
    if (type !== "movie" && type !== "tv") {
      return res
        .status(400)
        .json({ error: "Invalid type. Use 'movie' or 'tv'" });
    }
    // validate id: must be a positive number
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    const data = await getDetail(type, id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function searchTitles(req, res, next) {
  try {
    const query = req.query.q?.trim();

    // validate: query must exist and not be empty
    if (!query) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const results = await search(query);
    res.json(results);
  } catch (err) {
    next(err);
  }
}


