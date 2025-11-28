import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
        ESSDev Lifeyears
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
        Welcome to the frontend of the app!
      </p>
      <button
        onClick={() => navigate("/demo")}
        className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
      >
        View Mock API Demo
      </button>
    </div>
  );
}

export default Landing;
