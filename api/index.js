import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import cors from "cors";



let isConnected = false;
//new connection for vercel
async function connectToMongoDB() {
  try{
    await mongoose.connect(process.env.MONGO);
    isConnected = true;
    console.log("connected to MongoDB");
  }catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}



const app = express();

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5173",
  "https://estatefrontend.netlify.app"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));


//routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



app.get('/api/test', async (req, res) => {
  try {
    const data = await MongooseModel.find();
    res.status(200).json(data);
  }catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});




//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



// root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//add new middleware for deploy on vercel
app.use((req, res, next) => {
  if (!isConnected){
    connectToMongoDB();
  }
  next();
})

export default app;
