import express from 'express';
import cors from 'cors';
import { setupServer } from 'msw/node';
import { handlers } from './src/handlers.js';
import { mockUser, mockRecommendationsFromJson } from './src/data.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Setup MSW server for Node.js (intercepts fetch/undici requests)
const server = setupServer(...handlers);

// Start MSW server
server.listen({
  onUnhandledRequest: 'bypass',
});

// Express routes that use the same mock data
app.get('/', (req, res) => {
  res.json({
    message: 'ESSDev Lifeyears Mock API Server',
    status: 'running',
    server: 'Express + MSW',
    endpoints: [
      'GET /mock-user',
      'GET /mock-recommendations'
    ]
  });
});

// Get mock user data
app.get('/mock-user', (req, res) => {
  if (!mockUser) {
    return res.status(404).json({
      success: false,
      error: 'User data not found'
    });
  }
  res.json({
    success: true,
    data: mockUser
  });
});

// Get mock recommendations data
app.get('/mock-recommendations', (req, res) => {
  res.json({
    success: true,
    data: mockRecommendationsFromJson || [],
    count: (mockRecommendationsFromJson || []).length
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📡 MSW is active for fetch/undici requests`);
  console.log(`🌐 Express routes are also available`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /mock-user`);
  console.log(`  GET /mock-recommendations`);
});
