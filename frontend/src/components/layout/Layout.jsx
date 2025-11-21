import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full bg-gray-50 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
