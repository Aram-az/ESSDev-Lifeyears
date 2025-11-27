import { useState } from "react";

function OnboardingTemp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    sex: "",
    existingHealthConditions: [],
    currentCondition: "",
    familyHistory: [],
    lifestyle: {
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
      dietType: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select your sex";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("lifestyle.")) {
      const lifestyleKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle,
          [lifestyleKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addHealthCondition = () => {
    if (formData.currentCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        existingHealthConditions: [
          ...prev.existingHealthConditions,
          formData.currentCondition.trim(),
        ],
        currentCondition: "",
      }));
    }
  };

  const removeHealthCondition = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingHealthConditions: prev.existingHealthConditions.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store in localStorage as an array
    const userData = {
      ...formData,
      age: calculateAge(formData.dateOfBirth),
      submittedAt: new Date().toISOString(),
      id: Date.now(), // Add unique ID for each user
    };

    // Get existing users array or create new one
    const existingData = localStorage.getItem("onboardingData");
    let usersArray = [];

    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        // Handle both old format (single object) and new format (array)
        usersArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("Error parsing existing data:", e);
        usersArray = [];
      }
    }

    // Add new user to array
    usersArray.push(userData);

    // Save updated array
    localStorage.setItem("onboardingData", JSON.stringify(usersArray));
    setIsComplete(true);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Setup Complete!
            </h1>
            <p className="text-gray-600 mb-6">
              Your onboarding information has been saved successfully.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Summary of Your Information
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {formData.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {formData.email}
              </p>
              <p>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {formData.dateOfBirth}
              </p>
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {calculateAge(formData.dateOfBirth)} years
              </p>
              {formData.phoneNumber && (
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {formData.phoneNumber}
                </p>
              )}
              <p>
                <span className="font-semibold">Sex:</span>{" "}
                {formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1)}
              </p>
              {formData.existingHealthConditions.length > 0 && (
                <p>
                  <span className="font-semibold">Health Conditions:</span>{" "}
                  {formData.existingHealthConditions.join(", ")}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setIsComplete(false);
              setStep(1);
              setFormData({
                name: "",
                dateOfBirth: "",
                email: "",
                phoneNumber: "",
                sex: "",
                existingHealthConditions: [],
                currentCondition: "",
                familyHistory: [],
                lifestyle: {
                  smokingStatus: "",
                  alcoholConsumption: "",
                  exerciseFrequency: "",
                  dietType: "",
                },
              });
            }}
            className="btn-primary"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Onboarding
        </h1>
        <p className="text-gray-600">
          Step {step} of 3: Please provide your information to get started
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sex <span className="text-red-500">*</span>
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.sex ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.sex && (
                <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Health Conditions */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Health Information
            </h2>

            <div>
              <label
                htmlFor="currentCondition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Existing Health Conditions
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="currentCondition"
                  name="currentCondition"
                  value={formData.currentCondition}
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHealthCondition();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a health condition (e.g., Hypertension)"
                />
                <button
                  type="button"
                  onClick={addHealthCondition}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              {formData.existingHealthConditions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.existingHealthConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {condition}
                      <button
                        type="button"
                        onClick={() => removeHealthCondition(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Lifestyle Information
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Smoking Status
                  </label>
                  <select
                    name="lifestyle.smokingStatus"
                    value={formData.lifestyle.smokingStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Alcohol Consumption
                  </label>
                  <select
                    name="lifestyle.alcoholConsumption"
                    value={formData.lifestyle.alcoholConsumption}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Exercise Frequency
                  </label>
                  <select
                    name="lifestyle.exerciseFrequency"
                    value={formData.lifestyle.exerciseFrequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="1-2 times per week">
                      1-2 times per week
                    </option>
                    <option value="2-3 times per week">
                      2-3 times per week
                    </option>
                    <option value="3-5 times per week">
                      3-5 times per week
                    </option>
                    <option value="daily">Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Diet Type
                  </label>
                  <select
                    name="lifestyle.dietType"
                    value={formData.lifestyle.dietType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="mixed">Mixed</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="keto">Keto</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Review Your Information
            </h2>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Name:
                </span>{" "}
                <span className="text-gray-900">{formData.name}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Email:
                </span>{" "}
                <span className="text-gray-900">{formData.email}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Date of Birth:
                </span>{" "}
                <span className="text-gray-900">{formData.dateOfBirth}</span>
              </div>
              {formData.phoneNumber && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Phone:
                  </span>{" "}
                  <span className="text-gray-900">{formData.phoneNumber}</span>
                </div>
              )}
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Sex:
                </span>{" "}
                <span className="text-gray-900 capitalize">{formData.sex}</span>
              </div>
              {formData.existingHealthConditions.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Health Conditions:
                  </span>{" "}
                  <span className="text-gray-900">
                    {formData.existingHealthConditions.join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Please review your information carefully. You can go back to
                make changes, or click "Complete Setup" to finish.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              step === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Complete Setup
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default OnboardingTemp;
