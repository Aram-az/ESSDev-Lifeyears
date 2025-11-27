import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout.jsx';

import Landing from './pages/Landing.jsx';
import DashboardTemp from './pages/DashboardTemp.jsx';
import OnboardingTemp from './pages/OnboardingTemp.jsx';
import ProfileTemp from './pages/ProfileTemp.jsx';
import Demo from './pages/Demo.jsx';
import DashboardProto from './pages/DashboardProto.jsx'; // new sprint-2 page

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        {/* Home / Landing – matches what you see on Vercel now */}
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />

        {/* Existing temp routes from Sprint 1 */}
        <Route
          path="/dashboard-temp"
          element={
            <Layout>
              <DashboardTemp />
            </Layout>
          }
        />
        <Route
          path="/onboarding-temp"
          element={
            <Layout>
              <OnboardingTemp />
            </Layout>
          }
        />
        <Route
          path="/profile-temp"
          element={
            <Layout>
              <ProfileTemp />
            </Layout>
          }
        />

        {/* Dev 3 – Dashboard prototype */}
        <Route
          path="/dashboard-proto"
          element={
            <Layout>
              <DashboardProto />
            </Layout>
          }
        />

        {/* Existing mock API demo */}
        <Route
          path="/demo"
          element={
            <Layout>
              <Demo />
            </Layout>
          }
        />
=======
        {/* Normalized routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<OnboardingTemp />} />
        <Route path="/dashboard" element={<DashboardTemp />} />
        <Route path="/profile" element={<ProfileTemp />} />

        {/* Legacy temp routes (kept for backward compatibility) */}
        <Route path="/dashboard-temp" element={<DashboardTemp />} />
        <Route path="/onboarding-temp" element={<OnboardingTemp />} />
        <Route path="/profile-temp" element={<ProfileTemp />} />
        <Route path="/demo" element={<Demo />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
