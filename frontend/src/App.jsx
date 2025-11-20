import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import DashboardTemp from "./pages/DashboardTemp";
import OnboardingTemp from "./pages/OnboardingTemp";
import ProfileTemp from "./pages/ProfileTemp";
import Demo from "./pages/Demo";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard-temp" element={<DashboardTemp />} />
        <Route path="/onboarding-temp" element={<OnboardingTemp />} />
        <Route path="/profile-temp" element={<ProfileTemp />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Layout>
  );
}

export default App;
