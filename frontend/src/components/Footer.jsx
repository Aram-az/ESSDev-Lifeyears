function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white">
              ESSDev Lifeyears
            </h3>
            <p className="text-gray-300 text-xs">
              Building solutions for a healthier future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white">
              Quick Links
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white">Contact</h3>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>Email: text@placeholder.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-4 pt-4 text-center text-xs text-gray-300">
          <p>&copy; {currentYear} ESSDev Lifeyears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
