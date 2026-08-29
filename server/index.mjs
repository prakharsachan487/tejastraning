import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import enquiriesRouter from './routes/enquiries.mjs';

const app = express();
const PORT = process.env.API_PORT || 3001;

// ─── Middleware ─────────────────────────────────────────

// CORS — allow requests from frontend
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON body with size limit
app.use(express.json({ limit: '16kb' }));

// Rate limiting — 10 submissions per IP per 15 minutes
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
});

// ─── Routes ─────────────────────────────────────────────

app.use('/api/enquiries', enquiryLimiter, enquiriesRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ──────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[SERVER] Tejas API running on http://localhost:${PORT}`);
});

process.stdin.resume();