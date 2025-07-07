import React, { useState } from "react";      // Import React and useState hook for state management

// Import custom components used in different steps of the wizard
import RoleSelector from "./components/RoleSelector";
import SkillGap from "./components/SkillGap";
import LearningPath from "./components/LearningPath";
import ROICalculator from "./components/ROICalculator";
import Summary from "./components/Summary";
import StandaloneROICalculator from "./StandaloneROICalculator";

import "./index.css";       // Global styles
import { InformationCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';     // Icons from Heroicons

// App.jsx
// Main entry point for the client-side React app. Implements the step-by-step wizard, manages global state, and coordinates all major UI flows for the Career ROI Calculator.

// Define step titles for progress display
const steps = [
  "Select Roles",
  "Skill Gap Analysis",
  "Learning Path",
  "ROI Calculator",
  "Summary"
];

// Tooltip component for helper tips next to headings
const Tooltip = ({ text }) => (
  <span className="relative group cursor-pointer">
    <InformationCircleIcon className="inline w-5 h-5 text-accent align-text-bottom ml-1" />
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
      {text}
    </span>
  </span>
);

export default function App() {
  // Define app-level state variables
  const [currentRole, setCurrentRole] = useState("");       // User's current role
  const [targetRole, setTargetRole] = useState("");       // User's target role
  const [gapSkills, setGapSkills] = useState([]);       // Skills user needs to learn
  const [learningPath, setLearningPath] = useState({});       // Recommended learning path
  const [roiData, setRoiData] = useState(null);       // ROI calculation data
  const [step, setStep] = useState(0);       // Current step in the wizard
  const [fresherSkills, setFresherSkills] = useState([]);    // Known skills for freshers
  const [mode, setMode] = useState(null); // null (Loading), 'wizard', or 'roi'
  const [roiLoading, setRoiLoading] = useState(false);    // (optional) loading indicator
  const [currentCTC, setCurrentCTC] = useState("");    // Current salary (for ROI)

// Calculate progress percentage for progress bar
  const progress = ((step + 1) / steps.length) * 100;

  // Step 1: Role Selection
  // // Handle role selection and update appropriate state
  const handleRoleSelect = (roleType, value) => {
    if (roleType === "current") setCurrentRole(value);
    if (roleType === "target") setTargetRole(value);
  };

  // Check if users can continue from roles step
  const canContinueFromRoles = currentRole && targetRole;

  // Step 2: Skill Gap
  // Check if users can continue from skill gap step
  const canContinueFromSkillGap = gapSkills.length > 0;

  // Step 3: Learning Path
  // Check if users can continue from learning path step
  const canContinueFromLearningPath = learningPath && learningPath.duration !== undefined;

  // Step 4: ROI Calculator
  // Check if users can continue from ROI calculator step
  const canContinueFromROI = roiData !== null;

  // Step navigation helpers
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (idx) => setStep(idx);

// Main UI Component
if (!mode) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-white/90 p-10 rounded-2xl shadow-2xl flex flex-col gap-8 items-center">
          <h1 className="text-4xl font-extrabold mb-4 text-primary text-center">Career ROI & Skill Gap Tools</h1>
          <div className="text-lg text-accent font-semibold mb-2 text-center">Empowering your next career leap with data-driven insights.</div>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <button
              className="flex-1 px-8 py-8 rounded-2xl bg-primary text-white font-bold text-2xl shadow-lg hover:bg-primary-light transition-all duration-200"
              onClick={() => setMode('wizard')}
            >
              Skill Gap Analyzer & Upskilling Journey
            </button>
            <button
              className="flex-1 px-8 py-8 rounded-2xl bg-accent text-white font-bold text-2xl shadow-lg hover:bg-accent-dark transition-all duration-200"
              onClick={() => setMode('roi')}
            >
              Standalone ROI Calculator
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standalone ROI Calculator mode (no steps)
  if (mode === 'roi') {
    return <StandaloneROICalculator onBack={() => setMode(null)} />;
  }

  // Main wizard UI wrapper
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 flex flex-col">
      <div className="w-full bg-white/90 p-6 rounded-2xl shadow-2xl mt-8 mb-4">
        {/* Back to Main Page Button */}
        <button
          className="mb-4 px-4 py-2 rounded bg-gray-200 text-primary font-semibold hover:bg-gray-300 transition"
          onClick={() => setMode(null)}
        >
          ← Back to Main Page
        </button>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((label, idx) => (
              <div
                key={label}
                className={`flex-1 flex flex-col items-center ${idx === step ? "" : "opacity-60"}`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx === step ? "bg-primary text-white border-primary" : "bg-gray-200 text-gray-500 border-gray-300"} font-bold mb-1 transition-all duration-200`}
                >
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold ${idx === step ? "text-primary" : "text-gray-400"}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-secondary-light rounded-full mt-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-gradient1 via-gradient2 to-gradient3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Components: Render based on current step */}
        {/* Step 0: Role Selector */}
        {/* Step 1: Skill Gap */}
        {/* Step 2: Learning Path */}
        {/* Step 3: ROI Calculator */}
        {/* Step 4: Summary */}

        {/* Step 1: Welcome & Role Selection */}
        {step === 0 && (
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Step 1: Select Your Roles</h2>
            <h1 className="text-4xl font-extrabold mb-2 text-primary">Career Pathway & Skill Gap Explorer</h1>
            <p className="text-lg text-gray-700 mb-6">
              Discover your personalized upskilling journey. Select your current and target roles to begin!
            </p>
            {/* Motivational Fact */}
            <div className="flex items-center justify-center gap-2 mb-6 bg-secondary-light text-secondary px-4 py-2 rounded shadow">
              <span className="text-sm font-medium">Did you know? Upskilling can boost your salary by 30% or more in tech roles!</span>
            </div>
            <div className="mb-4">
              <RoleSelector
                currentRole={currentRole}
                setCurrentRole={setCurrentRole}
                targetRole={targetRole}
                setTargetRole={setTargetRole}
                fresherSkills={fresherSkills}
                setFresherSkills={setFresherSkills}
              />
            </div>
            <button
              className={`mt-4 px-8 py-3 rounded-lg text-lg font-bold shadow transition-all duration-200 ${canContinueFromRoles ? "bg-primary text-white hover:bg-primary-light" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
              onClick={nextStep}
              disabled={!canContinueFromRoles}
            >
              Next: Analyze Skill Gap
            </button>
          </section>
        )}

        {/* Step 2: Skill Gap Analysis */}
        {step === 1 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Step 2: Skill Gap Analysis</h2>
            <h2 className="text-2xl font-bold mb-2 text-primary flex items-center justify-center gap-2">
              Skill Gap Analysis
            </h2>
            <SkillGap
              currentRole={currentRole}
              targetRole={targetRole}
              setGapSkills={setGapSkills}
              fresherSkills={fresherSkills}
            />
            <div className="flex items-center justify-center gap-2 mt-4 bg-primary text-white px-4 py-2 rounded shadow">
              <span className="text-sm font-medium">Tip: Focus on the top 2-3 missing skills for the fastest ROI!</span>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded bg-accent text-white font-semibold shadow hover:bg-accent-dark transition" onClick={prevStep}>Start Over</button>
              <button
                className={`px-8 py-2 rounded-lg font-bold shadow transition-all duration-200 ${canContinueFromSkillGap ? "bg-primary text-white hover:bg-primary-light" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
                onClick={nextStep}
                disabled={!canContinueFromSkillGap}
              >
                Next: Learning Path
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Learning Path */}
        {step === 2 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Step 3: Personalized Learning Path</h2>
            <h2 className="text-2xl font-bold mb-2 text-accent flex items-center justify-center gap-2">
              Personalized Learning Path
              <Tooltip text="A recommended roadmap of courses, certifications, and projects to bridge your skill gap." />
            </h2>
            <LearningPath
              currentRole={currentRole}
              targetRole={targetRole}
              knownSkills={currentRole === "Fresher" ? fresherSkills : gapSkills}
              setLearningPath={setLearningPath}
            />
            <div className="flex items-center justify-center gap-2 mt-4 bg-accent text-white px-4 py-2 rounded shadow">
              <LightBulbIcon className="w-6 h-6 text-white" />
              <span className="text-sm font-medium">Pro tip: Real-world projects and certifications make your resume stand out!</span>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded bg-secondary-light text-secondary font-semibold" onClick={prevStep}>Back</button>
              <button
                className={`px-8 py-2 rounded-lg font-bold shadow transition-all duration-200 ${canContinueFromLearningPath ? "bg-accent text-white hover:bg-accent-dark" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
                onClick={nextStep}
                disabled={!canContinueFromLearningPath}
              >
                Next: ROI Calculator
              </button>
            </div>
          </section>
        )}

        {/* Step 4: ROI Calculator */}
        {step === 3 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Step 4: ROI Estimator</h2>
            <h2 className="text-2xl font-bold mb-2 text-gradient bg-gradient-to-r from-gradient1 via-gradient2 to-gradient3 bg-clip-text text-transparent flex items-center justify-center gap-2">
              ROI & Breakeven
              <Tooltip text="ROI (Return on Investment) is the percentage gain from your upskilling investment. Breakeven is how many months it takes to recover your learning cost." />
            </h2>
            <ROICalculator
              currentRole={currentRole}
              targetRole={targetRole}
              learningPath={learningPath}
              setRoiData={setRoiData}
              showErrors={true}
              currentCTC={currentCTC}
              setCurrentCTC={setCurrentCTC}
            />
            <div className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-gradient1 via-gradient2 to-gradient3 text-white px-4 py-2 rounded shadow">
              <LightBulbIcon className="w-6 h-6 text-white" />
              <span className="text-sm font-medium">Did you know? Most learners see ROI within 6-12 months of upskilling!</span>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded bg-secondary-light text-secondary font-semibold" onClick={prevStep}>Back</button>
              <button
                className={`px-8 py-2 rounded-lg font-bold shadow transition-all duration-200 ${canContinueFromROI ? "bg-primary text-white hover:bg-primary-light" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
                onClick={nextStep}
                disabled={!canContinueFromROI}
              >
                Next: Summary
              </button>
            </div>
          </section>
        )}

        {/* Step 5: Summary */}
        {step === 4 && (
          <section className="py-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Step 5: Your Upskilling ROI Summary</h2>
            <h2 className="text-2xl font-bold mb-2 text-primary flex items-center justify-center gap-2">
              Your Upskilling ROI Summary
              <Tooltip text="A snapshot of your potential salary gain, ROI, and breakeven period." />
            </h2>
            {roiData && <Summary 
              data={roiData} 
              currentRole={currentRole}
              targetRole={targetRole}
              gapSkills={gapSkills}
              learningPath={learningPath}
              fresherSkills={fresherSkills}
            />}
            <div className="flex items-center justify-center gap-2 mt-4 bg-green-200 text-green-800 px-4 py-2 rounded shadow">
              <LightBulbIcon className="w-6 h-6 text-green-800" />
              <span className="text-sm font-medium">Share your plan with a mentor or download it for your next career move!</span>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded bg-secondary-light text-secondary font-semibold" onClick={prevStep}>Back</button>
              <button
                className="px-8 py-2 rounded-lg font-bold shadow bg-accent text-white hover:bg-accent-dark"
                onClick={() => {
                  setCurrentRole("");
                  setTargetRole("");
                  setCurrentCTC("");
                  setGapSkills([]);
                  setLearningPath({});
                  setRoiData(null);
                  setFresherSkills([]);
                  goToStep(0);
                }}
              >
                Start Over
              </button>
            </div>
          </section>
        )}
      </div>
      
      {/* Modern Footer */}
      <footer className="w-full text-center py-4 text-gray-500 bg-white/80 border-t mt-8">
        <div className="flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} Career ROI Calculator</span>
          <span>
            Built with <a href="https://react.dev/" className="text-primary hover:underline">React</a>, <a href="https://tailwindcss.com/" className="text-accent hover:underline">Tailwind CSS</a>, <a href="https://expressjs.com/" className="text-secondary hover:underline">Express</a>, and <a href="https://platform.openai.com/docs/guides/gpt" className="text-gradient bg-gradient-to-r from-gradient1 via-gradient2 to-gradient3 bg-clip-text text-transparent hover:underline">OpenAI GPT-4</a>.
          </span>
          <span>
            <a href="https://github.com/" className="text-primary hover:underline">GitHub</a> | <a href="https://www.linkedin.com/" className="text-accent hover:underline">LinkedIn</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
