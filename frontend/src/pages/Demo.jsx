import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Demo() {
  const [recommendations, setRecommendations] = useState(null);
  const [prevention, setPrevention] = useState(null);
  const [longevity, setLongevity] = useState(null);
  const [healthCheck, setHealthCheck] = useState(null);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  // Health check endpoint with timeout
  const checkHealth = async () => {
    setLoading((prev) => ({ ...prev, health: true }));
    setError((prev) => ({ ...prev, health: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${API_BASE_URL}/api/health`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHealthCheck(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError((prev) => ({
          ...prev,
          health: "Request timed out. Is the backend server running?",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          health: err.message || "Failed to fetch",
        }));
      }
      console.error("Health check error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, health: false }));
    }
  };

  // Fetch recommendations with timeout
  const fetchRecommendations = async () => {
    setLoading((prev) => ({ ...prev, recommendations: true }));
    setError((prev) => ({ ...prev, recommendations: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError((prev) => ({ ...prev, recommendations: "Request timed out" }));
      } else {
        setError((prev) => ({
          ...prev,
          recommendations: err.message || "Failed to fetch",
        }));
      }
      console.error("Recommendations fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, recommendations: false }));
    }
  };

  // Fetch prevention data with timeout
  const fetchPrevention = async () => {
    setLoading((prev) => ({ ...prev, prevention: true }));
    setError((prev) => ({ ...prev, prevention: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/api/prevention`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrevention(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError((prev) => ({ ...prev, prevention: "Request timed out" }));
      } else {
        setError((prev) => ({
          ...prev,
          prevention: err.message || "Failed to fetch",
        }));
      }
      console.error("Prevention fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, prevention: false }));
    }
  };

  // Fetch longevity data with timeout
  const fetchLongevity = async () => {
    setLoading((prev) => ({ ...prev, longevity: true }));
    setError((prev) => ({ ...prev, longevity: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/api/longevity`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLongevity(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError((prev) => ({ ...prev, longevity: "Request timed out" }));
      } else {
        setError((prev) => ({
          ...prev,
          longevity: err.message || "Failed to fetch",
        }));
      }
      console.error("Longevity fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, longevity: false }));
    }
  };

  // Auto-check health on mount (optional - commented out to prevent hanging)
  // Uncomment if you want auto health check on page load
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     checkHealth();
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Mock API Demo Page
        </h1>
        <p className="text-gray-600 mb-4">
          This page demonstrates the mock API endpoints for Developer 4's tasks.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          API Server:{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">{API_BASE_URL}</code>
        </p>
        {(error.health ||
          error.recommendations ||
          error.prevention ||
          error.longevity) && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="font-semibold mb-2">
              ⚠️ Troubleshooting "Failed to fetch" errors:
            </p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>
                Ensure the backend server is running:{" "}
                <code>cd backend && npm run dev</code>
              </li>
              <li>Check that the server is accessible at {API_BASE_URL}</li>
              <li>
                Open browser DevTools (F12) and check the Console tab for errors
              </li>
              <li>Verify CORS is enabled on the backend server</li>
            </ul>
          </div>
        )}
      </div>

      {/* Health Check Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Health Check</h2>
          <button
            onClick={checkHealth}
            disabled={loading.health}
            className="btn-primary disabled:opacity-50"
          >
            {loading.health ? "Checking..." : "Check API"}
          </button>
        </div>
        {error.health && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.health}
          </div>
        )}
        {healthCheck && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <p className="font-semibold">✓ {healthCheck.message}</p>
            <p className="text-sm mt-1">Timestamp: {healthCheck.timestamp}</p>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Generate Recommendations
          </h2>
          <button
            onClick={fetchRecommendations}
            disabled={loading.recommendations}
            className="btn-primary disabled:opacity-50"
          >
            {loading.recommendations ? "Loading..." : "Fetch Recommendations"}
          </button>
        </div>
        {error.recommendations && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.recommendations}
          </div>
        )}
        {recommendations && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Found {recommendations.count} recommendations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.data.map((rec) => (
                <div key={rec.id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rec.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {rec.description}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Benefits:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {rec.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prevention Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Primary & Secondary Prevention
          </h2>
          <button
            onClick={fetchPrevention}
            disabled={loading.prevention}
            className="btn-primary disabled:opacity-50"
          >
            {loading.prevention ? "Loading..." : "Fetch Prevention Data"}
          </button>
        </div>
        {error.prevention && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.prevention}
          </div>
        )}
        {prevention && (
          <div className="space-y-6">
            {/* Primary Prevention */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Primary Prevention ({prevention.data.primary.length} items)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevention.data.primary.map((item) => (
                  <div key={item.id} className="card">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <div className="mt-3 text-xs">
                      <p className="text-gray-700">
                        <span className="font-semibold">Frequency:</span>{" "}
                        {item.frequency}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Effectiveness:</span>{" "}
                        {item.effectiveness}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Prevention */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Secondary Prevention ({prevention.data.secondary.length} items)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevention.data.secondary.map((item) => (
                  <div key={item.id} className="card">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <div className="mt-3 text-xs">
                      <p className="text-gray-700">
                        <span className="font-semibold">Target:</span>{" "}
                        {item.targetCondition}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Outcomes:</span>{" "}
                        {item.outcomes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Longevity Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Longevity</h2>
          <button
            onClick={fetchLongevity}
            disabled={loading.longevity}
            className="btn-primary disabled:opacity-50"
          >
            {loading.longevity ? "Loading..." : "Fetch Longevity Data"}
          </button>
        </div>
        {error.longevity && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.longevity}
          </div>
        )}
        {longevity && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <p className="text-sm text-gray-600">Current Age</p>
                <p className="text-2xl font-bold text-gray-900">
                  {longevity.data.currentAge}
                </p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-gray-600">Projected Lifespan</p>
                <p className="text-2xl font-bold text-blue-600">
                  {longevity.data.projectedLifespan}
                </p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {longevity.data.healthScore}/100
                </p>
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Risk Factors
              </h3>
              <div className="space-y-2">
                {longevity.data.riskFactors.map((factor) => (
                  <div
                    key={factor.id}
                    className="bg-red-50 border border-red-200 rounded p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-red-900">
                        {factor.factor}
                      </p>
                      <span className="text-sm text-red-700">
                        Impact: {factor.impact} years
                      </span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Protective Factors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Protective Factors
              </h3>
              <div className="space-y-2">
                {longevity.data.protectiveFactors.map((factor) => (
                  <div
                    key={factor.id}
                    className="bg-green-50 border border-green-200 rounded p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-green-900">
                        {factor.factor}
                      </p>
                      <span className="text-sm text-green-700">
                        Impact: +{factor.impact} years
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Longevity Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {longevity.data.recommendations.map((rec) => (
                  <div key={rec.id} className="card">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {rec.action}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {rec.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600">
                        Potential Gain: {rec.potentialGain}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          rec.difficulty === "low"
                            ? "bg-green-100 text-green-800"
                            : rec.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rec.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Endpoints Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Available API Endpoints
        </h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/health
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/recommendations
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/recommendations/:id
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/prevention
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/prevention/primary
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span>{" "}
            /api/prevention/secondary
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /api/longevity
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
