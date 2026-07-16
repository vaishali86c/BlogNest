import dotenv from 'dotenv';

dotenv.config();

// Fail fast if critical env vars are missing
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        console.error(`FATAL: ${varName} is not set in environment variables`);
        process.exit(1);
    }
}

const { default: app } = await import('./app.js');
const { connectDB } = await import('./db/db.js');

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
