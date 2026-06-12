import "dotenv/config";

export const config = {
  tmdbToken: process.env.TMDB_API_KEY,
  port: process.env.PORT || 3000,
};

// Fail fast: stop the app if the token is missing
if (!config.tmdbToken) {
  throw new Error("Missing TMDB_API_KEY in .env file");
}