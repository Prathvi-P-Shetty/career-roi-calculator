/**
 * Career ROI Calculator - Main Application Component
 * 
 * @author Prathvi P Shetty
 * @copyright 2025 Prathvi P Shetty 
 * @license MIT
 * 
 * A comprehensive career planning tool that calculates ROI for career transitions
 * using AI-powered skill analysis and salary progression modeling.
 * 
 * Built with React, Node.js, and OpenAI GPT-3.5 API.
 */

import React, { useState } from "react";      // Import React and useState hook for state management

// Import custom components used in different steps of the wizard
import RoleSelector from "./components/RoleSelector";
import SkillGap from "./components/SkillGap";
import LearningPath from "./components/LearningPath";
import ROICalculator from "./components/ROICalculator";
import Summary from "./components/Summary";
import StandaloneROICalculator from "./StandaloneROICalculator";

import "./index.css";       // Global styles
import { InformationCircleIcon, LightBulbIcon, CheckIcon } from '@heroicons/react/24/outline';     // Icons from Heroicons

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
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-slate-800 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10 shadow-edtech-lg">
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
  const canContinueFromLearningPath = learningPath && (learningPath.duration !== undefined || learningPath.certifications !== undefined);

  // Step 4: ROI Calculator
  // Check if users can continue from ROI calculator step
  const canContinueFromROI = roiData !== null;

  // Step navigation helpers
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (idx) => setStep(idx);

  // Step validation functions - More lenient to handle API failures
  const canAccessStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: return true; // Always accessible
      case 1: return canContinueFromRoles; // Need roles selected
      case 2: return canContinueFromRoles && canContinueFromSkillGap; // Need roles and skills (even fallback)
      case 3: return canContinueFromRoles && canContinueFromSkillGap && canContinueFromLearningPath; // Need roles, skills, and learning path (even fallback)
      case 4: return canContinueFromRoles && canContinueFromSkillGap && canContinueFromLearningPath && canContinueFromROI; // Need everything
      default: return false;
    }
  };

  const isStepCompleted = (stepIndex) => {
    switch (stepIndex) {
      case 0: return canContinueFromRoles;
      case 1: return canContinueFromSkillGap;
      case 2: return canContinueFromLearningPath;
      case 3: return canContinueFromROI;
      case 4: return roiData !== null;
      default: return false;
    }
  };

  const handleStepClick = (stepIndex) => {
    if (canAccessStep(stepIndex)) {
      // Add a subtle animation effect
      const stepElement = document.querySelector(`[data-step="${stepIndex}"]`);
      if (stepElement) {
        stepElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
          stepElement.style.transform = 'scale(1)';
        }, 150);
      }
      goToStep(stepIndex);
    }
  };

  // Helper function to get step summary for tooltips
  const getStepSummary = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return currentRole && targetRole ? `${currentRole} → ${targetRole}` : "Select roles";
      case 1:
        return gapSkills.length > 0 ? `${gapSkills.length} skills selected` : "Select skills";
      case 2:
        return learningPath.duration ? `${learningPath.duration} months plan` : "Generate plan";
      case 3:
        return roiData ? "ROI calculated" : "Calculate ROI";
      case 4:
        return roiData ? "View summary" : "View results";
      default:
        return "";
    }
  };

