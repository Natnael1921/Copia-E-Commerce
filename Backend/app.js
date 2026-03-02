import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// Core Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// API 
app.use("/api/v1", routes);
app.use(errorMiddleware);
export default app;