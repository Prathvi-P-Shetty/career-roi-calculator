import React, { useState } from "react";
import { InformationCircleIcon, CalculatorIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// Handles the ROI calculation step, including salary guidance, instant ROI feedback, and user input for CTC values.

/**
 * ROICalculator component allows users to input CTC values and calculates ROI (percentage salary increase).
 * @param {Object} props
 * @param {string} props.currentRole - The user's current role.
 * @param {string} props.targetRole - The user's target role.
 * @param {Object} props.learningPath - The recommended learning path.
 * @param {Function} props.setRoiData - Function to update ROI data in parent state.
 * @param {boolean} props.showErrors - Whether to show error messages for invalid input.
 */

// Static salary data for each role
const salaryData = {
  "DevOps Engineer": { 
    fresher: 350000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹3.5L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "High demand role with excellent growth prospects"
  },
  "Cloud Engineer": { 
    fresher: 350000, 
    average: 1100000, 
    experienced: 1600000,
    range: "₹3.5L - ₹16L",
    source: "Payscale, 2025",
    tips: "Cloud skills are highly valued across industries"
  },
  "GenAI Engineer": { 
    fresher: 400000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹4L - ₹25L",
    source: "AmbitionBox, 2025",
    tips: "Emerging field with premium salaries and high demand"
  },
  "Data Analyst": { 
    fresher: 300000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3L - ₹14L",
    source: "Naukri, 2025",
    tips: "Entry point to data science with good growth potential"
  },
  "Full Stack Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Versatile role with opportunities in startups and enterprises"
  },
  "Data Scientist": { 
    fresher: 450000, 
    average: 1400000, 
    experienced: 2200000,
    range: "₹4.5L - ₹22L",
    source: "Glassdoor, 2025",
    tips: "High-value role requiring strong analytical skills"
  },
  "Machine Learning Engineer": { 
    fresher: 500000, 
    average: 1600000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "Payscale, 2025",
    tips: "Premium role with excellent career progression"
  },
  "Frontend Developer": { 
    fresher: 300000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3L - ₹12L",
    source: "Naukri, 2025",
    tips: "Good starting point for web development career"
  },
  "Backend Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Core role with strong demand across all sectors"
  },
  "Mobile App Developer": { 
    fresher: 350000, 
    average: 950000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "AmbitionBox, 2025",
    tips: "Growing field with mobile-first companies"
  },
  "Cybersecurity Analyst": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Critical role with increasing importance and demand"
  },
  "Product Manager": { 
    fresher: 500000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "LinkedIn, 2025",
    tips: "Leadership role requiring both technical and business skills"
  },
  "QA Engineer": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Essential role with good work-life balance"
  },
  "UI/UX Designer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "Payscale, 2025",
    tips: "Creative role with focus on user experience"
  },
  "Blockchain Developer": { 
    fresher: 450000, 
    average: 1300000, 
    experienced: 2000000,
    range: "₹4.5L - ₹20L",
    source: "AmbitionBox, 2025",    
    tips: "Emerging technology with niche but high-paying opportunities"
  }
};

// Determines the type of career transition
function getTransitionType(currentRole, targetRole) {
  if (!currentRole || !targetRole) return "unknown";
  const nonITRoles = [
    "Accountant", "Architect", "Banker", "Chef", "Civil Engineer", "Dentist", "Doctor", "Event Manager", "Fashion Designer", "Graphic Designer", "Hotel Manager", "HR Manager", "Interior Designer", "Journalist", "Lawyer", "Logistics Coordinator", "Marketing Manager", "Mechanical Engineer", "Nurse", "Operations Executive", "Pharmacist", "Physiotherapist", "Professor", "Public Relations Manager", "Real Estate Agent", "Research Analyst", "Retail Store Manager", "Sales Executive", "School Principal", "Social Media Manager", "Teacher", "Tourism Manager", "Trainer", "Travel Agent"
  ];
  if (currentRole === "Fresher" || nonITRoles.includes(currentRole)) return "nonit-to-it";
  if (currentRole && targetRole && currentRole !== targetRole) return "it-to-it";
  if (currentRole && targetRole && currentRole === targetRole) return "same-domain";
  return "unknown";
}

