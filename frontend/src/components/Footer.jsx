import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              ESSDev Lifeyears
            </h3>
            <p className="text-gray-300 text-sm">
              Building solutions for a healthier future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
<<<<<<< Updated upstream
                  to="/dashboard-proto"
=======
                  to="/dashboard"
>>>>>>> Stashed changes
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/onboarding"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Onboarding
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: text@placeholder.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-300">
          <p>&copy; {currentYear} ESSDev Lifeyears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
