import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

// Security headers
app.use(helmet());

// Cookie parser (reads httpOnly cookies into req.cookies)
app.use(cookieParser());

// CORS — filter out undefined/empty origins and validate
const allowedOrigins = [
    process.env.CORS_ORIGIN,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // Allow requests with no origin (server-to-server, curl, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));


// routes import

import userRouter from './routes/auth.route.js'
import blogRouter from './routes/blog.route.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use('/api/v1/blogs', blogRouter);

// global error handler
app.use(errorHandler)

export default app;
