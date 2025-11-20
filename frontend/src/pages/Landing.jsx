import { useNavigate } from "react-router-dom";
import Demo from "./Demo";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ESSDev Lifeyears
        </h1>
        <button onClick={() => navigate("/demo")} className="btn-primary">
          View Mock API Demo
        </button>
        <p className="text-gray-600 mb-8">
          Welcome to the frontend of the app!
        </p>
      </div>
    </div>
  );
}

export default Landing;
