import mongoose from 'mongoose';

export async function connectMongo() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_admin';
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(mongoUri, { autoIndex: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err?.message || err);
    console.warn('Starting server without MongoDB (read/write endpoints may fail).');
  }
}

