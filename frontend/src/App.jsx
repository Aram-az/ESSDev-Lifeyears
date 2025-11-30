import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";

import Landing from "./pages/Landing.jsx";
import DashboardTemp from "./pages/DashboardTemp.jsx";
import OnboardingTemp from "./pages/OnboardingTemp.jsx";
import ProfileTemp from "./pages/ProfileTemp.jsx";
import Profile from "./pages/Profile.jsx";
import Demo from "./pages/Demo.jsx";
import DashboardProto from "./pages/DashboardProto.jsx"; // new sprint-2 page
import StyleguideTemp from "./pages/StyleguideTemp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Normalized routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/onboarding"
          element={
            <Layout>
              <OnboardingTemp />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardProto />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Legacy temp routes (kept for backward compatibility) */}
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

        {/* Dashboard prototype route */}
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

        {/* Design system playground */}
        <Route
          path="/styleguide-temp"
          element={
            <Layout>
              <StyleguideTemp />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
