import dotenv from 'dotenv';

dotenv.config();

const { default: app } = await import('./app.js');
const { connectDB } = await import('./db/db.js');

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

connectDB()
.then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running at http://${HOST}:${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
