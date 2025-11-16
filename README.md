# ESSDev-Lifeyears

ESSDev Lifeyears App Development - A React application for health recommendations, prevention strategies, and longevity analysis.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Mock API Implementation (Developer 4)](#mock-api-implementation-developer-4)
- [Code Explanation](#code-explanation)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To run the local development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
ESSDev-Lifeyears/
├── frontend/
│   ├── public/
│   │   └── mockServiceWorker.js    # MSW service worker (auto-generated)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar component
│   │   │   └── Footer.jsx          # Footer component
│   │   ├── pages/
│   │   │   └── Demo.jsx            # Demo page for testing mock API
│   │   ├── mocks/                   # Mock API implementation (Developer 4)
│   │   │   ├── browser.js          # MSW browser setup
│   │   │   ├── handlers.js         # API request handlers
│   │   │   ├── data.js             # Mock data for all endpoints
│   │   │   └── README.md           # Mock API documentation
│   │   ├── utils/
│   │   │   └── unregisterServiceWorker.js  # Utility for cleaning up old service workers
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx                # App entry point with MSW initialization
│   │   └── index.css               # Global styles with Tailwind
│   ├── package.json
│   └── vite.config.js              # Vite configuration
└── README.md                        # This file
```

## Mock API Implementation (Developer 4)

This project includes a complete mock API implementation using **MSW (Mock Service Worker)** that simulates backend endpoints without requiring a real server. This allows frontend development to proceed independently.

### Features Implemented

1. **Generate Recommendations** - Health recommendations with priorities, benefits, and action items
2. **Primary & Secondary Prevention** - Prevention strategies for maintaining health
3. **Longevity** - Comprehensive longevity analysis with risk factors and recommendations

### Available Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/recommendations` - Get all health recommendations
- `GET /api/recommendations/:id` - Get a specific recommendation by ID
- `GET /api/prevention` - Get all prevention data (primary + secondary)
- `GET /api/prevention/primary` - Get primary prevention strategies only
- `GET /api/prevention/secondary` - Get secondary prevention strategies only
- `GET /api/longevity` - Get longevity analysis data

### How to Test the Mock API

1. Start the development server: `npm run dev`
2. Navigate to the app in your browser
3. Click "View Mock API Demo" button on the home page
4. Use the buttons on the Demo page to test each endpoint
5. View the responses displayed on the page

## Code Explanation

### 1. `src/main.jsx` - Application Entry Point

This file initializes the React application and sets up MSW (Mock Service Worker) for development.

**Key Features:**
- **MSW Initialization**: Automatically starts the mock service worker in development mode
- **Service Worker Cleanup**: Unregisters old service workers before starting new ones to prevent conflicts
- **Timeout Protection**: Uses a 3-second timeout to prevent the app from hanging if MSW fails
- **Error Handling**: Gracefully handles MSW initialization failures and still renders the app

**Code Flow:**
```javascript
1. Check if in development mode
2. Unregister any existing service workers
3. Import and start MSW worker
4. Wait for MSW initialization (with timeout)
5. Render the React app
```

### 2. `src/mocks/browser.js` - MSW Browser Setup

Configures MSW to work in the browser environment using service workers.

**What it does:**
- Imports `setupWorker` from MSW's browser package
- Imports the request handlers
- Exports a configured worker instance

**Why it's needed:**
MSW requires different setup for browser vs. Node.js environments. This file uses the browser-specific setup that registers a service worker to intercept network requests.

### 3. `src/mocks/handlers.js` - API Request Handlers

Defines all the mock API endpoints and their responses.

**Structure:**
Each handler uses MSW's `http` helper to define:
- HTTP method (GET, POST, etc.)
- URL pattern (with optional parameters)
- Response function that returns mock data

**Example Handler:**
```javascript
http.get('/api/recommendations', () => {
  return HttpResponse.json({
    success: true,
    data: mockRecommendations,
    count: mockRecommendations.length
  });
})
```

**Handler Features:**
- **Path Parameters**: Uses `:id` syntax for dynamic routes (e.g., `/api/recommendations/:id`)
- **Error Handling**: Returns 404 status for non-existent resources
- **Consistent Response Format**: All responses include `success` flag and structured data

### 4. `src/mocks/data.js` - Mock Data

Contains all the mock data used by the API handlers.

**Data Structures:**

1. **mockRecommendations** (Array)
   - Health recommendations with:
     - `id`, `title`, `category`, `priority`
     - `description`, `benefits[]`, `actionItems[]`

2. **mockPreventionData** (Object)
   - `primary`: Array of primary prevention strategies
   - `secondary`: Array of secondary prevention interventions
   - Each includes effectiveness metrics and target conditions

3. **mockLongevityData** (Object)
   - `currentAge`, `projectedLifespan`, `healthScore`
   - `riskFactors[]`: Factors that reduce lifespan
   - `protectiveFactors[]`: Factors that increase lifespan
   - `recommendations[]`: Actions to improve longevity
   - `milestones[]`: Life stage milestones

**Why Separate Data File:**
- Keeps handlers clean and focused on routing logic
- Makes it easy to update mock data without touching handler code
- Allows data to be reused across multiple handlers if needed

### 5. `src/pages/Demo.jsx` - Demo Page Component

A comprehensive demo page that tests all mock API endpoints.

**Features:**
- **Interactive Testing**: Buttons to fetch data from each endpoint
- **Real-time Display**: Shows fetched data in organized cards
- **Error Handling**: Displays user-friendly error messages
- **Loading States**: Shows loading indicators during API calls
- **Auto Health Check**: Automatically checks API health on page load

**Component Structure:**
```javascript
- State management for each endpoint (data, loading, error)
- Fetch functions for each API endpoint
- useEffect hook for auto health check
- Conditional rendering based on state
- Error display with troubleshooting tips
```

**UI Sections:**
1. Health Check - Verifies API is working
2. Recommendations - Displays health recommendations
3. Prevention - Shows primary and secondary prevention data
4. Longevity - Comprehensive longevity analysis
5. API Endpoints List - Reference of all available endpoints

### 6. `src/App.jsx` - Main App Component

The root component that manages page navigation and layout.

**Features:**
- **Simple Routing**: Uses React state for page navigation (home/demo)
- **Layout Structure**: Includes Navbar, main content area, and Footer
- **Navigation**: Button to switch between home and demo pages

**Why Simple State Instead of Router:**
- For Week 1 prototype, simple state-based navigation is sufficient
- Can be upgraded to React Router later if needed
- Keeps dependencies minimal

### 7. `public/mockServiceWorker.js` - Service Worker Script

Auto-generated by MSW, this file runs in the browser as a service worker.

**What it does:**
- Intercepts network requests matching the handler patterns
- Communicates with the main thread to get mock responses
- Returns mock data instead of making real network requests

**Important Notes:**
- This file is auto-generated - don't edit it manually
- Regenerate with `npx msw init public/` if MSW version changes
- Only active in development mode

### 8. `src/utils/unregisterServiceWorker.js` - Utility Function

Helper function to clean up old service workers (currently unused but available).

**Purpose:**
- Prevents conflicts when service worker versions change
- Ensures fresh service worker registration on each app start

## How MSW Works

1. **Service Worker Registration**: When the app loads, MSW registers a service worker
2. **Request Interception**: The service worker intercepts fetch requests matching handler patterns
3. **Handler Matching**: MSW matches the request URL/method to the appropriate handler
4. **Mock Response**: Handler returns mock data wrapped in an HTTP response
5. **Transparent to App**: Your React code uses `fetch()` normally - MSW handles the rest

**Benefits:**
- No backend server needed during development
- Realistic network behavior (async, delays, errors)
- Easy to test different scenarios
- Works with any HTTP client (fetch, axios, etc.)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server (replaces webpack/babel)
- **Tailwind CSS** - Utility-first CSS framework
- **MSW (Mock Service Worker)** - API mocking library
- **Node.js** - JavaScript runtime

## Build

To create a production build:
```bash
npm run build
```

Built files will be in the `frontend/dist` directory.

**Note:** MSW is automatically disabled in production builds - only works in development mode.

## Deployment

### Vercel URL
https://ess-dev-lifeyears.vercel.app

### Deployment Notes
- MSW mock API only works in development
- Production builds will need real backend API endpoints
- Static files are served from `frontend/dist` after build

## Troubleshooting

### "Failed to fetch" Errors

1. **Check Browser Console** (F12):
   - Look for "✅ MSW initialized successfully"
   - Check for service worker registration errors

2. **Unregister Old Service Workers**:
   - DevTools → Application → Service Workers
   - Click "Unregister" for any old workers
   - Hard refresh (Ctrl+Shift+R)

3. **Verify MSW is Running**:
   - Check console for MSW initialization messages
   - Ensure you're in development mode (`npm run dev`)

4. **Regenerate Service Worker**:
   ```bash
   cd frontend
   npx msw init public/ --save
   ```

### Service Worker Version Mismatch

If you see version mismatch warnings:
```bash
cd frontend
npx msw init public/ --save
```
Then hard refresh your browser.

## Developer 4 Deliverables Summary

✅ **Mock API Implementation**
- MSW setup and configuration
- Service worker registration
- Request interception

✅ **Three Main Features**
- Generate Recommendations endpoint
- Primary & Secondary Prevention endpoints
- Longevity analysis endpoint

✅ **Demo Page**
- Interactive testing interface
- Error handling and loading states
- Comprehensive data display

✅ **Documentation**
- Code comments and explanations
- README files
- Troubleshooting guides

## Next Steps

For future development:
1. Replace mock API with real backend endpoints
2. Add React Router for proper navigation
3. Implement authentication if needed
4. Add more comprehensive error handling
5. Implement data caching strategies
6. Add unit tests for components and API calls

## Additional Resources

- [MSW Documentation](https://mswjs.io/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
