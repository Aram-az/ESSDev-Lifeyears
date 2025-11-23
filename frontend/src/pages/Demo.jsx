import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Demo() {
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [localUsers, setLocalUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  // Load locally stored user data on component mount
  useEffect(() => {
    const stored = localStorage.getItem("onboardingData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Handle both old format (single object) and new format (array)
        const usersArray = Array.isArray(parsed) ? parsed : [parsed];
        setLocalUsers(usersArray);
        setCurrentUserIndex(0);
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    }
  }, []);

  // Reload users when localStorage changes (e.g., after clearing)
  const reloadUsers = () => {
    const stored = localStorage.getItem("onboardingData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const usersArray = Array.isArray(parsed) ? parsed : [parsed];
        setLocalUsers(usersArray);
        if (currentUserIndex >= usersArray.length) {
          setCurrentUserIndex(Math.max(0, usersArray.length - 1));
        }
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    } else {
      setLocalUsers([]);
      setCurrentUserIndex(0);
    }
  };

  const handlePreviousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  const handleNextUser = () => {
    if (currentUserIndex < localUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const handleClearCurrentUser = () => {
    if (localUsers.length === 0) return;
    
    const updatedUsers = localUsers.filter((_, index) => index !== currentUserIndex);
    
    if (updatedUsers.length === 0) {
      localStorage.removeItem("onboardingData");
      setLocalUsers([]);
      setCurrentUserIndex(0);
    } else {
      localStorage.setItem("onboardingData", JSON.stringify(updatedUsers));
      setLocalUsers(updatedUsers);
      if (currentUserIndex >= updatedUsers.length) {
        setCurrentUserIndex(updatedUsers.length - 1);
      }
    }
  };

  const handleClearAllUsers = () => {
    localStorage.removeItem("onboardingData");
    setLocalUsers([]);
    setCurrentUserIndex(0);
  };

  // Fetch mock user data
  const fetchUser = async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    setError((prev) => ({ ...prev, user: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/mock-user`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      if (err.name === "AbortError") {
        setError((prev) => ({ ...prev, user: "Request timed out" }));
      } else {
        setError((prev) => ({
          ...prev,
          user: err.message || "Failed to fetch",
        }));
      }
      console.error("User fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  // Fetch mock recommendations data
  const fetchRecommendations = async () => {
    setLoading((prev) => ({ ...prev, recommendations: true }));
    setError((prev) => ({ ...prev, recommendations: null }));
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/mock-recommendations`, {
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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Mock API Demo Page
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          API Server:{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">{API_BASE_URL}</code>
        </p>
        {(error.user || error.recommendations) && (
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

      {/* Locally Stored User Section */}
      {localUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Locally Stored User Data
              </h2>
              <span className="text-xs text-gray-500 bg-blue-50 px-3 py-1 rounded">
                {currentUserIndex + 1} of {localUsers.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 bg-blue-50 px-3 py-1 rounded">
                From localStorage
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousUser}
                disabled={currentUserIndex === 0}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentUserIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ← Previous
              </button>
              <button
                onClick={handleNextUser}
                disabled={currentUserIndex === localUsers.length - 1}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentUserIndex === localUsers.length - 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Next →
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCurrentUser}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 text-sm"
              >
                Clear Current
              </button>
              <button
                onClick={handleClearAllUsers}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* User Data Display */}
          {localUsers[currentUserIndex] && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Name</p>
                  <p className="text-gray-900">{localUsers[currentUserIndex].name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <p className="text-gray-900">{localUsers[currentUserIndex].email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Phone</p>
                  <p className="text-gray-900">{localUsers[currentUserIndex].phoneNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Date of Birth</p>
                  <p className="text-gray-900">{localUsers[currentUserIndex].dateOfBirth || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Age</p>
                  <p className="text-gray-900">{localUsers[currentUserIndex].age || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Sex</p>
                  <p className="text-gray-900 capitalize">{localUsers[currentUserIndex].sex || "N/A"}</p>
                </div>
              </div>
              {localUsers[currentUserIndex].existingHealthConditions && localUsers[currentUserIndex].existingHealthConditions.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Existing Health Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {localUsers[currentUserIndex].existingHealthConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {localUsers[currentUserIndex].lifestyle && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Lifestyle Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {localUsers[currentUserIndex].lifestyle.smokingStatus && (
                      <div>
                        <span className="font-semibold text-gray-700">Smoking:</span>{" "}
                        <span className="text-gray-900 capitalize">{localUsers[currentUserIndex].lifestyle.smokingStatus}</span>
                      </div>
                    )}
                    {localUsers[currentUserIndex].lifestyle.alcoholConsumption && (
                      <div>
                        <span className="font-semibold text-gray-700">Alcohol:</span>{" "}
                        <span className="text-gray-900 capitalize">{localUsers[currentUserIndex].lifestyle.alcoholConsumption}</span>
                      </div>
                    )}
                    {localUsers[currentUserIndex].lifestyle.exerciseFrequency && (
                      <div>
                        <span className="font-semibold text-gray-700">Exercise:</span>{" "}
                        <span className="text-gray-900">{localUsers[currentUserIndex].lifestyle.exerciseFrequency}</span>
                      </div>
                    )}
                    {localUsers[currentUserIndex].lifestyle.dietType && (
                      <div>
                        <span className="font-semibold text-gray-700">Diet:</span>{" "}
                        <span className="text-gray-900 capitalize">{localUsers[currentUserIndex].lifestyle.dietType}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {localUsers[currentUserIndex].submittedAt && (
                <div className="mt-4 text-xs text-gray-500">
                  Submitted: {new Date(localUsers[currentUserIndex].submittedAt).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mock User Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mock User Data
          </h2>
          <button
            onClick={fetchUser}
            disabled={loading.user}
            className="btn-primary disabled:opacity-50"
          >
            {loading.user ? "Loading..." : "Fetch User Data"}
          </button>
        </div>
        {error.user && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error.user}
          </div>
        )}
        {userData && (
          <div className="space-y-4">
            {userData.success && userData.data ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Name</p>
                    <p className="text-gray-900">{userData.data.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <p className="text-gray-900">{userData.data.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Phone</p>
                    <p className="text-gray-900">{userData.data.phoneNumber || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Date of Birth</p>
                    <p className="text-gray-900">{userData.data.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Age</p>
                    <p className="text-gray-900">{userData.data.age}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Sex</p>
                    <p className="text-gray-900 capitalize">{userData.data.sex}</p>
                  </div>
                </div>
                {userData.data.existingHealthConditions && userData.data.existingHealthConditions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Existing Health Conditions</p>
                    <div className="space-y-2">
                      {userData.data.existingHealthConditions.map((condition) => (
                        <div key={condition.id} className="bg-white rounded p-3 border">
                          <p className="font-medium text-gray-900">{condition.name}</p>
                          <p className="text-xs text-gray-600">Diagnosed: {condition.diagnosedDate}</p>
                          <p className="text-xs text-gray-600">Severity: {condition.severity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No user data available</p>
            )}
          </div>
        )}
      </div>

      {/* Mock Recommendations Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mock Recommendations
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
            {recommendations.success && recommendations.data ? (
              <>
                <p className="text-sm text-gray-600">
                  Found {recommendations.count} recommendations
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.data.map((rec) => (
                    <div key={rec.id} className="card">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rec.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : rec.status === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {rec.description}
                      </p>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Type:</span> {rec.type}
                        </p>
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Next Date:</span> {rec.nextDate}
                        </p>
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Frequency:</span> {rec.frequency}
                        </p>
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Priority:</span>{" "}
                          <span className="capitalize">{rec.priority}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-600">No recommendations available</p>
            )}
          </div>
        )}
      </div>

      {/* API Endpoints Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Available Mock API Endpoints
        </h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /mock-user
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-green-600">GET</span> /mock-recommendations
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          These endpoints return mock data from JSON fixtures located in{" "}
          <code className="bg-gray-200 px-1 rounded">backend/data/</code>
        </p>
      </div>
    </>
  );
}

export default Demo;
