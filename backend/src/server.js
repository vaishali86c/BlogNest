import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';
let server;

const startServer = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
    } catch (error) {
      console.warn('MongoDB connection skipped:', error.message);
    }
  } else {
    console.warn('MONGODB_URI is not set. Server will start without MongoDB.');
  }

  server = app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
};

startServer();
