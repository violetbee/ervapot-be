import express, { Express } from "express";
import routeHandler from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PORT } from "./config/settings";
import { logger } from "./middlewares/logger";

const app: Express = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger);
dotenv.config();
app.use(cookieParser());

app.listen(PORT);

routeHandler(app);
