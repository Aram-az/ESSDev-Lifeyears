import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';               // home/landing
import Dashboard from './pages/Dashboard.jsx'; // adjust path if yours is different
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard-proto" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);