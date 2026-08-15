import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    
    // Set a quick timeout for local connection attempt before falling back
    mongoose.set('strictQuery', false);
    
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
    
    // Attempt standard connection with 3-second server selection timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    
    console.log('MongoDB Connected Successfully (Standard Connection)');
  } catch (error) {
    console.warn(`Could not connect to external MongoDB: ${error.message}`);
    console.log('Starting in-memory fallback MongoDB instance for seamless local operation...');
    
    try {
      mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      await mongoose.connect(inMemoryUri);
      console.log('In-Memory MongoDB Connected Successfully!');
    } catch (fallbackError) {
      console.error('Failed to initialize in-memory MongoDB:', fallbackError.message);
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};
