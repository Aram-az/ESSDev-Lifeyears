import { Link } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";

function DashboardTemp() {
  return (
    <>
      <PageHeader
        title="Dashboard (Temporary)"
        description="This is a temporary dashboard page. Content will be added here."
      />
      <div className="flex flex-wrap gap-4">
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Go to Real Dashboard
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

export default DashboardTemp;
