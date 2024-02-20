import "dotenv/config";

import cors from "cors";
import express from "express";
import { userAuthorization } from "./middleware/userAuthorization";
import collectionRoutes from "./routes/collection";
import tmdbRoutes from "./routes/tmdb";
import userRoutes from "./routes/user";

const app = express();

app.use(
  cors({
    origin: "https://thirai.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", tmdbRoutes);

// User Authorization
app.use("/authorization", userRoutes);

// authorization middleware
app.use(userAuthorization);
app.use("/user", collectionRoutes);

export default app;
