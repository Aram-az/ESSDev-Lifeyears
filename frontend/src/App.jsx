import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ESSDev Lifeyears
            </h1>
            <p className="text-gray-600">Welcome to the frontend of the app!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
