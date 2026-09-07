import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, closeDB } from '../config/db.js';
import { seedInitialData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const run = async () => {
  await connectDB();
  await seedInitialData(true);
  console.log('Seeding completed successfully!');
  await closeDB();
  process.exit(0);
};

run();