// Main UI Component
if (!mode) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl shadow-edtech-xl border border-blue-100 flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Pathwise: Career Growth Intelligence
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-secondary font-medium mb-6 sm:mb-8 max-w-2xl px-2">
              Empowering your next career leap with data-driven insights and personalized learning pathways.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full max-w-3xl">
            <button
              className="flex-1 px-6 sm:px-8 py-8 sm:py-6 md:py-8 lg:py-10 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base sm:text-lg md:text-xl shadow-edtech-lg hover:shadow-edtech-xl transition-all duration-300 transform hover:scale-105 border-0"
              onClick={() => setMode('wizard')}
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xl sm:text-2xl font-extrabold">Start My Career Plan</div>
                <div className="text-primary-100 font-medium text-sm sm:text-base">Complete Upskilling Journey</div>
              </div>
            </button>
            <button
              className="flex-1 px-6 sm:px-8 py-4 sm:py-6 md:py-8 lg:py-10 rounded-2xl bg-gradient-to-r from-accent to-accent-dark text-white font-bold text-base sm:text-lg md:text-xl shadow-edtech-lg hover:shadow-edtech-xl transition-all duration-300 transform hover:scale-105 border-0"
              onClick={() => setMode('roi')}
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xl sm:text-2xl font-extrabold">Quick Salary ROI Estimator</div>
                <div className="text-accent-100 font-medium text-sm sm:text-base">Quick Salary Analysis</div>
              </div>
            </button>
          </div>
          
          {/* <div className="text-center text-secondary text-sm mt-8">
            <p>Built for modern professionals seeking data-driven career advancement</p>
          </div> */}
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-4xl md:max-w-5xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-edtech-xl border border-blue-100 mt-4 sm:mt-6 md:mt-8 mb-4">
        {/* Back to Main Page Button */}
        <button
          className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold hover:bg-secondary-200 transition-all duration-200 shadow-edtech text-sm sm:text-base"
          onClick={() => setMode(null)}
        >
          ← Back to Main Page
        </button>
        
        {/* Progress Bar - Mobile Responsive with Clickable Steps */}
        <div className="mb-6 sm:mb-10">
          <div className="flex justify-between items-center mb-4">
            {steps.map((label, idx) => {
              const isAccessible = canAccessStep(idx);
              const isCompleted = isStepCompleted(idx);
              const isCurrent = idx === step;
              
              return (
                <div
                  key={label}
                  className={`flex-1 flex flex-col items-center transition-all duration-300 ${
                    isCurrent ? "" : isAccessible ? "opacity-80" : "opacity-40"
                  }`}
                >
                  <button
                    onClick={() => handleStepClick(idx)}
                    disabled={!isAccessible}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 font-bold mb-2 transition-all duration-300 text-sm sm:text-base relative group ${
                      isCurrent 
                        ? "bg-gradient-to-r from-primary to-accent text-white border-primary shadow-edtech scale-110" 
                        : isCompleted
                        ? "bg-gradient-to-r from-success to-success-dark text-white border-success shadow-edtech hover:scale-105"
                        : isAccessible
                        ? "bg-white text-secondary border-secondary-200 hover:border-primary hover:shadow-edtech cursor-pointer"
                        : "bg-white text-secondary border-secondary-200 cursor-not-allowed"
                    }`}
                    title={isAccessible ? `Go to ${label}${getStepSummary(idx) ? ` - ${getStepSummary(idx)}` : ''}` : "Complete previous steps first"}
                  >
                    {isCompleted && !isCurrent ? (
                      <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      idx + 1
                    )}
                    {/* Hover tooltip for mobile */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {isAccessible ? `Go to ${label}${getStepSummary(idx) ? ` - ${getStepSummary(idx)}` : ''}` : "Complete previous steps first"}
                    </span>
                  </button>
                  <span className={`text-xs sm:text-sm font-semibold text-center hidden sm:block transition-colors duration-300 ${
                    isCurrent ? "text-primary" : isCompleted ? "text-success" : isAccessible ? "text-secondary" : "text-secondary-300"
                  }`}>
                    {label}
                  </span>
                  {/* Mobile: Show abbreviated labels */}
                  <span className={`text-xs font-semibold text-center sm:hidden transition-colors duration-300 ${
                    isCurrent ? "text-primary" : isCompleted ? "text-success" : isAccessible ? "text-secondary" : "text-secondary-300"
                  }`}>
                    {label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full h-2 sm:h-3 bg-secondary-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 rounded-full"
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
          <section data-step="0" className="text-center py-2 sm:py-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Map Your Career Path
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Step 1: Choose Your Roles</h2>
            <p className="text-base sm:text-lg text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Discover your personalized upskilling journey. Select your current and target roles to begin your transformation!
            </p>
            
            {/* Motivational Fact */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 bg-gradient-to-r from-primary-50 to-accent-50 text-primary px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-edtech border border-primary-100 mx-2">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Did you know? Upskilling can boost your salary by 30% or more in tech roles!</span>
            </div>
            
            <div className="mb-8">
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
              className={`mt-6 px-10 py-4 rounded-xl text-lg font-bold shadow-edtech-lg transition-all duration-300 transform hover:scale-105 ${
                canContinueFromRoles 
                  ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-edtech-xl" 
                  : "bg-secondary-200 text-secondary cursor-not-allowed"
              }`}
              onClick={nextStep}
              disabled={!canContinueFromRoles}
            >
              Next: Analyze Skill Gap
            </button>
          </section>
        )}

        {/* Step 2: Skill Gap Analysis */}
        {step === 1 && (
          <section data-step="1" className="py-2 sm:py-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">Step 2: Identify Skill Gaps</h2>
            <div className="overflow-x-hidden">
              <SkillGap
                currentRole={currentRole}
                targetRole={targetRole}
                setGapSkills={setGapSkills}
                fresherSkills={fresherSkills}
              />
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 bg-gradient-to-r from-accent-50 to-primary-50 text-accent px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-edtech border border-accent-100 mx-2">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Tip: Focus on the top 2-3 missing skills for the fastest ROI!</span>
            </div>
            <div className="flex justify-between mt-6 sm:mt-10 gap-2 sm:gap-4">
              <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold shadow-edtech hover:bg-secondary-200 transition-all duration-200 text-sm sm:text-base" onClick={prevStep}>
                Start Over
              </button>
              <button
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold shadow-edtech-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  canContinueFromSkillGap 
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-edtech-xl" 
                    : "bg-secondary-200 text-secondary cursor-not-allowed"
                }`}
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
          <section data-step="2" className="py-2 sm:py-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">Step 3: Personalized Learning Path</h2>
            <div className="overflow-x-hidden">
              <LearningPath
                currentRole={currentRole}
                targetRole={targetRole}
                knownSkills={currentRole === "Fresher" ? fresherSkills : gapSkills}
                setLearningPath={setLearningPath}
              />
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 bg-gradient-to-r from-success-50 to-accent-50 text-success px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-edtech border border-success-100 mx-2">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Pro tip: Real-world projects and certifications make your resume stand out!</span>
            </div>
            <div className="flex justify-between mt-6 sm:mt-10 gap-2 sm:gap-4">
              <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold shadow-edtech hover:bg-secondary-200 transition-all duration-200 text-sm sm:text-base" onClick={prevStep}>
                Back
              </button>
              <button
                className={`px-8 sm:px-10 py-2 sm:py-3 rounded-xl font-bold shadow-edtech-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  canContinueFromLearningPath 
                    ? "bg-gradient-to-r from-accent to-primary text-white hover:shadow-edtech-xl" 
                    : "bg-secondary-200 text-secondary cursor-not-allowed"
                }`}
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
          <section data-step="3" className="py-2 sm:py-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">Step 4: Projected Salary ROI</h2>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ROI & Breakeven Analysis
            </h3>
            <div className="overflow-x-hidden">
              <ROICalculator
                currentRole={currentRole}
                targetRole={targetRole}
                learningPath={learningPath}
                setRoiData={setRoiData}
                showErrors={true}
                currentCTC={currentCTC}
                setCurrentCTC={setCurrentCTC}
              />
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 bg-gradient-to-r from-warning-50 to-accent-50 text-warning px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-edtech border border-warning-100 mx-2">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-warning flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Did you know? Most learners see ROI within 6-12 months of upskilling!</span>
            </div>
            <div className="flex justify-between mt-6 sm:mt-10 gap-2 sm:gap-4">
              <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold shadow-edtech hover:bg-secondary-200 transition-all duration-200 text-sm sm:text-base" onClick={prevStep}>
                Back
              </button>
              <button
                className={`px-8 sm:px-10 py-2 sm:py-3 rounded-xl font-bold shadow-edtech-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  canContinueFromROI 
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-edtech-xl" 
                    : "bg-secondary-200 text-secondary cursor-not-allowed"
                }`}
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
          <section data-step="4" className="py-2 sm:py-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">Step 5: Career Growth Summary</h2>
            <div className="overflow-x-hidden">
              {roiData && <Summary 
                data={roiData} 
                currentRole={currentRole}
                targetRole={targetRole}
                gapSkills={gapSkills}
                learningPath={learningPath}
                fresherSkills={fresherSkills}
              />}
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 bg-gradient-to-r from-success-50 to-primary-50 text-success px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-edtech border border-success-100 mx-2">
              <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Share your plan with a mentor or download it for your next career move!</span>
            </div>
            <div className="flex justify-between mt-6 sm:mt-10 gap-2 sm:gap-4">
              <button className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold shadow-edtech hover:bg-secondary-200 transition-all duration-200 text-sm sm:text-base" onClick={prevStep}>
                Back
              </button>
              <button
                className="px-8 sm:px-10 py-2 sm:py-3 rounded-xl font-bold shadow-edtech-lg bg-gradient-to-r from-success to-success-dark text-white hover:shadow-edtech-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
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
      <footer className="w-full text-center py-4 sm:py-6 text-secondary bg-white/90 backdrop-blur-sm border-t border-secondary-200 mt-4 sm:mt-8">
        <div className="flex flex-col items-center gap-2 sm:gap-3 px-2">
          <span className="font-semibold text-primary text-sm sm:text-base">© {new Date().getFullYear()} Career ROI Calculator</span>
          <span className="text-xs sm:text-sm text-center">
            Built with <a href="https://react.dev/" className="text-primary hover:text-primary-dark underline">React</a>, <a href="https://tailwindcss.com/" className="text-accent hover:text-accent-dark underline">Tailwind CSS</a>, <a href="https://expressjs.com/" className="text-secondary hover:text-secondary-dark underline">Express</a>, and <a href="https://platform.openai.com/docs/guides/gpt" className="text-primary hover:text-primary-dark underline">OpenAI GPT-4</a>.
          </span>
          <span className="text-xs sm:text-sm">
            <a href="https://github.com/" className="text-primary hover:text-primary-dark underline">GitHub</a> | <a href="https://www.linkedin.com/" className="text-accent hover:text-accent-dark underline">LinkedIn</a>
          </span>
        </div>
      </footer>
    </div>
  );
}