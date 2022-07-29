import express from "express";
import connectDB from "./db/db";
import dotenv from "dotenv";
import cors from "cors";
import { ErrorMiddleWare, NoRouteMiddleWare } from "./middleware/Error";
import AuthRouter from "./routes/Auth";
import CollectionRouter from "./routes/Collection";
import ProductRouter from "./routes/Product";
const fileUpload = require('express-fileupload');


dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

//middleware
const corsOption = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.json());
app.use(cors(corsOption));
app.use(fileUpload());
app.use("/", AuthRouter);
app.use("/", CollectionRouter);
app.use("/", ProductRouter);

app.use(NoRouteMiddleWare);
app.use(ErrorMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
