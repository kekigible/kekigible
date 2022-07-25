import express from "express";
import connectDB from "./db/db";
import dotenv from "dotenv";
import { ErrorMiddleWare, NoRouteMiddleWare } from "./middleware/Error";
import AuthRouter from "./routes/Auth";
import CollectionRouter from "./routes/Collection";
import ProductRouter from "./routes/Product";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

//middleware
app.use(express.json());

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
