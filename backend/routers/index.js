
import userRouter from './userRouter.js';
// import movieRouter from './movieRouter.js';
// import categoriesRouter from './categoriesRouter.js';



const routers = (app) => {
    app.use('/users', userRouter);
    // app.use('/movies', movieRouter);
    // app.use('/categories', categoriesRouter);
}

export default routers;