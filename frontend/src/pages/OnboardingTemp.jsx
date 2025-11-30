import { useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import PageTitle from "../components/ui/PageTitle";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

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
      <PageContainer>
        <Card className="text-center p-8">
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
            <PageTitle className="mb-2">Setup Complete!</PageTitle>
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
          <Button
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
            variant="primary"
          >
            Start Over
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
                required
              />

              <Input
                label="Phone Number (Optional)"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1-555-0123"
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

          {/* Step 2: Health Conditions */}
          {step === 2 && (
            <div className="space-y-6">
              <SectionTitle>Health Information</SectionTitle>

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
                    placeholder="Enter a health condition (e.g., Hypertension)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addHealthCondition}
                    variant="primary"
                  >
                    Add
                  </Button>
                </div>
                {formData.existingHealthConditions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.existingHealthConditions.map(
                      (condition, index) => (
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
                      )
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lifestyle Information
                </label>
                <div className="space-y-4">
                  <Select
                    label="Smoking Status"
                    name="lifestyle.smokingStatus"
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
                    name="lifestyle.alcoholConsumption"
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
                    name="lifestyle.exerciseFrequency"
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
                    name="lifestyle.dietType"
                    value={formData.lifestyle.dietType}
                    onChange={handleInputChange}
                    options={[
                      { value: "mixed", label: "Mixed" },
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
              <Button type="submit" variant="primary" className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
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
