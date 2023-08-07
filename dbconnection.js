import mongoose from "mongoose";
import "dotenv/config";

const dbConnection = () => {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      `mongodb+srv://sarathkumar:sara98@cluster0.xk4iedp.mongodb.net/?retryWrites=true&w=majority`,
      params
    );
    console.log("Db connected successfully");
  } catch (error) {
    console.log("error occured while connecting Db", error);
  }
};
export default dbConnection;
