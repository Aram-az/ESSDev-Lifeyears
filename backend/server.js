import express from 'express';
import cors from 'cors';
import { setupServer } from 'msw/node';
import { handlers } from './src/handlers.js';
import { mockRecommendations, mockPreventionData, mockLongevityData } from './src/data.js';

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mock API server is running',
    timestamp: new Date().toISOString(),
    server: 'MSW Backend Server'
  });
});

// Get all recommendations
app.get('/api/recommendations', (req, res) => {
  res.json({
    success: true,
    data: mockRecommendations,
    count: mockRecommendations.length
  });
});

// Get single recommendation by ID
app.get('/api/recommendations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recommendation = mockRecommendations.find(rec => rec.id === id);
  
  if (!recommendation) {
    return res.status(404).json({
      success: false,
      error: 'Recommendation not found'
    });
  }
  
  res.json({
    success: true,
    data: recommendation
  });
});

// Get all prevention data
app.get('/api/prevention', (req, res) => {
  res.json({
    success: true,
    data: mockPreventionData
  });
});

// Get primary prevention
app.get('/api/prevention/primary', (req, res) => {
  res.json({
    success: true,
    data: mockPreventionData.primary,
    count: mockPreventionData.primary.length
  });
});

// Get secondary prevention
app.get('/api/prevention/secondary', (req, res) => {
  res.json({
    success: true,
    data: mockPreventionData.secondary,
    count: mockPreventionData.secondary.length
  });
});

// Get longevity data
app.get('/api/longevity', (req, res) => {
  res.json({
    success: true,
    data: mockLongevityData
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📡 MSW is active for fetch/undici requests`);
  console.log(`🌐 Express routes are also available`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/health`);
  console.log(`  GET /api/recommendations`);
  console.log(`  GET /api/recommendations/:id`);
  console.log(`  GET /api/prevention`);
  console.log(`  GET /api/prevention/primary`);
  console.log(`  GET /api/prevention/secondary`);
  console.log(`  GET /api/longevity`);
});
