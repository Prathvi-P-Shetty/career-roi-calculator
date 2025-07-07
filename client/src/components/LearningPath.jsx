import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegClock, FaRupeeSign, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

// Displays the week-by-week learning roadmap, including cards for each step, motivational tips, and resource links.

/**
 * LearningPath component displays the recommended learning path for a target role.
 * @param {Object} props
 * @param {string} props.targetRole - The selected target role.
 * @param {Function} props.setLearningPath - Function to update the learning path in parent state.
 */

// Static mapping of skills to resources for each role
const pathMap = {
  "DevOps Engineer": [
    { skill: "Linux & Scripting", resource: "https://linuxjourney.com/", time: "2 weeks", cost: "Free" },
    { skill: "Docker & Containers", resource: "https://www.udemy.com/course/docker-mastery/", time: "3 weeks", cost: "₹2,000" },
    { skill: "AWS Certified DevOps Engineer", resource: "https://aws.amazon.com/certification/certified-devops-engineer-professional/", time: "4 weeks", cost: "₹15,000" },
    { skill: "CI/CD & Kubernetes", resource: "https://www.coursera.org/learn/google-kubernetes-engine", time: "3 weeks", cost: "₹3,000" },
    { skill: "DevOps Project", resource: "https://github.com/topics/devops-project", time: "2 weeks", cost: "Free" }
  ],
  "Cloud Engineer": [
    { skill: "AWS Solutions Architect", resource: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", time: "4 weeks", cost: "₹15,000" },
    { skill: "Terraform Basics", resource: "https://learn.hashicorp.com/terraform", time: "2 weeks", cost: "Free" },
    { skill: "Google Cloud Architect", resource: "https://cloud.google.com/certification/cloud-architect", time: "3 weeks", cost: "₹12,000" },
    { skill: "Cloud Project", resource: "https://github.com/topics/cloud-project", time: "2 weeks", cost: "Free" }
  ],
  "GenAI Engineer": [
    { skill: "Prompt Engineering", resource: "https://www.coursera.org/learn/prompt-engineering", time: "2 weeks", cost: "Free" },
    { skill: "LLMs & LangChain", resource: "https://www.udemy.com/course/langchain-bootcamp/", time: "3 weeks", cost: "₹1,500" },
    { skill: "GenAI Project", resource: "https://github.com/topics/generative-ai", time: "3 weeks", cost: "Free" }
  ],
  "Data Analyst": [
    { skill: "Excel & Power BI", resource: "https://learn.microsoft.com/en-us/power-bi/", time: "2 weeks", cost: "Free" },
    { skill: "SQL & Databases", resource: "https://www.sqlcourse.com/", time: "2 weeks", cost: "Free" },
    { skill: "Google Data Analytics", resource: "https://www.coursera.org/professional-certificates/google-data-analytics", time: "4 weeks", cost: "₹3,000" },
    { skill: "Analytics Project", resource: "https://github.com/topics/data-analysis", time: "2 weeks", cost: "Free" }
  ],
  "Full Stack Developer": [
    { skill: "JavaScript & React", resource: "https://react.dev/", time: "3 weeks", cost: "Free" },
    { skill: "Node.js & MongoDB", resource: "https://university.mongodb.com/", time: "3 weeks", cost: "Free" },
    { skill: "Full Stack Project", resource: "https://github.com/topics/fullstack", time: "4 weeks", cost: "Free" }
  ]
};

// Generic path for all roles
const genericPath = [
  { skill: "Core Programming", resource: "https://www.freecodecamp.org/", time: "3 weeks", cost: "Free" },
  { skill: "Relevant Certification", resource: "https://www.coursera.org/", time: "4 weeks", cost: "Varies" },
  { skill: "Build a Portfolio Project", resource: "https://github.com/explore", time: "3 weeks", cost: "Free" },
  { skill: "Soft Skills & Communication", resource: "https://www.coursera.org/learn/wharton-communication-skills", time: "1 week", cost: "Free" }
];

// Static descriptions for each skill
const skillDescriptions = {
  "Linux & Scripting": "Master Linux basics and shell scripting for automation.",
  "Docker & Containers": "Learn containerization and Docker for modern DevOps.",
  "AWS Certified DevOps Engineer": "Prepare for AWS DevOps certification.",
  "CI/CD & Kubernetes": "Implement CI/CD pipelines and manage Kubernetes clusters.",
  "DevOps Project": "Apply your skills in a real-world DevOps project.",
  "AWS Solutions Architect": "Prepare for AWS Solutions Architect certification.",
  "Terraform Basics": "Learn infrastructure as code with Terraform.",
  "Google Cloud Architect": "Prepare for Google Cloud Architect certification.",
  "Cloud Project": "Build and deploy a cloud-based project.",
  "Prompt Engineering": "Learn to craft effective prompts for AI models.",
  "LLMs & LangChain": "Work with large language models and LangChain framework.",
  "GenAI Project": "Create a generative AI project.",
  "Excel & Power BI": "Analyze data using Excel and Power BI.",
  "SQL & Databases": "Query and manage data with SQL.",
  "Google Data Analytics": "Complete the Google Data Analytics certificate.",
  "Analytics Project": "Work on a real-world analytics project.",
  "JavaScript & React": "Build interactive UIs with JavaScript and React.",
  "Node.js & MongoDB": "Develop backend services with Node.js and MongoDB.",
  "Full Stack Project": "Create a full stack application.",
  "Core Programming": "Strengthen your programming fundamentals.",
  "Relevant Certification": "Earn a certification relevant to your target role.",
  "Build a Portfolio Project": "Showcase your skills with a portfolio project.",
  "Soft Skills & Communication": "Develop essential soft skills for career growth."
};

// Static motivational tips
const motivationalTips = [
  "Every expert was once a beginner. Start your journey today!",
  "Consistency beats intensity. Small steps daily lead to big results.",
  "Learning is a marathon, not a sprint. Pace yourself and enjoy the process.",
  "Celebrate each milestone—progress is progress!"
];

// Get a random motivational tip
function getRandomTip() {
  return motivationalTips[Math.floor(Math.random() * motivationalTips.length)];
}

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
      .post("http://localhost:5000/api/learningpath", {
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
    <div className="w-full">
      <div className="mb-6 p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded shadow-sm flex items-center">
        <FaCheckCircle className="text-cyan-500 mr-3 text-xl" />
        <span className="text-cyan-900 font-medium">{getRandomTip()}</span>   {/* Display a random motivational tip */}
      </div>
      <h2 className="font-bold mb-6 text-2xl text-primary text-center">Personalized Learning Path</h2>
      {loading && <div className="text-center text-accent font-semibold my-8 animate-pulse">Generating your learning path with AI...</div>}
      {error && <div className="text-center text-error my-2">{error}</div>}
      {aiPath && (
        <ol className="relative border-l-2 border-cyan-200 ml-2">  {/* Display the learning path */}
          {aiPath.map((step, idx) => (
            <li key={idx} className="mb-8 ml-6 flex flex-col md:flex-row md:items-center group">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white border-2 border-cyan-400 rounded-full group-hover:bg-cyan-50 transition">
                <span className="text-cyan-600 font-bold">{step.week || idx + 1}</span>
              </span>
              <div className="bg-white rounded-lg shadow-md border border-cyan-100 p-5 w-full md:w-auto md:min-w-[340px]">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-lg text-secondary mr-2">{step.skill}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{step.description}</div>
                <div className="flex flex-wrap gap-3 mb-2">
                  {step.resource && step.link && (
                    <a href={step.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium hover:bg-indigo-200 transition"><FaExternalLinkAlt className="mr-1" />{step.resource}</a> 
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-6 text-sm text-gray-500 text-center">This learning path is a suggested roadmap. Adjust as needed based on your background and goals.</div>
    </div>
  );
}

