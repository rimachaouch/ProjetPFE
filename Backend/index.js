import { config } from "dotenv";
import { initDb } from "../BackEnd/dbConfig.js";
import { connectionConfig } from "../BackEnd/dbConfig.js";
import pkg from "pg";
import cors from "cors";
import express from "express";
import authRouter from "./src/Router/authRouter.js";
import userRouter from "./src/Router/userRouter.js";
;

import * as dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();
config();
const pool = new Pool(connectionConfig);
initDb();

//////////////////////////////////////////////////
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);


app.use("/assets", express.static("assets"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
