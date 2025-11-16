# Mock API Documentation

This directory contains the Mock Service Worker (MSW) setup for Developer 4's tasks. The mock API provides endpoints for testing the three main features: **Generate Recommendations**, **Primary and Secondary Prevention**, and **Longevity**.

## Quick Start

The mock API is automatically initialized when you run the development server:

```bash
npm run dev
```

The mock service worker will intercept API calls in the browser and return mock data. No additional setup is required!

## How to View the Mock Endpoints

1. **Start the development server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open the Demo Page:**
   - Navigate to `http://localhost:5173`
   - Click the "View Mock API Demo" button
   - Or directly access the demo page in the app

3. **Test the endpoints:**
   - Use the buttons on the Demo page to fetch data from each endpoint
   - All API calls are intercepted by MSW and return mock data

## Available API Endpoints

### Health Check
```
GET /api/health
```
Returns a simple health check response to verify the mock API is running.

**Response:**
```json
{
  "success": true,
  "message": "Mock API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Recommendations
```
GET /api/recommendations
```
Returns all health recommendations.

```
GET /api/recommendations/:id
```
Returns a specific recommendation by ID.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Regular Cardiovascular Exercise",
      "category": "Exercise",
      "priority": "high",
      "description": "...",
      "benefits": [...],
      "actionItems": [...]
    }
  ],
  "count": 4
}
```

### Prevention Data
```
GET /api/prevention
```
Returns both primary and secondary prevention data.

```
GET /api/prevention/primary
```
Returns only primary prevention strategies.

```
GET /api/prevention/secondary
```
Returns only secondary prevention strategies.

**Response:**
```json
{
  "success": true,
  "data": {
    "primary": [...],
    "secondary": [...]
  }
}
```

### Longevity Data
```
GET /api/longevity
```
Returns comprehensive longevity analysis including:
- Current age and projected lifespan
- Health score
- Risk factors
- Protective factors
- Recommendations for extending lifespan
- Life milestones

**Response:**
```json
{
  "success": true,
  "data": {
    "currentAge": 35,
    "projectedLifespan": 82,
    "healthScore": 75,
    "riskFactors": [...],
    "protectiveFactors": [...],
    "recommendations": [...],
    "milestones": [...]
  }
}
```

## File Structure

```
src/mocks/
├── browser.js       # MSW browser setup
├── handlers.js      # API request handlers
├── data.js          # Mock data for all endpoints
└── README.md        # This file
```

## Testing the API

You can test the endpoints directly in the browser console or using the Demo page:

```javascript
// Example: Fetch recommendations
fetch('/api/recommendations')
  .then(res => res.json())
  .then(data => console.log(data));

// Example: Fetch longevity data
fetch('/api/longevity')
  .then(res => res.json())
  .then(data => console.log(data));
```

## How It Works

1. **MSW (Mock Service Worker)** runs in the browser as a service worker
2. It intercepts all API requests matching the defined handlers
3. Returns mock data from `data.js` instead of making real network requests
4. Works seamlessly in development without a backend server

## Notes

- The mock API only works in **development mode**
- In production builds, MSW is automatically disabled
- All endpoints return JSON responses
- Error handling is included (e.g., 404 for non-existent recommendations)

## Developer 4 Deliverables

✅ Mock API implemented using MSW  
✅ Test endpoints created for all three features:
   - Generate Recommendations
   - Primary and Secondary Prevention  
   - Longevity
✅ Demo page created to test API calls  
✅ Documentation provided (this README)

