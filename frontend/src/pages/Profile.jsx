import { Link } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";

function Profile() {
  return (
    <div className="text-center">
      <PageHeader
        title="Profile"
        description="Manage your profile information."
      />
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/onboarding"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Go to Onboarding
        </Link>
      </div>
    </div>
  );
}

export default Profile;
