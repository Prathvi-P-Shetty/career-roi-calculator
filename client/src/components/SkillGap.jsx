import React, { useEffect, useState } from "react";
import axios from "axios";
import { InformationCircleIcon, LightBulbIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

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
  // High-Demand IT Roles
  "Account Manager": ["Sales Techniques", "CRM", "Client Relationship", "Negotiation", "Communication"],
  "AI/ML Engineer": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Statistics"],
  "AR/VR Developer": ["Unity", "Unreal Engine", "C#", "3D Modeling", "Computer Vision", "Spatial Computing"],
  "Backend Developer": ["Node.js", "Python", "Java", "Databases", "APIs", "Microservices"],
  "Blockchain Developer": ["Solidity", "Smart Contracts", "Web3", "Ethereum", "Cryptography", "DApp Development"],
  "BPO Associate": ["Voice Process", "Communication", "Ticketing", "Customer Support", "Process Management"],
  "Business Analyst": ["Requirements Gathering", "Process Modeling", "SQL", "Excel", "Stakeholder Management"],
  "Cloud Engineer": ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Infrastructure as Code"],
  "Compliance Officer": ["Regulatory Compliance", "Risk Assessment", "Legal Knowledge", "Audit Procedures"],
  "Content Strategist": ["Content Planning", "SEO", "Copywriting", "Analytics", "Brand Strategy"],
  "CRM Specialist": ["Salesforce", "HubSpot", "Customer Data", "Automation", "Analytics"],
  "Customer Success Manager": ["Customer Onboarding", "Relationship Management", "Product Knowledge", "Analytics"],
  "Cybersecurity Analyst": ["Network Security", "Penetration Testing", "SIEM", "Incident Response", "Threat Hunting"],
  "Data Analyst": ["Excel", "SQL", "Tableau", "Python", "Statistical Analysis", "Data Visualization"],
  "Data Scientist": ["Python", "Machine Learning", "Statistics", "SQL", "Deep Learning", "Data Engineering"],
  "Database Administrator": ["SQL", "MySQL", "PostgreSQL", "Oracle", "Database Design", "Performance Tuning"],
  "DevOps Engineer": ["Linux", "Git", "Docker", "CI/CD", "Kubernetes", "Cloud Platforms"],
  "Digital Marketing Specialist": ["SEO", "SEM", "Social Media", "Analytics", "Content Marketing", "Email Marketing"],
  "E-commerce Manager": ["E-commerce Platforms", "Digital Marketing", "Analytics", "Customer Experience", "Inventory Management"],
  "Embedded Systems Engineer": ["C/C++", "Microcontrollers", "RTOS", "Hardware Design", "Firmware Development"],
  "Entrepreneur": ["Business Strategy", "Financial Planning", "Marketing", "Leadership", "Innovation"],
  "Finance Analyst": ["Financial Modeling", "Excel", "Accounting", "Data Analysis", "Risk Assessment"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular"],
  "Fresher": ["Communication", "Problem Solving", "Basic Computer Skills", "Learning Ability", "Teamwork"],
  "Full Stack Developer": ["JavaScript", "React", "Node.js", "MongoDB", "APIs", "Database Design"],
  "Game Developer": ["Unity", "C#", "Game Design", "3D Modeling", "Physics", "Animation"],
  "GenAI Engineer": ["Python", "LLMs", "Prompt Engineering", "LangChain", "Deep Learning", "NLP"],
  "Growth Hacker": ["Digital Marketing", "Analytics", "A/B Testing", "Product Marketing", "User Acquisition"],
  "Helpdesk Technician": ["Technical Support", "Troubleshooting", "Customer Service", "IT Infrastructure", "Ticketing Systems"],
  "HR Specialist": ["Recruitment", "Employee Relations", "HRIS", "Compliance", "Performance Management"],
  "IT Consultant": ["Technical Architecture", "Project Management", "Client Communication", "Problem Solving"],
  "IT Support": ["Technical Troubleshooting", "Customer Service", "Hardware/Software Support", "Network Basics"],
  "Investment Analyst": ["Financial Analysis", "Market Research", "Excel", "Risk Assessment", "Portfolio Management"],
  "Learning & Development": ["Training Design", "Instructional Design", "Learning Management Systems", "Assessment"],
  "Legal Counsel": ["Legal Research", "Contract Law", "Compliance", "Risk Management", "Negotiation"],
  "Logistics Manager": ["Supply Chain Management", "Inventory Control", "Transportation", "Analytics", "Process Optimization"],
  "Mobile App Developer": ["React Native", "Flutter", "iOS", "Android", "Mobile UI/UX", "App Store Optimization"],
  "Network Engineer": ["Cisco", "Routing", "Switching", "Network Security", "Network Design", "Troubleshooting"],
  "Operations Manager": ["Process Management", "Team Leadership", "Analytics", "Strategic Planning", "Performance Optimization"],
  "Penetration Tester": ["Ethical Hacking", "Vulnerability Assessment", "Security Tools", "Network Security", "Web Security"],
  "Platform Engineer": ["Infrastructure as Code", "Cloud Platforms", "DevOps", "Automation", "System Design"],
  "Power BI Developer": ["Power BI", "DAX", "Data Modeling", "SQL", "Business Intelligence", "Data Visualization"],
  "Procurement Specialist": ["Sourcing", "Negotiation", "Supplier Management", "Contract Management", "Cost Analysis"],
  "Product Manager": ["Product Strategy", "User Research", "Data Analysis", "Stakeholder Management", "Agile"],
  "Project Manager": ["Agile", "Scrum", "Risk Management", "Stakeholder Management", "Project Planning"],
  "QA Engineer": ["Manual Testing", "Automation Testing", "Selenium", "Test Planning", "Quality Assurance"],
  "Quality Assurance Lead": ["Test Strategy", "Team Leadership", "Automation", "Quality Metrics", "Process Improvement"],
  "Recruiter": ["Talent Acquisition", "Sourcing", "Interviewing", "HRIS", "Employer Branding"],
  "Release Manager": ["Release Planning", "Deployment", "Change Management", "Risk Assessment", "Coordination"],
  "Risk Analyst": ["Risk Assessment", "Data Analysis", "Modeling", "Compliance", "Reporting"],
  "Salesforce Developer": ["Salesforce", "Apex", "Lightning", "SOQL", "Integration", "Custom Development"],
  "Scrum Master": ["Agile", "Scrum", "Team Facilitation", "Process Improvement", "Conflict Resolution"],
  "Security Engineer": ["Network Security", "Application Security", "Incident Response", "Security Architecture", "Threat Modeling"],
  "SEO Specialist": ["Search Engine Optimization", "Keyword Research", "Technical SEO", "Analytics", "Content Strategy"],
  "Site Reliability Engineer": ["Monitoring", "Automation", "Incident Response", "Infrastructure", "Performance Optimization"],
  "Solutions Architect": ["System Design", "Technical Architecture", "Cloud Platforms", "Integration", "Scalability"],
  "Startup Founder": ["Business Strategy", "Leadership", "Fundraising", "Product Development", "Team Building"],
  "Support Engineer": ["Technical Support", "Troubleshooting", "Customer Service", "IT Infrastructure", "Problem Solving"],
  "Supply Chain Analyst": ["Supply Chain Management", "Data Analysis", "Logistics", "Inventory Management", "Process Optimization"],
  "System Administrator": ["Linux", "Windows Server", "Networking", "Scripting", "Infrastructure Management"],
  "Technical Writer": ["Technical Documentation", "Content Creation", "User Guides", "API Documentation", "Communication"],
  "Test Automation Engineer": ["Selenium", "Cypress", "Jest", "Python", "CI/CD", "Test Frameworks"],
  "UI/UX Designer": ["Figma", "User Research", "Prototyping", "Design Systems", "User Experience"],
  "Venture Capital Analyst": ["Financial Analysis", "Market Research", "Due Diligence", "Investment Evaluation", "Industry Analysis"],
  
  // Important Non-IT Roles
  "Teacher": ["Curriculum Development", "Classroom Management", "Educational Technology", "Assessment", "Communication"],
  "Accountant": ["Financial Accounting", "Tax Preparation", "Excel", "QuickBooks", "Financial Reporting"],
  "Sales Executive": ["Sales Techniques", "CRM", "Negotiation", "Communication", "Relationship Building"],
  "Marketing Executive": ["Digital Marketing", "SEO", "Social Media", "Analytics", "Brand Management"],
  "HR Executive": ["Recruitment", "Employee Relations", "HRIS", "Compliance", "Performance Management"],
  "Bank Clerk": ["Customer Service", "Financial Transactions", "Compliance", "Cash Handling", "Record Keeping"]
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
  // If no "Skills to learn" section, split the whole response into lines.
  const skillLines = lines.filter(line =>
    /^[-*•\d.]/.test(line.trim()) || (line.toLowerCase().includes('skills:') && line.split(':')[1])
  );
  // If found, return the clean skill list immediately
  const skills = skillLines.map(line =>
    line.replace(/^[-*•\d.\s]+/, '').replace(/^skills:/i, '').trim()
  ).filter(Boolean);
  // If no "Skills to learn" section, split the whole response into lines.
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
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/skillgap`, {
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
        
        // If target role is not in skillsMap, provide generic skills based on role type
        let missing = [];
        if (targetSkills.length > 0) {
          // Get the missing skills
          missing = targetSkills.filter((skill) => !knownSkills.includes(skill));
        } else {
          // Generic skills based on role category
          const genericSkills = {
            "Developer": ["Programming", "Version Control", "Problem Solving", "Communication"],
            "Engineer": ["Technical Skills", "Problem Solving", "Communication", "Teamwork"],
            "Analyst": ["Data Analysis", "Excel", "SQL", "Communication"],
            "Manager": ["Leadership", "Communication", "Project Management", "Strategic Thinking"],
            "Designer": ["Design Tools", "Creativity", "User Research", "Communication"],
            "Specialist": ["Domain Expertise", "Problem Solving", "Communication", "Continuous Learning"]
          };
          
          // Determine category based on role name
          let category = "Specialist";
          if (targetRole.toLowerCase().includes("developer")) category = "Developer";
          else if (targetRole.toLowerCase().includes("engineer")) category = "Engineer";
          else if (targetRole.toLowerCase().includes("analyst")) category = "Analyst";
          else if (targetRole.toLowerCase().includes("manager")) category = "Manager";
          else if (targetRole.toLowerCase().includes("designer")) category = "Designer";
          
          missing = genericSkills[category] || genericSkills["Specialist"];
        }
        
        // Ensure we always have at least some skills
        if (missing.length === 0) {
          missing = ["Communication", "Problem Solving", "Continuous Learning", "Adaptability"];
        }
        
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
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-3xl shadow-edtech-lg border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <AcademicCapIcon className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-primary">Skill Gap Analysis</h2>
        {/* <span className="relative group cursor-pointer">
          <InformationCircleIcon className="inline w-6 h-6 text-accent align-text-bottom ml-1" />
          <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10 shadow-edtech-lg">
            The skill gap is the set of skills you need to learn to move from your current to your target role.
          </span>
        </span> */}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="my-6 text-center">
          <div className="inline-flex items-center gap-3 text-primary font-semibold animate-pulse">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Analyzing with AI...
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="my-4 p-4 bg-warning-50 border border-warning-200 rounded-xl text-warning-dark">
          <div className="flex items-center gap-2">
            <span className="text-warning">⚠️</span>
            {error}
          </div>
        </div>
      )}

      {/* Gap summary */}
      {gap.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 text-primary rounded-2xl border border-accent-200">
          <div className="flex items-center gap-2 mb-2">
            <LightBulbIcon className="w-5 h-5 text-accent" />
            <span className="font-bold text-lg">Key Skills to Learn:</span>
          </div>
          <div className="text-base font-medium">
            {gap.slice(0, 3).join(", ")} {gap.length > 3 && `+${gap.length - 3} more`}
          </div>
        </div>
      )}

      {/* Gap list */}
      {gap.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary mb-4">Detailed Skill Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gap.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200 shadow-edtech">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-primary text-lg">{skill}</h4>
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    #{index + 1}
                  </span>
                </div>
                {aiDescriptions[skill]?.desc && (
                  <p className="text-secondary text-sm mb-3">{aiDescriptions[skill].desc}</p>
                )}
                <a
                  href={aiDescriptions[skill]?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium text-sm transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No gap state */}
      {!loading && !error && gap.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-success mb-2">No Skill Gap Found!</h3>
          <p className="text-secondary">
            You already have the skills needed for this transition. Consider exploring more advanced roles or specializations.
          </p>
        </div>
      )}
    </div>
  );
}
