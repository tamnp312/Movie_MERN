
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const categoriesRouter = require('./categoriesRouter');


const routers = (app) => {
    app.use('/users', userRouter);
    // app.use('/movies', movieRouter);
    // app.use('/categories', categoriesRouter);
}

module.exports = routers;