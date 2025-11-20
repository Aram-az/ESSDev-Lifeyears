import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import DashboardTemp from "./pages/DashboardTemp";
import OnboardingTemp from "./pages/OnboardingTemp";
import ProfileTemp from "./pages/ProfileTemp";
import Demo from "./pages/Demo";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard-temp" element={<DashboardTemp />} />
          <Route path="/onboarding-temp" element={<OnboardingTemp />} />
          <Route path="/profile-temp" element={<ProfileTemp />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
