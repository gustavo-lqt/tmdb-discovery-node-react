import express from "express";
import cors from "cors";

import catalogRoutes from "./routes/catalogRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "KiwiCine API is running" });
});

// All movie/series routes live under /api
app.use("/api", catalogRoutes);

// Error handler must come LAST, after all routes
app.use(errorHandler);

export default app;