import express from "express";
import "dotenv/config";
import cors from "cors";
import dbConnection from "./dbconnection.js";
import { userRouter } from "./Routers/UserRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// dbConnection
dbConnection();
app.listen(9000, () => {
  console.log("server started");
});

app.use("/api", userRouter);
