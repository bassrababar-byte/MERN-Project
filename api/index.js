import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import cors from "cors";




const app = express();

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-stk.netlify.app"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));


//routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend + DB alive 🚀" });
});

// Root route
app.get("/", (req, res) => res.send("Backend is running!"));



// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB connect

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection failed ❌", err));

// 👇 IMPORTANT: export app (don’t call app.listen)
export default app; 
