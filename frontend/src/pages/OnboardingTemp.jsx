import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";

function OnboardingTemp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    sex: "",
    existingHealthConditions: [],
    currentCondition: "",
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholConsumption: "",
    dietType: "",
  });
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  // Auto-redirect to dashboard after 3 seconds when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate]);

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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 0 || age > 150) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }
    if (formData.email && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select your sex";
    }
    setErrors(newErrors);
    // Only block if required fields have errors (name, dateOfBirth, sex)
    const requiredFieldErrors = ['name', 'dateOfBirth', 'sex'].filter(field => newErrors[field]);
    return { isValid: requiredFieldErrors.length === 0, errors: newErrors };
  };

  const validateStep2 = () => {
    // Step 2 questions are optional, so no validation needed
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          prev.currentCondition.trim(),
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

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (step === 1) {
      const validation = validateStep1();
      console.log('Validation result:', validation);
      console.log('Form data:', formData);
      if (validation.isValid) {
        console.log('Moving to step 2');
        setStep(2);
      } else {
        console.log('Validation failed:', validation.errors);
        // Scroll to first error
        const firstErrorField = Object.keys(validation.errors)[0];
        if (firstErrorField) {
          setTimeout(() => {
            const element = document.getElementById(firstErrorField);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              element.focus();
            }
          }, 100);
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      // Calculate age from date of birth
      const age = calculateAge(formData.dateOfBirth);

      // Store in localStorage
      const userData = {
        ...formData,
        age: age,
        submittedAt: new Date().toISOString(),
        id: Date.now(),
      };

      // Get existing users array or create new one
      const existingData = localStorage.getItem("onboardingData");
      let usersArray = [];

      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);
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
    }
  };

  // Setup Complete screen
  if (isComplete) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Setup Complete!"
          description="Your onboarding information has been saved successfully."
          variant="compact"
        />

        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-rose-600"
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
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
              Welcome to Lifeyears!
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Redirecting to your dashboard in a few seconds...
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto rounded-xl bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader
        title="Onboarding"
        description={`Step ${step} of 2: Please provide your information to get started`}
        variant="compact"
      >
        {/* Progress bar */}
        <div className="mt-4 w-full bg-rose-100 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>
      </PageHeader>

      {/* Form card */}
      <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                  Basic Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-5">
                  Let's start with some basic information about you.
                </p>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors ${
                    errors.name
                      ? "border-rose-500 bg-rose-50"
                      : "border-rose-200 bg-white"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-rose-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                >
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors ${
                    errors.dateOfBirth
                      ? "border-rose-500 bg-rose-50"
                      : "border-rose-200 bg-white"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1.5 text-xs text-rose-600">
                    {errors.dateOfBirth}
                  </p>
                )}
                {formData.dateOfBirth && !errors.dateOfBirth && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    Age: {calculateAge(formData.dateOfBirth)} years
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors ${
                    errors.email
                      ? "border-rose-500 bg-rose-50"
                      : "border-rose-200 bg-white"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sex"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                >
                  Sex <span className="text-rose-500">*</span>
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors ${
                    errors.sex
                      ? "border-rose-500 bg-rose-50"
                      : "border-rose-200 bg-white"
                  }`}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.sex && (
                  <p className="mt-1.5 text-xs text-rose-600">{errors.sex}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Medical History & Habits */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                  Medical History & Habits
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-5">
                  Help us understand your health history and lifestyle better.
                </p>
              </div>

              {/* Medical History */}
              <div>
                <label
                  htmlFor="currentCondition"
                  className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
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
                    className="flex-1 px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    placeholder="e.g., Hypertension, Diabetes"
                  />
                  <button
                    type="button"
                    onClick={addHealthCondition}
                    className="px-4 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.existingHealthConditions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.existingHealthConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium"
                      >
                        {condition}
                        <button
                          type="button"
                          onClick={() => removeHealthCondition(index)}
                          className="ml-2 text-rose-600 hover:text-rose-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Habits */}
              <div className="space-y-4 pt-2">
                <div>
                  <label
                    htmlFor="exerciseFrequency"
                    className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                  >
                    Exercise Frequency
                  </label>
                  <select
                    id="exerciseFrequency"
                    name="exerciseFrequency"
                    value={formData.exerciseFrequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="1-2 times per week">1-2 times per week</option>
                    <option value="3-4 times per week">3-4 times per week</option>
                    <option value="5+ times per week">5+ times per week</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="smokingStatus"
                    className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                  >
                    Smoking Status
                  </label>
                  <select
                    id="smokingStatus"
                    name="smokingStatus"
                    value={formData.smokingStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="alcoholConsumption"
                    className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                  >
                    Alcohol Consumption
                  </label>
                  <select
                    id="alcoholConsumption"
                    name="alcoholConsumption"
                    value={formData.alcoholConsumption}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dietType"
                    className="block text-xs sm:text-sm font-medium text-slate-700 mb-2"
                  >
                    Diet Type
                  </label>
                  <select
                    id="dietType"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-rose-200 bg-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="mixed">Mixed / Standard</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="keto">Keto</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium transition-colors ${
                step === 1
                  ? "bg-rose-100 text-rose-300 cursor-not-allowed"
                  : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
              }`}
            >
              Back
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto rounded-xl bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-rose-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-rose-600 transition-colors"
              >
                Complete Setup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnboardingTemp;
