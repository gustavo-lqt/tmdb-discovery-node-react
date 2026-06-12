import { Router } from "express";
import {
  popularMovies,
  popularSeries,
  trending,
  upcoming,
  detail,
  searchTitles,
  hero,
} from "../controllers/catalogController.js";

const router = Router();

router.get("/popular/movies", popularMovies);
router.get("/popular/series", popularSeries);
router.get("/trending", trending);
router.get("/upcoming", upcoming);
router.get("/title/:type/:id", detail);
router.get("/search", searchTitles);
router.get("/hero", hero);
export default router;
