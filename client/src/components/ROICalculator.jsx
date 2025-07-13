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

// Determines the type of career transition
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

// Estimate expected salary based on current role and transition type
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
        description: "10% hike (minimal skills)"
      },
      {
        type: "Realistic",
        salary: `₹${Math.round(current * 1.2).toLocaleString('en-IN')}`,
        description: "20% hike (good skills)"
      },
      {
        type: "Optimistic",
        salary: `₹${Math.round(current * 1.3).toLocaleString('en-IN')}`,
        description: "30% hike (with strong skills)"
      }
    ];
  } else if (transitionType === "nonit-to-nonit") {
    const current = Number(currentCTC) || data.fresher;
    guidance.scenarios = [
      {
        type: "Conservative",
        salary: `₹${Math.round(current * 1.05).toLocaleString('en-IN')}`,
        description: "5% hike (basic transition)"
      },
      {
        type: "Realistic",
        salary: `₹${Math.round(current * 1.15).toLocaleString('en-IN')}`,
        description: "15% hike (good skills transfer)"
      },
      {
        type: "Optimistic",
        salary: `₹${Math.round(current * 1.25).toLocaleString('en-IN')}`,
        description: "25% hike (strong domain expertise)"
      }
    ];
  } else if (transitionType === "it-to-nonit") {
    const current = Number(currentCTC) || data.fresher;
    guidance.scenarios = [
      {
        type: "Conservative",
        salary: `₹${Math.round(current * 1.05).toLocaleString('en-IN')}`,
        description: "5% hike (basic transition)"
      },
      {
        type: "Realistic",
        salary: `₹${Math.round(current * 1.1).toLocaleString('en-IN')}`,
        description: "10% hike (leverage tech skills)"
      },
      {
        type: "Optimistic",
        salary: `₹${Math.round(current * 1.2).toLocaleString('en-IN')}`,
        description: "20% hike (tech + domain expertise)"
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
    
    // Special handling for different transition types
    const transitionType = getTransitionType(currentRole, targetRole);
    if (transitionType === "nonit-to-it" && exp <= ctc) {
      // For non-IT to IT transitions, allow proceeding even if expected is lower
      // This is because they're essentially starting fresh in IT
      setError("");
      const gain = exp - ctc;
      const roi = ctc > 0 ? (gain / ctc) * 100 : 0;
      const result = {
        currentCTC: ctc,
        expectedCTC: exp,
        gain,
        roi: roi.toFixed(2),
        breakeven: gain > 0 ? "Immediate" : "Career Transition",
        targetRole,
        currentRole,
        transitionType
      };
      setRoiResult(result);
      setRoiData && setRoiData(result);
      return;
    } else if (transitionType === "it-to-nonit" && exp <= ctc) {
      // For IT to non-IT transitions, allow proceeding with warning
      setError("Note: Expected salary is lower than current. This transition may be for work-life balance or career preference.");
      const gain = exp - ctc;
      const roi = ctc > 0 ? (gain / ctc) * 100 : 0;
      const result = {
        currentCTC: ctc,
        expectedCTC: exp,
        gain,
        roi: roi.toFixed(2),
        breakeven: gain > 0 ? "Immediate" : "Lifestyle Choice",
        targetRole,
        currentRole,
        transitionType
      };
      setRoiResult(result);
      setRoiData && setRoiData(result);
      return;
    } else if (transitionType === "nonit-to-nonit" && exp <= ctc) {
      // For non-IT to non-IT transitions, allow proceeding with context
      setError("Note: Expected salary is lower than current. This may be for career growth or personal preference.");
      const gain = exp - ctc;
      const roi = ctc > 0 ? (gain / ctc) * 100 : 0;
      const result = {
        currentCTC: ctc,
        expectedCTC: exp,
        gain,
        roi: roi.toFixed(2),
        breakeven: gain > 0 ? "Immediate" : "Career Growth",
        targetRole,
        currentRole,
        transitionType
      };
      setRoiResult(result);
      setRoiData && setRoiData(result);
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
      currentRole,
      transitionType
    };
    setRoiResult(result);
    setRoiData && setRoiData(result);
  }, [currentCTC, expectedCTC, targetRole, currentRole, setRoiData]);

  const salaryGuidance = getSalaryGuidance(currentRole, targetRole, currentCTC);

  return (
    <div className="w-full mx-auto px-6 py-8 bg-white rounded-3xl shadow-edtech-lg border border-primary-100 overflow-hidden">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">ROI Estimator</h2>
      
      {/* Salary Guidance Section */}
      {salaryGuidance && (
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-2xl border border-primary-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-xl text-primary">{salaryGuidance.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {salaryGuidance.scenarios.map((scenario, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-primary-100 shadow-edtech">
                <div className="font-semibold text-primary text-sm mb-1">{scenario.type}</div>
                <div className="text-xl font-bold text-primary">{scenario.salary}/year</div>
                <div className="text-xs text-secondary mt-1">{scenario.description}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-primary mb-2">
            <LightBulbIcon className="w-5 h-5 text-accent" />
            <span className="font-medium">{salaryGuidance.tip}</span>
          </div>
          
          <div className="text-xs text-secondary">
            Salary Range: <span className="font-semibold text-primary">{salaryGuidance.range}</span> | Source: {salaryGuidance.source}
          </div>
        </div>
      )}
      
      {/* Salary Overview Cards */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 border-2 border-primary-100 bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center shadow-edtech">
          <CalculatorIcon className="w-12 h-12 text-primary mb-3" />
          <p className="text-sm font-medium text-secondary mb-1">Current CTC</p>
          <p className="text-2xl font-bold text-primary">₹{Number(currentCTC || 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-2xl p-6 border-2 border-accent-100 bg-gradient-to-br from-accent-50 to-accent-100 flex flex-col items-center justify-center shadow-edtech">
          <ChartBarIcon className="w-12 h-12 text-accent mb-3" />
          <p className="text-sm font-medium text-secondary mb-1">Expected CTC</p>
          <p className="text-2xl font-bold text-accent">₹{Number(expectedCTC || 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-2xl p-6 border-2 border-success-100 bg-gradient-to-br from-success-50 to-success-100 flex flex-col items-center justify-center shadow-edtech">
          <LightBulbIcon className="w-12 h-12 text-success mb-3" />
          <p className="text-sm font-medium text-secondary mb-1">Annual Gain</p>
          <p className="text-2xl font-bold text-success">₹{roiResult?.gain.toLocaleString('en-IN') || '0'}</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-lg font-bold text-primary">Your Current CTC (₹/year)</label>
          <input
            type="number"
            placeholder="Enter your current salary"
            className="w-full p-4 border-2 border-secondary-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-lg"
            value={currentCTC}
            onChange={handleCurrentCTCChange}
            min={0}
          />
          {currentRole === "Fresher" && (
            <div className="text-sm text-secondary mt-2 flex items-center gap-2">
              <span className="text-accent">💡</span>
              As a fresher, you can enter 0 or your internship/stipend amount
            </div>
          )}
        </div>
        <div className="space-y-3">
          <label className="block text-lg font-bold text-primary flex items-center gap-2">
            Expected Salary (₹/year)
            {autoFilled && <span className="text-sm text-accent font-medium">(Auto-calculated)</span>}
          </label>
          <input
            type="number"
            placeholder={expectedCTC ? `Suggested: ₹${expectedCTC}` : 'Auto-calculated based on market data'}
            className="w-full p-4 border-2 border-accent-200 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-100 transition-all duration-200 text-lg bg-accent-50 text-accent font-semibold"
            value={expectedCTC}
            onChange={handleExpectedCTCChange}
            min={0}
          />
          <div className="text-sm text-secondary mt-2 flex items-center gap-2">
            <span className="text-accent">💡</span>
            Use the salary guidance above to set realistic expectations
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {showErrors && error && (
        <div className="text-error text-base font-semibold bg-error-50 border-l-4 border-error p-4 rounded-xl mb-6">
          <div className="flex items-center gap-2">
            <span className="text-error">⚠️</span>
            {error}
          </div>
        </div>
      )}
      
      {/* Special message for non-IT to IT transitions */}
      {getTransitionType(currentRole, targetRole) === "nonit-to-it" && (
        <div className="text-accent text-base font-semibold bg-accent-50 border-l-4 border-accent p-4 rounded-xl mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent">💡</span>
            <div>
              <div className="font-bold">Career Transition Mode</div>
              <div className="text-sm font-normal">You're transitioning from {currentRole} to {targetRole}. Even if your expected salary is lower initially, you're building a new career path with better long-term prospects.</div>
            </div>
          </div>
        </div>
      )}
      
      {/* ROI Result Display */}
      {roiResult && (
        <div className="mt-6 p-6 bg-gradient-to-r from-success-50 to-success-100 border-2 border-success-200 rounded-2xl shadow-edtech">
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {roiResult.roi}% ROI
            </div>
            <div className="text-lg text-success-dark font-semibold mb-2">
              Annual Gain: ₹{roiResult.gain.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-success-dark">
              Breakeven: {roiResult.breakeven}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

