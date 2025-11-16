# Backend Mock API Server

Backend server using Express and MSW (Mock Service Worker) to provide the same mock API endpoints as the browser-based MSW implementation.

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Available Endpoints

All endpoints return the same data as the browser-based MSW implementation:

- `GET /api/health` - Health check
- `GET /api/recommendations` - Get all recommendations
- `GET /api/recommendations/:id` - Get specific recommendation
- `GET /api/prevention` - Get all prevention data
- `GET /api/prevention/primary` - Get primary prevention only
- `GET /api/prevention/secondary` - Get secondary prevention only
- `GET /api/longevity` - Get longevity analysis

## How It Works

This server uses:
1. **Express** - HTTP server framework
2. **MSW (setupServer)** - Intercepts fetch/undici requests at the network level
3. **Same handlers and data** - Identical to browser-based implementation

The server provides two ways to access the mock API:
- **Express routes** - Direct Express endpoints (works with any HTTP client)
- **MSW interception** - Intercepts fetch/undici requests (useful for testing)

## Testing

You can test the endpoints using:

```bash
# Health check
curl http://localhost:3001/api/health

# Get recommendations
curl http://localhost:3001/api/recommendations

# Get longevity data
curl http://localhost:3001/api/longevity
```

Or use the frontend app and point it to `http://localhost:3001` instead of the browser-based MSW.

## Configuration

Change the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm run dev
```

