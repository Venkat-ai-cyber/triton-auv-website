import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'triton_ocean_deep_secret_2026_marine_auth';

// Security Headers with relaxed CSP for local Three.js WebGL and PDF embeddings
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Request Logging
app.use(morgan('dev'));

// CORS configuration for local React frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session configuration with persistent cookie
app.use(session({
  name: 'triton.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevents client-side script from accessing session cookie
    secure: false, // Set to false for local HTTP development
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days persistent session
    sameSite: 'lax'
  }
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Health check
app.get(['/health', '/api/health'], (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), platform: 'TRITON AUV Backend' });
});

app.listen(PORT, () => {
  console.log(`[TRITON Backend] Server listening on http://localhost:${PORT}`);
});
