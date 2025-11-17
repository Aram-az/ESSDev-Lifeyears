# ESSDev-Lifeyears

ESSDev Lifeyears App Development - A React application for health recommendations, prevention strategies, and longevity analysis.

## Quick Start

### Prerequisites
- Node.js installed (v18 or higher)
- npm installed

### Running the Application

The application consists of two parts: **Backend Server** and **Frontend App**. You need to run both.

#### 1. Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm install  # Only needed the first time
npm run dev
```

The backend server will start on **http://localhost:3001**

You should see:
```
🚀 Mock API Server running on http://localhost:3001
📡 MSW is active for fetch/undici requests
🌐 Express routes are also available
```

#### 2. Start the Frontend App

Open a **new terminal** (keep the backend running) and run:

```bash
cd frontend
npm install  # Only needed the first time
npm run dev
```

The frontend will start on **http://localhost:5173** (or another port if 5173 is busy)

#### 3. Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API**: `http://localhost:3001`
- **Demo Page**: Click "View Mock API Demo" button on the home page

## Installation (First Time Only)

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Development

### Backend Server
```bash
cd backend
npm run dev
```
- Runs on port **3001**
- Provides mock API endpoints
- Uses Express + MSW

### Frontend App
```bash
cd frontend
npm run dev
```
- Runs on port **5173** (or next available)
- React app with Vite
- Connects to backend at `http://localhost:3001`

## Available API Endpoints

All endpoints are available at `http://localhost:3001`:

- `GET /api/health` - Health check
- `GET /api/recommendations` - Get all recommendations
- `GET /api/recommendations/:id` - Get specific recommendation
- `GET /api/prevention` - Get all prevention data
- `GET /api/prevention/primary` - Get primary prevention only
- `GET /api/prevention/secondary` - Get secondary prevention only
- `GET /api/longevity` - Get longevity analysis

## Testing the API

### Using the Demo Page
1. Start both backend and frontend
2. Open `http://localhost:5173`
3. Click "View Mock API Demo"
4. Use the buttons to test each endpoint

### Using curl
```bash
# Health check
curl http://localhost:3001/api/health

# Get recommendations
curl http://localhost:3001/api/recommendations

# Get longevity data
curl http://localhost:3001/api/longevity
```

### Using Browser
Open these URLs directly:
- `http://localhost:3001/api/health`
- `http://localhost:3001/api/recommendations`
- `http://localhost:3001/api/longevity`

## Project Structure

```
ESSDev-Lifeyears/
├── backend/                 # Backend MSW server
│   ├── src/
│   │   ├── handlers.js     # API route handlers
│   │   └── data.js         # Mock data
│   ├── server.js           # Express server
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   │   └── Demo.jsx    # API demo page
│   │   ├── App.jsx         # Main app
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md               # This file
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Make sure you're in the `backend` directory
- Run `npm install` if you haven't already

### Frontend can't connect to backend
- Make sure backend is running on port 3001
- Check browser console for CORS errors
- Verify the API URL in `Demo.jsx` is `http://localhost:3001`

### "Failed to fetch" errors
- Ensure backend server is running
- Check that backend is accessible at `http://localhost:3001`
- Open browser DevTools (F12) to see detailed error messages

### Port already in use
- Backend: Change port in `backend/server.js` (default: 3001)
- Frontend: Vite will automatically use the next available port

## Build

### Frontend Production Build
```bash
cd frontend
npm run build
```
Built files will be in `frontend/dist` directory.

### Backend
The backend server runs in development mode. For production, you would typically:
- Use a process manager like PM2
- Set up environment variables
- Configure proper logging and monitoring

## Tech Stack

### Backend
- **Express** - HTTP server framework
- **MSW (Mock Service Worker)** - API mocking
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Deployment

### Vercel URL (Frontend) test
https://ess-dev-lifeyears.vercel.app

**Note:** The deployed frontend will need the backend API URL configured via environment variables.

## Environment Variables

### Frontend
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:3001
```

For production, set this to your production API URL.

## Next Steps

1. Replace mock API with real backend endpoints
2. Add authentication if needed
3. Implement data persistence
4. Add more comprehensive error handling
5. Set up testing (unit tests, integration tests)

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [MSW Documentation](https://mswjs.io/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
