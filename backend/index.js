const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./routers');
const connectDB = require('./config/db');

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

