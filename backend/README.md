# ESSDev Lifeyears Backend

Mock API server using Express and MSW (Mock Service Worker).

## Quick Start

```bash
npm install
npm run dev
```

Server runs on **http://localhost:3001**

## Available Endpoints

### Mock Data Endpoints

- `GET /mock-user` - Returns mock user profile data
- `GET /mock-recommendations` - Returns mock health screening recommendations

### Root

- `GET /` - Returns server info and available endpoints

## Data Sources

Mock data is loaded from JSON fixtures:
- `data/user.json` - User profile data
- `data/recommendations.json` - Recommendations data

## Tech Stack

- **Express** - HTTP server framework
- **MSW (Mock Service Worker)** - API mocking
- **CORS** - Cross-origin resource sharing
