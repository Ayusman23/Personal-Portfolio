import { connectDB, closeDB } from '../config/db.js';
import { seedInitialData } from './seedData.js';

const run = async () => {
  await connectDB();
  await seedInitialData(true);
  console.log('Seeding completed successfully!');
  await closeDB();
  process.exit(0);
};

run();
