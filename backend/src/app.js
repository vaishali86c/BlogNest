import cors from 'cors';
import express from 'express';

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

// import userRouter from "./routes/user.routes.js";

// routes declaration
// app.use("/api/v1/users", userRouter)

export default app;
