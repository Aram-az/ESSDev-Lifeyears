import express from 'express';
import cors from 'cors';
import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Setup MSW server
const server = setupServer(...handlers);

// Start MSW server before Express
server.listen({
  onUnhandledRequest: 'bypass',
});

// Express routes (for any non-mocked endpoints or fallback)
app.get('/', (req, res) => {
  res.json({
    message: 'ESSDev Lifeyears Mock API Server',
    status: 'running',
    endpoints: [
      'GET /api/health',
      'GET /api/recommendations',
      'GET /api/recommendations/:id',
      'GET /api/prevention',
      'GET /api/prevention/primary',
      'GET /api/prevention/secondary',
      'GET /api/longevity'
    ]
  });
});

// MSW middleware - intercepts requests and returns mock responses
app.use((req, res, next) => {
  // MSW handles the request interception
  // If MSW doesn't handle it, pass to next middleware
  next();
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📡 MSW is intercepting API requests`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/health`);
  console.log(`  GET /api/recommendations`);
  console.log(`  GET /api/recommendations/:id`);
  console.log(`  GET /api/prevention`);
  console.log(`  GET /api/prevention/primary`);
  console.log(`  GET /api/prevention/secondary`);
  console.log(`  GET /api/longevity`);
});

