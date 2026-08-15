import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    mongoose.set('strictQuery', false);
    
    // Mask credentials in logs for security
    const maskedUri = mongoUri.replace(/:[^:@]+@/, ':****@');
    console.log(`Connecting to MongoDB at: ${maskedUri}`);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('MongoDB Connected Successfully to MongoDB Atlas!');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};
