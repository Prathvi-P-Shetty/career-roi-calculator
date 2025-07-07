import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { InformationCircleIcon } from '@heroicons/react/24/outline';

/**
 * SkillGap component displays the missing skills between current and target roles.
 * @param {Object} props
 * @param {string} props.currentRole - The user's current role.
 * @param {string} props.targetRole - The user's target role.
 * @param {Function} props.setGapSkills - Function to update the gap skills in parent state.
 * @param {Array} props.fresherSkills - list of existing skills provided by fresher.
 */

// Map of skills for each role (fallback)
const skillsMap = {
  "Support Engineer": ["Customer Support", "Troubleshooting", "Email Handling"],
  "Software Tester": ["Manual Testing", "Bug Reporting", "Test Cases"],
  "BPO Associate": ["Voice Process", "Communication", "Ticketing"],
  "Full Stack Developer": ["JavaScript", "React", "Node.js", "MongoDB"],
  "Data Analyst": ["Excel", "SQL", "Tableau", "Python"],
  "DevOps Engineer": ["Linux", "Git", "Docker", "CI/CD", "Kubernetes"],
  "Cloud Engineer": ["AWS", "IAM", "S3", "EC2", "Terraform"],
  "SRE": ["Monitoring", "Automation", "Incident Response"],
  "GenAI Engineer": ["Python", "LLMs", "Prompt Engineering", "LangChain"]
};

// Example resources for skills
const skillResources = {
  "JavaScript": { desc: "Programming language for web development.", url: "https://javascript.info/" },
  "React": { desc: "Frontend library for building UIs.", url: "https://react.dev/" },
  "Node.js": { desc: "JavaScript runtime for backend.", url: "https://nodejs.org/" },
  "MongoDB": { desc: "NoSQL database.", url: "https://university.mongodb.com/" },
  "Python": { desc: "Popular programming language.", url: "https://www.learnpython.org/" },
  "SQL": { desc: "Database query language.", url: "https://www.sqlcourse.com/" },
  "AWS": { desc: "Cloud computing platform.", url: "https://aws.amazon.com/training/" },
  "Docker": { desc: "Containerization platform.", url: "https://www.docker.com/101-tutorial" },
  "Kubernetes": { desc: "Container orchestration.", url: "https://kubernetes.io/docs/tutorials/" },
  "Linux": { desc: "Operating system.", url: "https://linuxjourney.com/" },
  "CI/CD": { desc: "Continuous Integration/Deployment.", url: "https://www.atlassian.com/continuous-delivery/ci-vs-cd" },
  "Prompt Engineering": { desc: "Designing prompts for AI models.", url: "https://www.coursera.org/learn/prompt-engineering" },
  "LLMs": { desc: "Large Language Models.", url: "https://www.deeplearning.ai/short-courses/large-language-models/" },
  "Terraform": { desc: "Infrastructure as code.", url: "https://learn.hashicorp.com/terraform" },
  "Power BI": { desc: "Business analytics tool.", url: "https://learn.microsoft.com/en-us/power-bi/" },
  "Excel": { desc: "Spreadsheet software.", url: "https://exceljet.net/" },
  "Communication": { desc: "Effective workplace communication.", url: "https://www.coursera.org/learn/wharton-communication-skills" },
  "Customer Support": { desc: "Supporting customers.", url: "https://www.coursera.org/learn/customer-service" },
  "Manual Testing": { desc: "Software testing by hand.", url: "https://www.guru99.com/manual-testing.html" },
  "Automation": { desc: "Automating tasks and tests.", url: "https://www.coursera.org/specializations/automation" },
  "Incident Response": { desc: "Handling IT incidents.", url: "https://www.coursera.org/learn/incident-response" },
};

// Helper to extract skills from AI text
const parseSkillsFromAI = (result) => {
  // Look for 'Skills to learn:' and parse the list
  // First Priority — Direct Match with "Skills to learn:"
  const match = result.match(/Skills to learn:?\s*([\s\S]*)/i);
  // if found, return the clean skill list immediately
  if (match && match[1]) {
    return match[1].split(/,|\n|\*/).map(s => s.trim()).filter(Boolean);  
  }
  // Fallback to previous logic
  // Fallback — Match Bullet or Numbered Lists
  const lines = result.split('\n');
  // If no “Skills to learn” section, split the whole response into lines.
  const skillLines = lines.filter(line =>
    /^[-*•\d.]/.test(line.trim()) || (line.toLowerCase().includes('skills:') && line.split(':')[1])
  );
  // If found, return the clean skill list immediately
  const skills = skillLines.map(line =>
    line.replace(/^[-*•\d.\s]+/, '').replace(/^skills:/i, '').trim()
  ).filter(Boolean);
  // If no “Skills to learn” section, split the whole response into lines.
  // Last Fallback — Try Matching "Skill Gap"
  if (skills.length === 0) {
    const match2 = result.match(/Skill[s]? Gap[s]?:?([\s\S]*?)\n/);
    if (match2 && match2[1]) {
      return match2[1].split(/,|\n|\*/).map((s) => s.trim()).filter(Boolean);
    }
  }
  return skills;
};

