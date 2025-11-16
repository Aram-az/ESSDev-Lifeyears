import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Initialize MSW (Mock Service Worker) for development
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  // Unregister any old service workers first
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        if (registration.active?.scriptURL.includes('mockServiceWorker')) {
          await registration.unregister();
          console.log('Unregistered old service worker');
        }
      }
    } catch (e) {
      console.warn('Could not unregister service workers:', e);
    }
  }

  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('✅ MSW initialized successfully');
    console.log('Mock API endpoints are ready:');
    console.log('  - GET /api/health');
    console.log('  - GET /api/recommendations');
    console.log('  - GET /api/prevention');
    console.log('  - GET /api/longevity');
    return true;
  } catch (error) {
    console.error('⚠️ MSW initialization failed:', error);
    console.warn('Continuing without mocks - API calls will fail');
    return false;
  }
}

// Render the app immediately, initialize MSW in background
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize MSW in the background (non-blocking)
enableMocking().catch(err => {
  console.warn('MSW initialization failed, app will continue without mocks:', err);
});
