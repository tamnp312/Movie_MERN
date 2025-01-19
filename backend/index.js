import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cors from 'cors';
import routers from './routers/index.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8080;

const app = express(); 
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true

})); 
app.use(express.json());
routers(app);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });

