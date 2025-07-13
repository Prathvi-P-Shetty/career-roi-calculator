import React, { useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line, CartesianGrid } from "recharts";
import { ArrowDownTrayIcon, ShareIcon, AcademicCapIcon, InformationCircleIcon, UserIcon, FlagIcon, LightBulbIcon, ChartBarIcon, CurrencyDollarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

// Displays the final summary, skill gap, learning path, and ROI analysis. Handles PDF export and sharing.

// Example course/certification recommendations by role
const recommendations = {
  "DevOps Engineer": [
    { name: "Docker Mastery", url: "https://www.udemy.com/course/docker-mastery/" },
    { name: "AWS Certified DevOps Engineer", url: "https://aws.amazon.com/certification/certified-devops-engineer-professional/" },
    { name: "Kubernetes for Developers", url: "https://www.coursera.org/learn/google-kubernetes-engine" },
  ],
  "Cloud Engineer": [
    { name: "AWS Certified Solutions Architect", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
    { name: "Terraform on Azure", url: "https://learn.microsoft.com/en-us/training/paths/terraform-azure/" },
    { name: "Google Cloud Professional Cloud Architect", url: "https://cloud.google.com/certification/cloud-architect" },
  ],
  "GenAI Engineer": [
    { name: "Prompt Engineering for ChatGPT", url: "https://www.coursera.org/learn/prompt-engineering" },
    { name: "LangChain Bootcamp", url: "https://www.udemy.com/course/langchain-bootcamp/" },
    { name: "DeepLearning.AI Generative AI", url: "https://www.deeplearning.ai/courses/generative-ai-with-llms/" },
  ],
  "Data Analyst": [
    { name: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
    { name: "Power BI Data Analyst", url: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/" },
    { name: "Excel to MySQL: Analytics Techniques", url: "https://www.coursera.org/specializations/excel-mysql" },
  ],
  "Full Stack Developer": [
    { name: "The Complete React Developer", url: "https://www.udemy.com/course/complete-react-developer-zero-to-mastery/" },
    { name: "MongoDB University: Node.js Developer", url: "https://university.mongodb.com/" },
    { name: "Meta Back-End Developer", url: "https://www.coursera.org/professional-certificates/meta-back-end-developer" },
  ],
};

const genericRecommendations = [
  { name: "Coursera Career Academy", url: "https://www.coursera.org/career-academy" },
  { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
  { name: "edX Professional Certificates", url: "https://www.edx.org/professional-certificate" },
];

// Add salaryData mapping for summary
const salaryData = {
  // High-Demand IT Roles
  "Account Manager": { 
    fresher: 400000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹4L - ₹12L",
    source: "LinkedIn, 2025",
    tips: "Sales-driven role with commission potential"
  },
  "AI/ML Engineer": { 
    fresher: 500000, 
    average: 1600000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "Glassdoor, 2025",
    tips: "Premium role with high demand and excellent growth"
  },
  "AR/VR Developer": { 
    fresher: 450000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4.5L - ₹18L",
    source: "AmbitionBox, 2025",
    tips: "Emerging field with growing opportunities"
  },
  "Backend Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Core role with strong demand across all sectors"
  },
  "Blockchain Developer": { 
    fresher: 450000, 
    average: 1300000, 
    experienced: 2000000,
    range: "₹4.5L - ₹20L",
    source: "AmbitionBox, 2025",    
    tips: "Emerging technology with niche but high-paying opportunities"
  },
  "BPO Associate": { 
    fresher: 250000, 
    average: 400000, 
    experienced: 600000,
    range: "₹2.5L - ₹6L",
    source: "Naukri, 2025",
    tips: "Entry-level role with good work-life balance"
  },
  "Business Analyst": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "Glassdoor, 2025",
    tips: "Bridge between business and technology"
  },
  "Cloud Engineer": { 
    fresher: 350000, 
    average: 1100000, 
    experienced: 1600000,
    range: "₹3.5L - ₹16L",
    source: "Payscale, 2025",
    tips: "Cloud skills are highly valued across industries"
  },
  "Compliance Officer": { 
    fresher: 400000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹4L - ₹12L",
    source: "LinkedIn, 2025",
    tips: "Critical role in regulated industries"
  },
  "Content Strategist": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Creative role with digital marketing focus"
  },
  "CRM Specialist": { 
    fresher: 350000, 
    average: 750000, 
    experienced: 1100000,
    range: "₹3.5L - ₹11L",
    source: "AmbitionBox, 2025",
    tips: "Customer-focused role with technical skills"
  },
  "Customer Success Manager": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "LinkedIn, 2025",
    tips: "Relationship-driven role with growth potential"
  },
  "Cybersecurity Analyst": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Critical role with increasing importance and demand"
  },
  "Data Analyst": { 
    fresher: 300000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3L - ₹14L",
    source: "Naukri, 2025",
    tips: "Entry point to data science with good growth potential"
  },
  "Data Scientist": { 
    fresher: 450000, 
    average: 1400000, 
    experienced: 2200000,
    range: "₹4.5L - ₹22L",
    source: "Glassdoor, 2025",
    tips: "High-value role requiring strong analytical skills"
  },
  "Database Administrator": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "Payscale, 2025",
    tips: "Essential role with data management focus"
  },
  "DevOps Engineer": { 
    fresher: 350000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹3.5L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "High demand role with excellent growth prospects"
  },
  "Digital Marketing Specialist": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Digital-first role with creative and analytical skills"
  },
  "E-commerce Manager": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "AmbitionBox, 2025",
    tips: "Growing field with online business focus"
  },
  "Embedded Systems Engineer": { 
    fresher: 400000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹4L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Hardware-focused role with IoT opportunities"
  },
  "Entrepreneur": { 
    fresher: 0, 
    average: 0, 
    experienced: 0,
    range: "Variable",
    source: "Self-employed",
    tips: "Income varies based on business success"
  },
  "Finance Analyst": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "Glassdoor, 2025",
    tips: "Financial role with analytical focus"
  },
  "Frontend Developer": { 
    fresher: 300000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3L - ₹12L",
    source: "Naukri, 2025",
    tips: "Good starting point for web development career"
  },
  "Fresher": { 
    fresher: 0, 
    average: 300000, 
    experienced: 500000,
    range: "₹0 - ₹5L",
    source: "Entry-level",
    tips: "Starting point for career development"
  },
  "Full Stack Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Versatile role with opportunities in startups and enterprises"
  },
  "Game Developer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "AmbitionBox, 2025",
    tips: "Creative technical role with gaming industry focus"
  },
  "GenAI Engineer": { 
    fresher: 400000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹4L - ₹25L",
    source: "AmbitionBox, 2025",
    tips: "Emerging field with premium salaries and high demand"
  },
  "Growth Hacker": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "LinkedIn, 2025",
    tips: "Data-driven marketing role with startup focus"
  },
  "Helpdesk Technician": { 
    fresher: 250000, 
    average: 500000, 
    experienced: 800000,
    range: "₹2.5L - ₹8L",
    source: "Naukri, 2025",
    tips: "Entry-level IT support role"
  },
  "HR Specialist": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "Glassdoor, 2025",
    tips: "People-focused role with organizational skills"
  },
  "IT Consultant": { 
    fresher: 400000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹4L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Client-facing technical role with consulting focus"
  },
  "IT Support": { 
    fresher: 250000, 
    average: 500000, 
    experienced: 800000,
    range: "₹2.5L - ₹8L",
    source: "Naukri, 2025",
    tips: "Technical support role with customer service focus"
  },
  "Investment Analyst": { 
    fresher: 400000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹4L - ₹15L",
    source: "Glassdoor, 2025",
    tips: "Financial analysis role with investment focus"
  },
  "Learning & Development": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "LinkedIn, 2025",
    tips: "Training and development role with HR focus"
  },
  "Legal Counsel": { 
    fresher: 500000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹5L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Legal role requiring law degree and expertise"
  },
  "Logistics Manager": { 
    fresher: 350000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3.5L - ₹11L",
    source: "AmbitionBox, 2025",
    tips: "Supply chain role with operational focus"
  },
  "Mobile App Developer": { 
    fresher: 350000, 
    average: 950000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "AmbitionBox, 2025",
    tips: "Growing field with mobile-first companies"
  },
  "Network Engineer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "Payscale, 2025",
    tips: "Network infrastructure role with technical focus"
  },
  "Operations Manager": { 
    fresher: 400000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹4L - ₹12L",
    source: "LinkedIn, 2025",
    tips: "Operational leadership role with management focus"
  },
  "Penetration Tester": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Security testing role with ethical hacking focus"
  },
  "Platform Engineer": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "LinkedIn, 2025",
    tips: "Infrastructure role with platform development focus"
  },
  "Power BI Developer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "AmbitionBox, 2025",
    tips: "Business intelligence role with data visualization focus"
  },
  "Procurement Specialist": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "Naukri, 2025",
    tips: "Sourcing and purchasing role with negotiation focus"
  },
  "Product Manager": { 
    fresher: 500000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "LinkedIn, 2025",
    tips: "Leadership role requiring both technical and business skills"
  },
  "Project Manager": { 
    fresher: 400000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹4L - ₹14L",
    source: "Glassdoor, 2025",
    tips: "Project leadership role with coordination focus"
  },
  "QA Engineer": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Essential role with good work-life balance"
  },
  "Quality Assurance Lead": { 
    fresher: 400000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹4L - ₹14L",
    source: "LinkedIn, 2025",
    tips: "QA leadership role with team management focus"
  },
  "Recruiter": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "Naukri, 2025",
    tips: "Talent acquisition role with HR focus"
  },
  "Release Manager": { 
    fresher: 400000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹4L - ₹14L",
    source: "LinkedIn, 2025",
    tips: "Release coordination role with deployment focus"
  },
  "Risk Analyst": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "Glassdoor, 2025",
    tips: "Risk assessment role with analytical focus"
  },
  "Salesforce Developer": { 
    fresher: 400000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹4L - ₹15L",
    source: "AmbitionBox, 2025",
    tips: "CRM development role with Salesforce platform focus"
  },
  "Scrum Master": { 
    fresher: 400000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹4L - ₹14L",
    source: "LinkedIn, 2025",
    tips: "Agile facilitation role with team coordination focus"
  },
  "Security Engineer": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Security-focused role with technical expertise"
  },
  "SEO Specialist": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Search optimization role with digital marketing focus"
  },
  "Site Reliability Engineer": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "LinkedIn, 2025",
    tips: "Reliability engineering role with infrastructure focus"
  },
  "Solutions Architect": { 
    fresher: 500000, 
    average: 1400000, 
    experienced: 2200000,
    range: "₹5L - ₹22L",
    source: "Glassdoor, 2025",
    tips: "Technical architecture role with system design focus"
  },
  "Startup Founder": { 
    fresher: 0, 
    average: 0, 
    experienced: 0,
    range: "Variable",
    source: "Self-employed",
    tips: "Income varies based on business success"
  },
  "Support Engineer": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "Naukri, 2025",
    tips: "Technical support role with customer service focus"
  },
  "Supply Chain Analyst": { 
    fresher: 350000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3.5L - ₹11L",
    source: "AmbitionBox, 2025",
    tips: "Supply chain analysis role with logistics focus"
  },
  "System Administrator": { 
    fresher: 350000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3.5L - ₹12L",
    source: "LinkedIn, 2025",
    tips: "System management role with infrastructure focus"
  },
  "Technical Writer": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "Naukri, 2025",
    tips: "Documentation role with technical communication focus"
  },
  "Test Automation Engineer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "LinkedIn, 2025",
    tips: "Automation testing role with technical focus"
  },
  "UI/UX Designer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "Payscale, 2025",
    tips: "Creative role with focus on user experience"
  },
  "Venture Capital Analyst": { 
    fresher: 500000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹5L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Investment analysis role with VC focus"
  },
  
  // Important Non-IT Roles
  "Teacher": { 
    fresher: 250000, 
    average: 400000, 
    experienced: 600000,
    range: "₹2.5L - ₹6L",
    source: "Education sector",
    tips: "Education sector with stable government opportunities"
  },
  "Accountant": { 
    fresher: 300000, 
    average: 500000, 
    experienced: 800000,
    range: "₹3L - ₹8L",
    source: "Glassdoor, 2025",
    tips: "Financial role with steady demand across industries"
  },
  "Sales Executive": { 
    fresher: 250000, 
    average: 500000, 
    experienced: 800000,
    range: "₹2.5L - ₹8L",
    source: "Naukri, 2025",
    tips: "Sales role with commission potential"
  },
  "Marketing Executive": { 
    fresher: 300000, 
    average: 600000, 
    experienced: 900000,
    range: "₹3L - ₹9L",
    source: "AmbitionBox, 2025",
    tips: "Marketing role with digital skills focus"
  },
  "HR Executive": { 
    fresher: 300000, 
    average: 500000, 
    experienced: 800000,
    range: "₹3L - ₹8L",
    source: "Naukri, 2025",
    tips: "HR role with people management focus"
  },
  "Bank Clerk": { 
    fresher: 250000, 
    average: 400000, 
    experienced: 600000,
    range: "₹2.5L - ₹6L",
    source: "Banking sector",
    tips: "Banking role with government/PSU opportunities"
  }
};

// Add placeholder entries for all roles in salaryData
const allRoles = [
  "Account Manager", "AI/ML Engineer", "AR/VR Developer", "Backend Developer", "Blockchain Developer", "BPO Associate", "Business Analyst", "Cloud Engineer", "Compliance Officer", "Content Strategist", "CRM Specialist", "Customer Success Manager", "Cybersecurity Analyst", "Data Analyst", "Data Scientist", "Database Administrator", "DevOps Engineer", "Digital Marketing Specialist", "E-commerce Manager", "Embedded Systems Engineer", "Entrepreneur", "Finance Analyst", "Frontend Developer", "Fresher", "Full Stack Developer", "Game Developer", "GenAI Engineer", "Growth Hacker", "Helpdesk Technician", "HR Specialist", "IT Consultant", "IT Support", "Investment Analyst", "Learning & Development", "Legal Counsel", "Logistics Manager", "Mobile App Developer", "Network Engineer", "Operations Manager", "Penetration Tester", "Platform Engineer", "Power BI Developer", "Procurement Specialist", "Product Manager", "Project Manager", "QA Engineer", "Quality Assurance Lead", "Recruiter", "Release Manager", "Risk Analyst", "Salesforce Developer", "Scrum Master", "Security Engineer", "SEO Specialist", "Site Reliability Engineer", "Solutions Architect", "Startup Founder", "Support Engineer", "Supply Chain Analyst", "System Administrator", "Technical Writer", "Test Automation Engineer", "UI/UX Designer", "Venture Capital Analyst", "Teacher", "Accountant", "Sales Executive", "Operations Manager", "Marketing Executive", "HR Executive", "Business Analyst", "Bank Clerk"
];
for (const role of allRoles) {
  if (!salaryData[role]) {
    salaryData[role] = {
      average: null,
      range: "N/A",
      source: "Research required",
      tips: "No reliable data available"
    };
  }
}

// Skill-specific learning resources
const skillResources = {
  "Python": { name: "Python for Everybody", url: "https://www.coursera.org/specializations/python" },
  "JavaScript": { name: "JavaScript Algorithms and Data Structures", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
  "React": { name: "React - The Complete Guide", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
  "Node.js": { name: "Node.js Developer Course", url: "https://www.udemy.com/course/nodejs-the-complete-guide/" },
  "AWS": { name: "AWS Certified Solutions Architect", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  "Docker": { name: "Docker Mastery", url: "https://www.udemy.com/course/docker-mastery/" },
  "Kubernetes": { name: "Kubernetes for Developers", url: "https://www.coursera.org/learn/google-kubernetes-engine" },
  "SQL": { name: "SQL for Data Science", url: "https://www.coursera.org/learn/sql-for-data-science" },
  "Tableau": { name: "Tableau Desktop Specialist", url: "https://www.tableau.com/learn/certification" },
  "Power BI": { name: "Power BI Data Analyst", url: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/" },
  "Excel": { name: "Excel Skills for Business", url: "https://www.coursera.org/specializations/excel" },
  "Machine Learning": { name: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
  "Deep Learning": { name: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
  "Cybersecurity": { name: "Cybersecurity Fundamentals", url: "https://www.coursera.org/specializations/cybersecurity" },
  "Network Security": { name: "Network Security", url: "https://www.coursera.org/learn/network-security" },
  "UI/UX Design": { name: "UI/UX Design Specialization", url: "https://www.coursera.org/specializations/ui-ux-design" },
  "Agile": { name: "Agile Project Management", url: "https://www.coursera.org/specializations/agile-development" },
  "Scrum": { name: "Scrum Master Certification", url: "https://www.scrum.org/courses" },
  "Communication": { name: "Communication Skills", url: "https://www.coursera.org/learn/wharton-communication-skills" },
  "Leadership": { name: "Leadership Skills", url: "https://www.coursera.org/specializations/leadership" },
};

// Helper functions
function getFoundationSkills(currentRole, targetRole) {
  const foundationSkills = {
    "Full Stack Developer": ["HTML", "CSS", "JavaScript", "Git", "Basic Programming"],
    "Data Analyst": ["Excel", "SQL", "Basic Statistics", "Data Visualization"],
    "DevOps Engineer": ["Linux", "Git", "Basic Scripting", "Networking"],
    "Cloud Engineer": ["Networking", "Linux", "Basic Programming", "Security Fundamentals"],
    "GenAI Engineer": ["Python", "Mathematics", "Machine Learning Basics", "Programming"],
    "Cybersecurity Analyst": ["Networking", "Linux", "Security Fundamentals", "Basic Programming"],
    "UI/UX Designer": ["Design Principles", "Figma", "User Research", "Prototyping"],
    "Product Manager": ["Business Analysis", "Agile", "Communication", "Data Analysis"],
  };
  return foundationSkills[targetRole] || ["Communication", "Problem Solving", "Basic Computer Skills"];
}

function getAdvancedSkills(currentRole, targetRole) {
  const advancedSkills = {
    "Full Stack Developer": ["React", "Node.js", "Database Design", "API Development"],
    "Data Analyst": ["Python", "Advanced SQL", "Statistical Analysis", "Business Intelligence"],
    "DevOps Engineer": ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms"],
    "Cloud Engineer": ["AWS/Azure/GCP", "Terraform", "Containerization", "Monitoring"],
    "GenAI Engineer": ["Deep Learning", "NLP", "LLMs", "Prompt Engineering"],
    "Cybersecurity Analyst": ["Penetration Testing", "Incident Response", "SIEM", "Threat Hunting"],
    "UI/UX Designer": ["Advanced Design Tools", "User Testing", "Design Systems", "Accessibility"],
    "Product Manager": ["Product Strategy", "User Research", "Data Analysis", "Stakeholder Management"],
  };
  return advancedSkills[targetRole] || ["Advanced Communication", "Leadership", "Strategic Thinking"];
}

function getRecommendedCertifications(targetRole) {
  const certifications = {
    "Full Stack Developer": ["Meta Back-End Developer", "MongoDB Developer", "React Developer"],
    "Data Analyst": ["Google Data Analytics", "Power BI Data Analyst", "Tableau Desktop Specialist"],
    "DevOps Engineer": ["AWS Certified DevOps Engineer", "Docker Certified Associate", "Kubernetes Administrator"],
    "Cloud Engineer": ["AWS Solutions Architect", "Azure Solutions Architect", "Google Cloud Architect"],
    "GenAI Engineer": ["DeepLearning.AI Generative AI", "Prompt Engineering", "Machine Learning Engineer"],
    "Cybersecurity Analyst": ["CompTIA Security+", "CISSP", "CEH"],
    "UI/UX Designer": ["Google UX Design", "Figma Design", "Adobe Creative Suite"],
    "Product Manager": ["CSPO", "PMP", "Google Project Management"],
  };
  return certifications[targetRole] || ["Industry-specific certifications"];
}

function getTransitionType(currentRole, targetRole) {
  if (!currentRole || !targetRole) return "unknown";
  
  const nonITRoles = [
    "Accountant", "Architect", "Banker", "Chef", "Civil Engineer", "Dentist", "Doctor", "Event Manager", "Fashion Designer", "Graphic Designer", "Hotel Manager", "HR Manager", "Interior Designer", "Journalist", "Lawyer", "Logistics Coordinator", "Marketing Manager", "Mechanical Engineer", "Nurse", "Operations Executive", "Pharmacist", "Physiotherapist", "Professor", "Public Relations Manager", "Real Estate Agent", "Research Analyst", "Retail Store Manager", "Sales Executive", "School Principal", "Social Media Manager", "Teacher", "Tourism Manager", "Trainer", "Travel Agent"
  ];
  
  const itRoles = [
    "Software Developer", "Data Scientist", "DevOps Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer", "UI/UX Designer", "Product Manager", "QA Engineer", "System Administrator", "Network Engineer", "Cybersecurity Analyst", "Cloud Engineer", "Data Engineer", "Machine Learning Engineer", "Blockchain Developer", "Game Developer", "Embedded Systems Engineer", "Database Administrator", "IT Consultant", "Technical Writer", "Scrum Master", "Business Analyst", "Solution Architect"
  ];
  
  // Check if roles are IT or non-IT
  const isCurrentRoleIT = itRoles.includes(currentRole);
  const isTargetRoleIT = itRoles.includes(targetRole);
  const isCurrentRoleNonIT = nonITRoles.includes(currentRole) || currentRole === "Fresher";
  const isTargetRoleNonIT = nonITRoles.includes(targetRole);
  
  // Determine transition type
  if (isCurrentRoleNonIT && isTargetRoleIT) {
    return "nonit-to-it";
  } else if (isCurrentRoleIT && isTargetRoleIT && currentRole !== targetRole) {
    return "it-to-it";
  } else if (isCurrentRoleNonIT && isTargetRoleNonIT && currentRole !== targetRole) {
    return "nonit-to-nonit";
  } else if (currentRole === targetRole) {
    return "same-domain";
  } else if (isCurrentRoleIT && isTargetRoleNonIT) {
    return "it-to-nonit";
  }
  
  return "unknown";
}

function calculateExpectedCTC(currentRole, targetRole, currentCTC) {
  if (!targetRole || !salaryData[targetRole]) return 0;
  const transitionType = getTransitionType(currentRole, targetRole);
  let projected = salaryData[targetRole].average;
  
  if (transitionType === "nonit-to-it") {
    // Career switcher to IT - start with fresher salary
    projected = salaryData[targetRole].fresher;
  } else if (transitionType === "it-to-it") {
    // IT role transition - 20% hike with cap
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.2, salaryData[targetRole].average);
  } else if (transitionType === "nonit-to-nonit") {
    // Non-IT to different non-IT role - 15% hike with cap
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.15, salaryData[targetRole].average);
  } else if (transitionType === "it-to-nonit") {
    // IT to non-IT transition - 10% hike with cap
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.1, salaryData[targetRole].average);
  } else if (transitionType === "same-domain") {
    // Same role upskilling - 35% hike with cap
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.35, salaryData[targetRole].average);
  }
  
  return Math.round(projected);
}

export default function Summary({ data, currentRole, targetRole, gapSkills, learningPath, fresherSkills }) {
  const summaryRef = useRef();

  const handleDownload = () => {
    const element = summaryRef.current;
    const opt = {
      margin: 1,
      filename: `career-roi-summary-${targetRole}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Career ROI Summary',
        text: `Check out my career transition plan from ${currentRole} to ${targetRole}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const chartData = [
    { name: 'Current', salary: data.currentCTC, fill: '#1e40af' },
    { name: 'Expected', salary: data.expectedCTC, fill: '#0891b2' },
  ];

  const foundationSkills = getFoundationSkills(currentRole, targetRole);
  const advancedSkills = getAdvancedSkills(currentRole, targetRole);
  const certifications = getRecommendedCertifications(targetRole);
  const roleRecommendations = recommendations[targetRole] || genericRecommendations;
  
  // Get transition type and description
  const transitionType = getTransitionType(currentRole, targetRole);
  const getTransitionDescription = (type) => {
    switch(type) {
      case "nonit-to-it":
        return "Career Switch to IT";
      case "it-to-it":
        return "IT Role Transition";
      case "nonit-to-nonit":
        return "Non-IT Role Transition";
      case "it-to-nonit":
        return "IT to Non-IT Transition";
      case "same-domain":
        return "Same Role Upskilling";
      default:
        return "Career Transition";
    }
  };

  return (
    <div ref={summaryRef} className="w-full mx-auto px-6 py-8 bg-white rounded-3xl shadow-edtech-lg border border-primary-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrophyIcon className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Your Career ROI Summary</h1>
        </div>
        <p className="text-lg text-secondary">
          Transitioning from <span className="font-semibold text-primary">{currentRole}</span> to <span className="font-semibold text-primary">{targetRole}</span>
        </p>
      </div>

      {/* Transition Type Indicator */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-2xl border border-primary-200 mb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-lg font-semibold text-primary">{getTransitionDescription(transitionType)}</span>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
        </div>
        <p className="text-sm text-secondary text-center mt-2">
          {transitionType === "nonit-to-it" && "Starting fresh in the tech industry with entry-level salary expectations"}
          {transitionType === "it-to-it" && "Leveraging your tech experience for a 20% salary increase"}
          {transitionType === "nonit-to-nonit" && "Transferring skills to a new domain with moderate salary growth"}
          {transitionType === "it-to-nonit" && "Applying tech skills to non-tech roles for work-life balance"}
          {transitionType === "same-domain" && "Upskilling within your current role for significant salary growth"}
        </p>
      </div>

      {/* ROI Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 shadow-edtech">
          <div className="flex items-center gap-3 mb-3">
            <CurrencyDollarIcon className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-bold text-primary">Current Salary</h3>
          </div>
          <div className="text-2xl font-bold text-primary">₹{data.currentCTC.toLocaleString('en-IN')}</div>
          <p className="text-sm text-secondary mt-1">per year</p>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200 shadow-edtech">
          <div className="flex items-center gap-3 mb-3">
            <ChartBarIcon className="w-8 h-8 text-accent" />
            <h3 className="text-lg font-bold text-accent">Expected Salary</h3>
          </div>
          <div className="text-2xl font-bold text-accent">₹{data.expectedCTC.toLocaleString('en-IN')}</div>
          <p className="text-sm text-secondary mt-1">per year</p>
          </div>

        <div className="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-2xl border border-success-200 shadow-edtech">
          <div className="flex items-center gap-3 mb-3">
            <LightBulbIcon className="w-8 h-8 text-success" />
            <h3 className="text-lg font-bold text-success">ROI</h3>
          </div>
          <div className="text-2xl font-bold text-success">{data.roi}%</div>
          <p className="text-sm text-secondary mt-1">annual increase</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-2xl border border-primary-200 mb-8">
        <h3 className="text-xl font-bold text-primary mb-4 text-center">Salary Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#475569" />
              <YAxis stroke="#475569" />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Salary']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="salary" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
          </div>
          
      {/* Skills and Learning Path */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Skills Gap */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 shadow-edtech">
          <div className="flex items-center gap-3 mb-4">
            <AcademicCapIcon className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-primary">Skills to Learn</h3>
          </div>
          <div className="space-y-3">
            {gapSkills.slice(0, 5).map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                </div>
                <span className="text-secondary font-medium">{skill}</span>
              </div>
            ))}
            {gapSkills.length > 5 && (
              <p className="text-sm text-secondary mt-2">+{gapSkills.length - 5} more skills</p>
            )}
          </div>
        </div>

        {/* Learning Journey */}
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200 shadow-edtech">
          <div className="flex items-center gap-3 mb-4">
            <FlagIcon className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-bold text-accent">Learning Journey</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Duration:</span>
              <span className="font-semibold text-accent">{learningPath.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Projects:</span>
              <span className="font-semibold text-accent">{learningPath.projects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Certifications:</span>
              <span className="font-semibold text-accent">{learningPath.certifications.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Learning Path */}
      {learningPath && learningPath.certifications && learningPath.certifications.length > 0 && (
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 shadow-edtech mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AcademicCapIcon className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-primary">Your Complete Learning Path</h3>
          </div>
          <div className="space-y-3">
            {learningPath.certifications.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-secondary font-medium">{skill}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-xl border border-primary-200">
            <div className="text-sm text-secondary">
              <div className="font-semibold text-primary mb-1">How to Learn:</div>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Start with foundational skills (weeks 1-2)</li>
                <li>Build practical projects (weeks 3-6)</li>
                <li>Earn industry certifications (weeks 7-10)</li>
                <li>Create a portfolio showcasing your work</li>
                <li>Network with professionals in your target role</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Expected Salary Guidance */}
      {targetRole && salaryData[targetRole] && (
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-2xl border border-accent-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-bold text-accent">Expected Salary with Hot Skills</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-xl border border-accent-200 shadow-edtech">
              <div className="font-semibold text-accent text-sm mb-1">Entry Level</div>
              <div className="text-lg font-bold text-primary">₹{salaryData[targetRole].fresher?.toLocaleString('en-IN') || 'N/A'}</div>
              <div className="text-xs text-secondary mt-1">Starting salary with basic skills</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-accent-200 shadow-edtech">
              <div className="font-semibold text-accent text-sm mb-1">With Hot Skills</div>
              <div className="text-lg font-bold text-primary">₹{salaryData[targetRole].average?.toLocaleString('en-IN') || 'N/A'}</div>
              <div className="text-xs text-secondary mt-1">With in-demand certifications & projects</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-accent-200 shadow-edtech">
              <div className="font-semibold text-accent text-sm mb-1">Senior Level</div>
              <div className="text-lg font-bold text-primary">₹{salaryData[targetRole].experienced?.toLocaleString('en-IN') || 'N/A'}</div>
              <div className="text-xs text-secondary mt-1">3-5 years with advanced skills</div>
            </div>
          </div>
          <div className="text-sm text-secondary">
            <div className="font-semibold text-primary mb-1">Hot Skills for {targetRole}:</div>
            <div className="text-xs">
              {targetRole === "Full Stack Developer" && "React, Node.js, Cloud Platforms, DevOps"}
              {targetRole === "Data Analyst" && "Python, SQL, Power BI, Machine Learning"}
              {targetRole === "DevOps Engineer" && "Docker, Kubernetes, AWS, CI/CD"}
              {targetRole === "Cloud Engineer" && "AWS/Azure/GCP, Terraform, Kubernetes, Security"}
              {targetRole === "GenAI Engineer" && "Python, Deep Learning, LLMs, Prompt Engineering"}
              {targetRole === "Cybersecurity Analyst" && "Network Security, SIEM, Penetration Testing, Incident Response"}
              {targetRole === "UI/UX Designer" && "Figma, User Research, Prototyping, Design Systems"}
              {targetRole === "Product Manager" && "Agile, Data Analysis, User Research, Stakeholder Management"}
              {!["Full Stack Developer", "Data Analyst", "DevOps Engineer", "Cloud Engineer", "GenAI Engineer", "Cybersecurity Analyst", "UI/UX Designer", "Product Manager"].includes(targetRole) && "Industry-specific certifications and practical projects"}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-success-50 to-accent-50 p-6 rounded-2xl border border-success-200 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <LightBulbIcon className="w-6 h-6 text-success" />
          <h3 className="text-lg font-bold text-success">Recommended Courses</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleRecommendations.slice(0, 6).map((rec, index) => (
              <a 
              key={index}
                href={rec.url} 
                target="_blank" 
                rel="noopener noreferrer" 
              className="block p-4 bg-white rounded-xl border border-success-200 hover:border-success-300 transition-all duration-200 shadow-edtech hover:shadow-edtech-lg"
              >
              <div className="font-semibold text-primary mb-1">{rec.name}</div>
              <div className="text-xs text-secondary">Click to learn more</div>
              </a>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-edtech hover:shadow-edtech-lg transition-all duration-200"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-xl font-semibold shadow-edtech hover:shadow-edtech-lg transition-all duration-200"
        >
          <ShareIcon className="w-5 h-5" />
          Share Plan
        </button>
      </div>
    </div>
  );
}
