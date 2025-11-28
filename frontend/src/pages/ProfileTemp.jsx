import { Link } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";

function ProfileTemp() {
  return (
    <div className="text-center">
      <PageHeader
        title="Profile (Temporary)"
        description="This is a temporary profile page. Content will be added here."
      />
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/profile"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Go to Real Profile Page
        </Link>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ProfileTemp;
