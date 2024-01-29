import app from './app'
import mongoose from 'mongoose';
const dotenv= require('dotenv');
dotenv.config();



const mongoUrl:string = process.env.MONGO_URL;

const connectToDB = async () : Promise<void> => {
  try {
    await mongoose.connect(mongoUrl)
    console.log(`connect to ${mongoUrl}`);

  }
  catch (error) {
    console.error("error to connect to database");
    console.error(error);
  }
};
connectToDB();



const PORT : string = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});