import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegClock, FaRupeeSign, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import { AcademicCapIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';

// Displays the week-by-week learning roadmap, including cards for each step, motivational tips, and resource links.

/**
 * LearningPath component displays the recommended learning path for a target role.
 * @param {Object} props
 * @param {string} props.targetRole - The selected target role.
 * @param {Function} props.setLearningPath - Function to update the learning path in parent state.
 */

// LearningPath component
export default function LearningPath({ currentRole, targetRole, knownSkills, setLearningPath }) {   // Destructure props
  const [aiPath, setAiPath] = useState(null);  // State for AI-generated learning path
  const [loading, setLoading] = useState(false);  // State for loading state
  const [error, setError] = useState("");  // State for error message

  // Effect to fetch learning path from API
  useEffect(() => {
    if (!currentRole || !targetRole) return;  // If no current or target role, return
    setLoading(true);  // Set loading state to true
    setError("");  // Clear any previous errors
    setAiPath(null);  // Clear any previous AI-generated learning path

    // Fetch learning path from API
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/learningpath`, {
        currentRole,
        targetRole,
        knownSkills: knownSkills || []
      })
      // If the API call succeeds, set the AI-generated learning path
      .then((res) => {
        setAiPath(res.data.path);  // Set the AI-generated learning path
        // Update the parent component's state with the learning path
        setLearningPath({ duration: `${res.data.path.length} weeks`, certifications: res.data.path.map(s => s.skill), projects: res.data.path.filter(s => s.skill.toLowerCase().includes("project")).length });
      })
      // If the API call fails, set the error message and fallback to static mapping
      .catch(() => {
        setError("Could not fetch AI learning path. Showing static mapping.");
        setLearningPath({ duration: "-", certifications: [], projects: 0 });  // Update the parent component's state with the static mapping
      })
      .finally(() => setLoading(false));
  }, [currentRole, targetRole, knownSkills, setLearningPath]);

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-3xl shadow-edtech-lg border border-primary-100 overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <BookOpenIcon className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">Upskilling Journey</h2>
      </div>
     
      {loading && (
        <div className="text-center my-8">
          <div className="inline-flex items-center gap-3 text-primary font-semibold animate-pulse">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Generating your learning path with AI...
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-center my-4 p-4 bg-warning-50 border border-warning-200 rounded-xl text-warning-dark">
          <div className="flex items-center justify-center gap-2">
            <span className="text-warning">⚠️</span>
            {error}
          </div>
        </div>
      )}
      
      {aiPath && (
        <div className="space-y-6">
          {/* Journey Overview */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-2xl border border-primary-200 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AcademicCapIcon className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-primary">Your Learning Journey</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{aiPath.length}</div>
                <div className="text-sm text-secondary">Total Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{aiPath.filter(s => s.skill.toLowerCase().includes("project")).length}</div>
                <div className="text-sm text-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{aiPath.filter(s => s.skill.toLowerCase().includes("certification") || s.skill.toLowerCase().includes("cert")).length}</div>
                <div className="text-sm text-secondary">Certifications</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-success"></div>
            <div className="space-y-8">
              {aiPath.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-6 group">
                  {/* Week Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-edtech">
                      <span className="text-white font-bold text-lg">{step.week || idx + 1}</span>
                    </div>
                    {step.time && (
                      <div className="text-xs text-secondary text-center mt-2 flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {step.time}
                      </div>
                    )}
                  </div>
                  
                  {/* Content Card */}
                  <div className="flex-1 bg-gradient-to-br from-white to-primary-50 rounded-2xl border-2 border-primary-100 p-6 shadow-edtech hover:shadow-edtech-lg transition-all duration-300 group-hover:border-primary-200">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-xl text-primary">{step.skill}</h4>
                      <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-medium hidden sm:block">
                        Week {step.week || idx + 1}
                      </span>
                    </div>
                    
                    <p className="text-secondary text-base mb-4 leading-relaxed">{step.description}</p>
                    
                    {step.resource && step.link && (
                      <div className="flex items-center gap-2">
                        <a 
                          href={step.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-all duration-200 shadow-edtech hover:shadow-edtech-lg"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          {step.resource}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gradient-to-r from-success-50 to-accent-50 rounded-2xl border border-success-200">
        <div className="text-center text-sm text-secondary">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-success">💡</span>
            <span className="font-medium">This learning path is a suggested roadmap. Adjust as needed based on your background and goals.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

