import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected Successfully.");
  } catch (error) {
    console.log("DB Connection Failed.", error.message);
  }
};
dbConnection()