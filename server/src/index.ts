import app from './app'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoUrl: string = process.env.MONGO_URL;

const connectToDB = async (): Promise<void> => {
  await mongoose.connect(mongoUrl)
    .catch((error: Error) => {
      console.error("error to connect to database");
      console.error(error);
    });
  console.log(`connect to ${mongoUrl}`);
};
connectToDB();



const PORT: string = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});