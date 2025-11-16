// Mock data for ESSDev Lifeyears application

export const mockRecommendations = [
  {
    id: 1,
    title: "Regular Cardiovascular Exercise",
    category: "Exercise",
    priority: "high",
    description: "Engage in at least 150 minutes of moderate-intensity aerobic activity per week to improve heart health and longevity.",
    benefits: [
      "Reduces risk of heart disease",
      "Improves blood circulation",
      "Enhances mental well-being",
      "Increases life expectancy by 3-5 years"
    ],
    actionItems: [
      "Start with 30-minute walks 5 times per week",
      "Gradually increase intensity",
      "Include strength training 2x per week"
    ]
  },
  {
    id: 2,
    title: "Mediterranean Diet Plan",
    category: "Nutrition",
    priority: "high",
    description: "Adopt a Mediterranean-style diet rich in fruits, vegetables, whole grains, and healthy fats.",
    benefits: [
      "Reduces inflammation",
      "Lowers risk of chronic diseases",
      "Supports brain health",
      "May extend lifespan by 4-6 years"
    ],
    actionItems: [
      "Increase fish consumption to 2-3x per week",
      "Replace processed foods with whole foods",
      "Use olive oil as primary fat source"
    ]
  },
  {
    id: 3,
    title: "Sleep Optimization",
    category: "Lifestyle",
    priority: "medium",
    description: "Maintain consistent sleep schedule with 7-9 hours of quality sleep per night.",
    benefits: [
      "Improves immune function",
      "Enhances cognitive performance",
      "Reduces stress levels",
      "Supports cellular repair"
    ],
    actionItems: [
      "Set consistent bedtime and wake time",
      "Create dark, cool sleep environment",
      "Avoid screens 1 hour before bed"
    ]
  },
  {
    id: 4,
    title: "Stress Management Techniques",
    category: "Mental Health",
    priority: "medium",
    description: "Implement daily stress reduction practices such as meditation, deep breathing, or yoga.",
    benefits: [
      "Lowers cortisol levels",
      "Improves emotional regulation",
      "Reduces risk of anxiety and depression",
      "Enhances overall quality of life"
    ],
    actionItems: [
      "Practice 10 minutes of meditation daily",
      "Learn breathing exercises",
      "Schedule regular relaxation time"
    ]
  }
];

export const mockPreventionData = {
  primary: [
    {
      id: 1,
      type: "primary",
      title: "Annual Health Screening",
      description: "Regular check-ups to detect health issues before they become serious.",
      recommendedAge: "18+",
      frequency: "Annual",
      tests: [
        "Blood pressure check",
        "Cholesterol panel",
        "Blood glucose test",
        "BMI assessment"
      ],
      effectiveness: "High - Can prevent 70% of complications through early detection"
    },
    {
      id: 2,
      type: "primary",
      title: "Vaccination Schedule",
      description: "Stay up-to-date with recommended vaccinations to prevent infectious diseases.",
      recommendedAge: "All ages",
      frequency: "As per CDC schedule",
      vaccines: [
        "Influenza (annual)",
        "COVID-19 (as recommended)",
        "Tetanus/Diphtheria (every 10 years)",
        "Shingles (50+)"
      ],
      effectiveness: "High - Prevents 2-3 million deaths annually worldwide"
    },
    {
      id: 3,
      type: "primary",
      title: "Lifestyle Modification Program",
      description: "Comprehensive program to prevent chronic diseases through healthy living.",
      recommendedAge: "25+",
      frequency: "Ongoing",
      components: [
        "Smoking cessation support",
        "Alcohol moderation guidance",
        "Physical activity planning",
        "Nutrition counseling"
      ],
      effectiveness: "High - Reduces risk of diabetes, heart disease, and cancer by 40-60%"
    }
  ],
  secondary: [
    {
      id: 1,
      type: "secondary",
      title: "Diabetes Management Program",
      description: "Early intervention and management for pre-diabetes and type 2 diabetes.",
      targetCondition: "Pre-diabetes / Type 2 Diabetes",
      interventions: [
        "Blood glucose monitoring",
        "Medication management",
        "Dietary modifications",
        "Exercise prescription"
      ],
      outcomes: "Can delay progression by 5-10 years, reduce complications by 50%"
    },
    {
      id: 2,
      type: "secondary",
      title: "Hypertension Control",
      description: "Early detection and management of high blood pressure to prevent cardiovascular events.",
      targetCondition: "Hypertension (Stage 1-2)",
      interventions: [
        "Regular BP monitoring",
        "ACE inhibitors or ARBs",
        "DASH diet implementation",
        "Sodium reduction"
      ],
      outcomes: "Reduces stroke risk by 35-40%, heart attack risk by 20-25%"
    },
    {
      id: 3,
      type: "secondary",
      title: "Cardiac Rehabilitation",
      description: "Structured program for patients with early-stage heart disease.",
      targetCondition: "Coronary Artery Disease (early stage)",
      interventions: [
        "Supervised exercise training",
        "Cardiac risk factor modification",
        "Medication optimization",
        "Psychosocial support"
      ],
      outcomes: "Reduces mortality by 20-30%, improves quality of life significantly"
    }
  ]
};

export const mockLongevityData = {
  currentAge: 35,
  projectedLifespan: 82,
  healthScore: 75,
  riskFactors: [
    {
      id: 1,
      factor: "Sedentary Lifestyle",
      impact: -3,
      severity: "moderate",
      description: "Low physical activity levels"
    },
    {
      id: 2,
      factor: "Family History of Heart Disease",
      impact: -2,
      severity: "low",
      description: "Genetic predisposition present"
    }
  ],
  protectiveFactors: [
    {
      id: 1,
      factor: "Non-smoker",
      impact: +5,
      description: "Never smoked, significantly reduces cancer and heart disease risk"
    },
    {
      id: 2,
      factor: "Healthy BMI",
      impact: +3,
      description: "Maintaining optimal weight range"
    },
    {
      id: 3,
      factor: "Regular Health Screenings",
      impact: +2,
      description: "Proactive health monitoring"
    }
  ],
  recommendations: [
    {
      id: 1,
      action: "Increase Physical Activity",
      potentialGain: "+4 years",
      difficulty: "medium",
      description: "Adding 30 minutes of daily exercise could extend lifespan"
    },
    {
      id: 2,
      action: "Optimize Sleep Schedule",
      potentialGain: "+2 years",
      difficulty: "low",
      description: "Consistent 7-9 hours of sleep supports longevity"
    },
    {
      id: 3,
      action: "Adopt Mediterranean Diet",
      potentialGain: "+5 years",
      difficulty: "medium",
      description: "Dietary changes can significantly impact lifespan"
    }
  ],
  milestones: [
    {
      age: 50,
      milestone: "Mid-life health assessment",
      description: "Comprehensive evaluation and prevention strategy update"
    },
    {
      age: 65,
      milestone: "Retirement health optimization",
      description: "Focus on maintaining independence and quality of life"
    },
    {
      age: 75,
      milestone: "Longevity maintenance",
      description: "Continued monitoring and adaptation of health strategies"
    }
  ]
};

