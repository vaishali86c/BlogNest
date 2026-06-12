import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

// middlewares
app.use(cors({
     origin: process.env.cors_ORIGIN,
     credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true, limit: '16kb'}))
app.use(express.static("public"))


// routes import

import userRouter from './routes/auth.route.js'
import blogRouter from './routes/blog.route.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use('/api/v1/blogs', blogRouter);  // blog route

// global error handler
app.use(errorHandler)

export default app;
