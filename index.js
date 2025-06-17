import express from 'express';
import connectDB from "./DB/connectDB.js"
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from "./routes/authRoute.js"
import bookRoute from "./routes/bookRoute.js"
import userRoute from './routes/userRoute.js';

// configuration
dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/books',bookRoute);

// database connect
connectDB()

// GLOBAL ERROR HANDLER
app.use((error,req, res,next) => {
    res.status(error.code || 500).json({
        message: error.message || "An unknown error occurred",
    });
});

// start/listen server
app.listen(PORT, ()=> {
    console.log(`server running on port http://localhost:${PORT}`);
});