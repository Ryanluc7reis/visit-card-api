import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import databaseMiddleware from "./lib/middlewares/mongoose";
import dotenv from "dotenv";

import SignupRoute from "./controllers/user/signup";
import LoginRoute from "./controllers/user/login";
import LogoutRoute from "./controllers/user/logout";
import ValidateSession from "./controllers/user/validateSession";
import LinkRoutes from "./controllers/link/index";
import AboutRoutes from "./controllers/about/index";
import CardRoute from "./controllers/user/card";

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
app.use("/api/user", ValidateSession);
app.use("/api/card", LinkRoutes);
app.use("/api/card", AboutRoutes);
app.use("/api/card", CardRoute);

app.use("/uploads", express.static("uploadsImages"));

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));
