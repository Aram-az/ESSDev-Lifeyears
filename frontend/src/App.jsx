import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Demo from "./pages/Demo";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 min-h-[calc(100vh-200px)]">
        {currentPage === "home" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                ESSDev Lifeyears
              </h1>
              <p className="text-gray-600 mb-8">Welcome to the frontend of the app!</p>
              <button
                onClick={() => setCurrentPage("demo")}
                className="btn-primary"
              >
                View Mock API Demo
              </button>
            </div>
          </div>
        ) : (
          <Demo />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