// Estimate expected salary based on current role and transition type
function calculateExpectedCTC(currentRole, targetRole, currentCTC) {
  if (!targetRole || !salaryData[targetRole]) return 0;
  const transitionType = getTransitionType(currentRole, targetRole);
  let projected = salaryData[targetRole].average;
  if (transitionType === "nonit-to-it") {
    projected = salaryData[targetRole].fresher;
  } else if (transitionType === "it-to-it") {
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.2, salaryData[targetRole].average); // 20% hike
  } else if (transitionType === "same-domain") {
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.35, salaryData[targetRole].average); // 35% hike
  }
  return Math.round(projected);
}

// Generate salary guidance blocks based on transition type
function getSalaryGuidance(currentRole, targetRole, currentCTC) {
  if (!targetRole || !salaryData[targetRole]) return null;
  
  const transitionType = getTransitionType(currentRole, targetRole);
  const data = salaryData[targetRole];
  
  let guidance = {
    title: `Salary Expectations for ${targetRole}`,
    range: data.range,
    source: data.source,
    tip: data.tips,
    scenarios: []
  };
  
  if (transitionType === "nonit-to-it") {
    guidance.scenarios = [
      {
        type: "Entry Level",
        salary: `₹${data.fresher.toLocaleString('en-IN')}`,
        description: "Starting salary as a career switcher"
      },
      {
        type: "After 1-2 years",
        salary: `₹${Math.round(data.fresher * 1.3).toLocaleString('en-IN')}`,
        description: "With experience and proven skills"
      },
      {
        type: "Senior Level",
        salary: `₹${data.average.toLocaleString('en-IN')}`,
        description: "With 3-5 years of experience"
      }
    ];
  } else if (transitionType === "it-to-it") {
    const current = Number(currentCTC) || data.fresher;
    guidance.scenarios = [
      {
        type: "Conservative",
        salary: `₹${Math.round(current * 1.1).toLocaleString('en-IN')}`,
        description: "10% hike (minimum expected)"
      },
      {
        type: "Expected",
        salary: `₹${Math.round(current * 1.2).toLocaleString('en-IN')}`,
        description: "20% hike (typical for domain switch)"
      },
      {
        type: "Optimistic",
        salary: `₹${Math.round(current * 1.3).toLocaleString('en-IN')}`,
        description: "30% hike (with strong skills)"
      }
    ];
  } else if (transitionType === "same-domain") {
    const current = Number(currentCTC) || data.fresher;
    guidance.scenarios = [
      {
        type: "Standard Upskilling",
        salary: `₹${Math.round(current * 1.25).toLocaleString('en-IN')}`,
        description: "25% hike with new skills"
      },
      {
        type: "Advanced Skills",
        salary: `₹${Math.round(current * 1.35).toLocaleString('en-IN')}`,
        description: "35% hike with premium skills"
      },
      {
        type: "Leadership Track",
        salary: `₹${Math.round(current * 1.5).toLocaleString('en-IN')}`,
        description: "50% hike for senior positions"
      }
    ];
  }
  
  return guidance;
}

