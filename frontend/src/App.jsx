import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";

import Landing from "./pages/Landing.jsx";
import DashboardProto from "./pages/DashboardProto.jsx";
import OnboardingTemp from "./pages/OnboardingTemp.jsx";
import Profile from "./pages/Profile.jsx";
import Demo from "./pages/Demo.jsx";
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