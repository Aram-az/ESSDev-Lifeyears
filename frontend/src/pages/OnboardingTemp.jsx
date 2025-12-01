import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/shared/PageContainer";
import PageTitle from "../components/ui/PageTitle";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

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
    lifestyle: {
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
      dietType: "",
    },
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
    if (
      formData.email &&
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select your sex";
    }

    setErrors(newErrors);
    const requiredFieldErrors = ["name", "dateOfBirth", "sex"].filter(
      (field) => newErrors[field]
    );
    return { isValid: requiredFieldErrors.length === 0, errors: newErrors };
  };

  const validateStep2 = () => {
    // Step 2 questions are optional, so no blocking validation
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Top-level fields
    if (Object.prototype.hasOwnProperty.call(formData, name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Lifestyle nested fields
    else if (Object.prototype.hasOwnProperty.call(formData.lifestyle, name)) {
      setFormData((prev) => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle,
          [name]: value,
        },
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
    if (e) e.preventDefault();

    if (step === 1) {
      const validation = validateStep1();
      if (!validation.isValid) {
        const firstErrorField = Object.keys(validation.errors)[0];
        if (firstErrorField) {
          setTimeout(() => {
            const element = document.getElementById(firstErrorField);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              element.focus();
            }
          }, 100);
        }
        return;
      }
    }

    if (step === 2) {
      if (!validateStep2()) return;
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step !== 3) return;

    // Calculate age from date of birth
    const age = calculateAge(formData.dateOfBirth);

    // Store in localStorage
    const userData = {
      ...formData,
      age,
      submittedAt: new Date().toISOString(),
      id: Date.now(),
    };

    const existingData = localStorage.getItem("onboardingData");
    let usersArray = [];

    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        usersArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch (err) {
        console.error("Error parsing existing data:", err);
        usersArray = [];
      }
    }

    usersArray.push(userData);
    localStorage.setItem("onboardingData", JSON.stringify(usersArray));
    setIsComplete(true);
  };

  // Setup Complete screen
  if (isComplete) {
    return (
      <PageContainer>
        <Card className="text-center p-8">
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
            <PageTitle className="mb-2">Welcome to Lifeyears!</PageTitle>
            <p className="text-sm sm:text-base text-slate-500">
              Your onboarding information has been saved successfully. Redirecting
              to your dashboard in a few seconds...
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="primary"
            className="mt-4"
          >
            Go to Dashboard
          </Button>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle
        description={`Step ${step} of 3: Please provide your information to get started`}
      >
        Onboarding
      </PageTitle>

      {/* Progress bar */}
      <div className="mt-4 mb-6 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-brand-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <SectionTitle>Basic Information</SectionTitle>

              <Input
                label="Full Name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Date of Birth"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                error={errors.dateOfBirth}
                required
              />

              <Input
                label="Email Address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="your.email@example.com"
              />

              <Input
                label="Phone Number (Optional)"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />

              <Select
                label="Sex"
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                error={errors.sex}
                required
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                  { value: "prefer-not-to-say", label: "Prefer not to say" },
                ]}
              />
            </div>
          )}

          {/* Step 2: Health & Lifestyle */}
          {step === 2 && (
            <div className="space-y-6">
              <SectionTitle>Health Information</SectionTitle>

              {/* Medical History */}
              <div>
                <label
                  htmlFor="currentCondition"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Existing Health Conditions
                </label>
                <div className="flex gap-2">
                  <Input
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
                    placeholder="e.g., Hypertension, Diabetes"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addHealthCondition} variant="primary">
                    Add
                  </Button>
                </div>
                {formData.existingHealthConditions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.existingHealthConditions.map((condition, index) => (
                      <Badge
                        key={index}
                        variant="pending"
                        className="bg-brand-100 text-brand-800"
                      >
                        {condition}
                        <button
                          type="button"
                          onClick={() => removeHealthCondition(index)}
                          className="ml-2 text-brand-600 hover:text-brand-800 font-bold"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Lifestyle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lifestyle Information
                </label>
                <div className="space-y-4">
                  <Select
                    label="Smoking Status"
                    id="smokingStatus"
                    name="smokingStatus"
                    value={formData.lifestyle.smokingStatus}
                    onChange={handleInputChange}
                    options={[
                      { value: "never", label: "Never smoked" },
                      { value: "former", label: "Former smoker" },
                      { value: "current", label: "Current smoker" },
                    ]}
                  />

                  <Select
                    label="Alcohol Consumption"
                    id="alcoholConsumption"
                    name="alcoholConsumption"
                    value={formData.lifestyle.alcoholConsumption}
                    onChange={handleInputChange}
                    options={[
                      { value: "none", label: "None" },
                      { value: "occasional", label: "Occasional" },
                      { value: "moderate", label: "Moderate" },
                      { value: "heavy", label: "Heavy" },
                    ]}
                  />

                  <Select
                    label="Exercise Frequency"
                    id="exerciseFrequency"
                    name="exerciseFrequency"
                    value={formData.lifestyle.exerciseFrequency}
                    onChange={handleInputChange}
                    options={[
                      { value: "none", label: "None" },
                      { value: "1-2 times per week", label: "1-2 times per week" },
                      { value: "2-3 times per week", label: "2-3 times per week" },
                      { value: "3-5 times per week", label: "3-5 times per week" },
                      { value: "daily", label: "Daily" },
                    ]}
                  />

                  <Select
                    label="Diet Type"
                    id="dietType"
                    name="dietType"
                    value={formData.lifestyle.dietType}
                    onChange={handleInputChange}
                    options={[
                      { value: "mixed", label: "Mixed / Standard" },
                      { value: "vegetarian", label: "Vegetarian" },
                      { value: "vegan", label: "Vegan" },
                      { value: "mediterranean", label: "Mediterranean" },
                      { value: "keto", label: "Keto" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <SectionTitle>Review Your Information</SectionTitle>

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
                    <span className="text-gray-900">
                      {formData.phoneNumber}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Sex:
                  </span>{" "}
                  <span className="text-gray-900 capitalize">
                    {formData.sex}
                  </span>
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
            <Button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              variant="secondary"
              className={step === 1 ? "cursor-not-allowed opacity-50" : ""}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button type="button" onClick={handleNext} variant="primary">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </form>
      </Card>
    </PageContainer>
  );
}

export default OnboardingTemp;