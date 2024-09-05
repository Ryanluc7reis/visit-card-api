import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import databaseMiddleware from "../lib/middlewares/mongoose";
import dotenv from "dotenv";

import SignupRoute from "./controllers/user/signup.ts";
import LoginRoute from "./controllers/user/login.ts";
import LogoutRoute from "./controllers/user/logout.ts";
import LinkRoutes from "./controllers/link/index.ts";
import AboutRoutes from "./controllers/about/index.ts";
import CardRoute from "./controllers/user/card.ts";

dotenv.config();
databaseMiddleware();

const app: Application = express();
const port: number | string = process.env.PORT || 4444;

const corsConfig: CorsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", SignupRoute);
app.use("/api/user", LoginRoute);
app.use("/api/user", LogoutRoute);
app.use("/api/card", LinkRoutes);
app.use("/api/card", AboutRoutes);
app.use("/api/card", CardRoute);

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));
