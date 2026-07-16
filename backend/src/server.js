import './config/env.js';
import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/error.js';

// dotenv.config();

connectDB();

import authRoutes from './routes/auth.js';
import skillsRoutes from './routes/skills.js';
import roadmapsRoutes from './routes/roadmaps.js';
import progressRoutes from './routes/progress.js';
import lockedAppsRoutes from './routes/lockedApps.js';

const app = express();

app.use(helmet());

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/roadmaps', roadmapsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/locked-apps', lockedAppsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LifePath API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      skills: '/api/skills',
      roadmaps: '/api/roadmaps',
      progress: '/api/progress',
      lockedApps: '/api/locked-apps'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}
📡 API: http://localhost:${PORT}
🏥 Health: http://localhost:${PORT}/health
  `);
});

process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;