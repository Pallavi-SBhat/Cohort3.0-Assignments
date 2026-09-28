const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = process.env.MONGO_URI;
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  if (!mongoUri && isProduction) {
    console.error('⚠️ MONGO_URI environment variable is not set in Vercel project settings!');
  }

  const uriToUse = mongoUri || 'mongodb://127.0.0.1:27017/ecommerce_db';

  try {
    const conn = await mongoose.connect(uriToUse, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    
    // In production or Vercel serverless environment, do not attempt MongoMemoryServer
    if (isProduction) {
      throw new Error(`MongoDB connection failed (${error.message}). Please ensure MONGO_URI is configured in your Vercel Project Environment Variables.`);
    }

    // Attempt fallback to mongodb-memory-server for local dev only
    try {
      console.log('🔄 Attempting to start MongoDB Memory Server as fallback for local development...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({
        instance: { dbName: 'ecommerce_db' },
        spawnTimeoutMS: 30000,
      });
      const memoryUri = mongoServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      isConnected = conn.connections[0].readyState === 1;
      console.log(`✅ MongoDB Memory Server Connected: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error('❌ Could not start MongoMemoryServer fallback:', fallbackError.message);
      throw error;
    }
  }
};

module.exports = connectDB;