{/* Summary of the parseSkillsFromAI function:
  Best case: If the string contains "Skills to learn:", extract the list right after it.
  Fallback: Look for bullets, numbered lists, or lines starting with "Skills:".
  Final fallback: Look for "Skill Gap(s):" line and extract the items.
  Return: The list of cleaned skills.
*/}

// SkillGap component
export default function SkillGap({ currentRole, targetRole, setGapSkills, fresherSkills }) {
  const [gap, setGap] = useState([]);
  const [aiDescriptions, setAIDescriptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch skill gap data on role change
  useEffect(() => {
    // If no current or target role, return
    if (!currentRole || !targetRole) return;
    // Set loading state to true
    setLoading(true);
    // Clear any previous errors
    setError("");
    // Clear any previous gaps
    setGap([]);
    // Clear any previous AI descriptions
    setAIDescriptions({});

    // Determine known skills
    let knownSkills = [];
    // If current role is Fresher, use fresherSkills, otherwise use skillsMap[currentRole]
    if (currentRole === "Fresher") {
      knownSkills = fresherSkills || [];
    } else {
      knownSkills = skillsMap[currentRole] || [];
    }
    // Call backend API
    axios
      .post("http://localhost:5000/api/skillgap", {
        currentRole,
        targetRole,
        knownSkills
      })
      .then((res) => {
        // Parse skills from AI output
        const skills = parseSkillsFromAI(res.data.result);
        // Set the gap skills
        setGap(skills);
        // Update the parent component's state
        setGapSkills(skills);

        // Try to extract short descriptions/resources from AI output (future: parse more)
        // For now, use static mapping
        const descs = {};
        // For each skill, if it exists in skillResources, set the description and URL
        skills.forEach(skill => {
          if (skillResources[skill]) {
            descs[skill] = skillResources[skill];
              // Otherwise, set the description to an empty string and the URL to a Google search for the skill + "course"
          } else {
            descs[skill] = { desc: "", url: "https://www.google.com/search?q=" + encodeURIComponent(skill + " course") };
          }
        });
        // Set the AI descriptions
        setAIDescriptions(descs);
      })
      // If the API call fails, set the error message and fallback to static mapping
      .catch((err) => {
        setError("Could not fetch from AI. Showing static mapping.");
        // Fallback to static mapping (skillsMap[targetRole])
        const targetSkills = skillsMap[targetRole] || [];
        // Get the missing skills
        const missing = targetSkills.filter((skill) => !knownSkills.includes(skill));
        // Set the gap skills
        setGap(missing);
        // Update the parent component's state
        setGapSkills(missing);

        // Try to extract short descriptions/resources from AI output (future: parse more)
        // For now, use static mapping
        const descs = {};
        // For each skill, if it exists in skillResources, set the description and URL
        // Otherwise, set the description to an empty string and the URL to a Google search for the skill + "course"
        missing.forEach(skill => {
          if (skillResources[skill]) {
            descs[skill] = skillResources[skill];
          } else {
            descs[skill] = { desc: "", url: "https://www.google.com/search?q=" + encodeURIComponent(skill + " course") };
          }
        });
        setAIDescriptions(descs);
      })
      // Set loading state to false
      .finally(() => setLoading(false));
  }, [currentRole, targetRole, setGapSkills, fresherSkills]);
  
  // Return the component
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-bold">Skill Gap</h2>
        <span className="relative group cursor-pointer">
          <InformationCircleIcon className="inline w-5 h-5 text-accent align-text-bottom ml-1" />
          <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
            The skill gap is the set of skills you need to learn to move from your current to your target role.
          </span>
        </span>
      </div>
      {/* Loading state */}
      {loading && <div className="my-4 text-primary font-semibold animate-pulse">Analyzing with AI...</div>}
      {/* Error state */}
      {error && <div className="my-2 text-error text-sm">{error}</div>}
      {/* Gap state */}
      {gap.length > 0 && (
        <div className="mb-2 p-2 bg-secondary-light text-secondary rounded text-base">
          <strong>Key Gaps:</strong> {gap.slice(0, 3).join(", ")} {gap.length > 3 && `+${gap.length - 3} more`}
        </div>
      )}
      {/* Gap list */}
      <ul className="list-disc ml-5 mb-4 text-base">
        {gap.map((skill, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold text-primary">{skill}</span>
            {/* Description */}
            {aiDescriptions[skill]?.desc && <span className="ml-2 text-gray-600">- {aiDescriptions[skill].desc}</span>}
            {/* Resource */}
            {aiDescriptions[skill]?.url && (
              <a href={aiDescriptions[skill].url} target="_blank" rel="noopener noreferrer" className="ml-2 text-accent hover:underline text-sm">Resource</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