export default function ROICalculator({ currentRole, targetRole, currentCTC, setCurrentCTC, learningPath, setRoiData, showErrors }) {
  const [expectedCTC, setExpectedCTC] = useState("");
  const [error, setError] = useState("");
  const [autoFilled, setAutoFilled] = useState(true);
  const [roiResult, setRoiResult] = useState(null);

  // Auto-fill expected CTC based on transition logic
  React.useEffect(() => {
    const autoCTC = calculateExpectedCTC(currentRole, targetRole, currentCTC);
    if (autoCTC > 0) {
      setExpectedCTC(autoCTC.toString());
      setAutoFilled(true);
    }
  }, [targetRole, currentRole, currentCTC]);

  // If user edits expectedCTC, mark as not auto-filled
  const handleExpectedCTCChange = (e) => {
    setExpectedCTC(e.target.value.replace(/^0+/, ""));
    setAutoFilled(false);
  };

  // Handle current CTC change
  const handleCurrentCTCChange = (e) => {
    setCurrentCTC(e.target.value.replace(/^0+/, ""));
  };

  // Calculate ROI instantly when currentCTC or expectedCTC changes
  React.useEffect(() => {
    const ctc = Number(currentCTC);
    const exp = Number(expectedCTC);
    if (!ctc || !exp) {
      setError("Please enter both current and expected CTC values.");
      setRoiResult(null);
      setRoiData && setRoiData(null);
      return;
    }
    if (exp <= ctc) {
      setError("Expected CTC should be higher than current CTC for positive ROI.");
      setRoiResult(null);
      setRoiData && setRoiData(null);
      return;
    }
    setError("");
    const gain = exp - ctc;
    const roi = ctc > 0 ? (gain / ctc) * 100 : 0;
    const result = {
      currentCTC: ctc,
      expectedCTC: exp,
      gain,
      roi: roi.toFixed(2),
      breakeven: gain > 0 ? "Immediate" : "N/A",
      targetRole,
      currentRole
    };
    setRoiResult(result);
    setRoiData && setRoiData(result);
  }, [currentCTC, expectedCTC, targetRole, currentRole, setRoiData]);

  const salaryGuidance = getSalaryGuidance(currentRole, targetRole, currentCTC);

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-primary mb-2 flex items-center gap-2">ROI Estimator
        <span className="relative group cursor-pointer">
          <InformationCircleIcon className="inline w-5 h-5 text-accent align-text-bottom ml-1" />
          <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
            The expected salary is automatically calculated based on your current and target role, using real market data and typical transition hikes. You can edit it if you have a specific offer.
          </span>
        </span>
      </h2>
      
      {/* Salary Guidance Section */}
      {salaryGuidance && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <ChartBarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-800">{salaryGuidance.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            {salaryGuidance.scenarios.map((scenario, index) => (
              <div key={index} className="bg-white p-3 rounded border border-blue-100">
                <div className="font-semibold text-blue-700 text-sm">{scenario.type}</div>
                <div className="text-lg font-bold text-blue-900">{scenario.salary}/year</div>
                <div className="text-xs text-gray-600">{scenario.description}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <LightBulbIcon className="w-4 h-4" />
            <span className="font-medium">{salaryGuidance.tip}</span>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Salary Range: <span className="font-semibold">{salaryGuidance.range}</span> | Source: {salaryGuidance.source}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1 text-primary">Your Current CTC (in your current role) (₹/year)</label>
      <input
        type="number"
            placeholder="Enter your current salary"
            className="w-full p-2 border rounded focus:outline-accent"
        value={currentCTC}
            onChange={handleCurrentCTCChange}
            min={0}
          />
          {currentRole === "Fresher" && (
            <div className="text-xs text-gray-500 mt-1">
              💡 As a fresher, you can enter 0 or your internship/stipend amount
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-primary flex items-center gap-1">Expected Salary (as a {targetRole || 'Target Role'}) (₹/year)
            {autoFilled && <span className="text-xs text-accent ml-1">(Auto-calculated)</span>}
          </label>
      <input
        type="number"
            placeholder={expectedCTC ? `Suggested: ₹${expectedCTC}` : 'Auto-calculated based on market data'}
            className="w-full p-2 border rounded focus:outline-accent bg-blue-50 text-blue-700 font-semibold"
        value={expectedCTC}
            onChange={handleExpectedCTCChange}
            min={0}
          />
          <div className="text-xs text-gray-500 mt-1">
            💡 Use the salary guidance above to set realistic expectations
          </div>
        </div>
      </div>
      
      {showErrors && error && (
        <div className="text-error text-sm font-semibold bg-red-50 border-l-4 border-red-400 p-2 rounded">
          {error}
        </div>
      )}
      
      {roiResult && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded shadow text-green-900 text-base font-semibold">
          <span>ROI: <span className="text-green-700">{roiResult.roi}%</span> &nbsp;|&nbsp; Gain: <span className="text-green-700">₹{roiResult.gain.toLocaleString('en-IN')}</span>/year &nbsp;|&nbsp; Breakeven: {roiResult.breakeven}</span>
        </div>
      )}
    </div>
  );
}

