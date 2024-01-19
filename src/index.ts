import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import sendingMail from './helper/email'

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/',userRouter)
app.use('/',productRouter)

mongoose
  .connect(process.env.MONGODB_URL ?? "")
  .then(async () => {
    console.log("Database connected !!!!");
  })
  .catch((error) => {
    console.log(error);
  });


   cron.schedule('* * * * * *', () => {
    sendingMail
    
  });


app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
