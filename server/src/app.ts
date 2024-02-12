import "dotenv/config";

import cors from "cors";
import express from "express";
import collectionRoutes from "./routes/collection";
import tmdbRoutes from "./routes/tmdb";
import userRoutes from "./routes/user";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", tmdbRoutes);

// User Authorization
app.use("/authorization", userRoutes);

// authorization middleware
app.use("/user", collectionRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

export default app;
