import mongoose from "mongoose";

const connectDb = async (url: string) => {
  // console.log(url);
  await mongoose
    .connect(url)
    .then(() => console.log("Connected..."))
    .catch((err) => console.log(err));
};

export default connectDb;
