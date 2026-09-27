const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db';
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    
    // Attempt fallback to mongodb-memory-server if local mongod service is not running
    try {
      console.log('🔄 Attempting to start MongoDB Memory Server as fallback...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({
        instance: { dbName: 'ecommerce_db' },
        spawnTimeoutMS: 30000,
      });
      const memoryUri = mongoServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ MongoDB Memory Server Connected: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error('❌ Could not start MongoMemoryServer fallback:', fallbackError.message);
      console.log('\n💡 Tip: Please ensure MongoDB is installed & running locally (e.g. `mongod` or MongoDB Compass/Service) or specify MONGO_URI in backend/.env');
      process.exit(1);
    }
  }
};

module.exports = connectDB;

