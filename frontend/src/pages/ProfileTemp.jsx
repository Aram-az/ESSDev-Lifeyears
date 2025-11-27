import { Link } from "react-router-dom";

function ProfileTemp() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
        Profile (Temporary)
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6">
        This is a temporary profile page. Content will be added here.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/profile"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Go to Normalized Profile Route
        </Link>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default ProfileTemp;
