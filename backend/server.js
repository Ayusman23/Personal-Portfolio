import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import { seedInitialData } from './seeds/seedData.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public/assets folder if accessed directly
app.use('/assets', express.static(path.join(__dirname, '../frontend/public/assets')));

// Render standard health check endpoint - Instant 200 response
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Root route - Instant 200 response for cloud pingers & uptime monitors
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: "Ayusman's MERN Portfolio Backend API is live",
    healthCheck: '/api/health',
  });
});

// API health check endpoint with DB status
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'online',
    database: dbConnected ? 'connected' : 'connecting',
    timestamp: new Date().toISOString(),
    message: "Ayusman's MERN Portfolio Backend API is running smoothly.",
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/certifications', certificationRoutes);

// Manual Seed / Reset endpoint
app.post('/api/seed', async (req, res, next) => {
  try {
    await seedInitialData(true); // force re-seed
    res.json({ success: true, message: 'Database seeded successfully with updated SAP, DRDO, HAL portfolio data' });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT, 10) || 5000;

// Start server immediately on 0.0.0.0 so Render's internal /healthz probe connects in <10ms
const startServer = async () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(` Portfolio Backend Server Running!`);
    console.log(` Host: 0.0.0.0 | Port: ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Health check: http://0.0.0.0:${PORT}/healthz`);
    console.log(`=========================================`);
  });

  try {
    await connectDB();
    // Only seed if empty (false) to prevent blocking or wiping database on every boot
    await seedInitialData(false);
  } catch (err) {
    console.error('Database connection / seeding notice:', err.message);
  }
};

startServer();
