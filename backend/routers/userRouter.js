const express = require('express');

const userRouter = express.Router();

// Define your routes here
userRouter.get('/', (req, res) => {
    res.send('User route');
});

module.exports = userRouter;