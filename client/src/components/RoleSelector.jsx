// RoleSelector.jsx
// Provides searchable, creatable dropdowns for selecting current and target roles, and for fresher skills. Used in the first step of the wizard.

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";     // Importing creatable dropdowns for search + create functionality

// Define all roles that can be selected
const expandedRoles = [
  // IT/Tech Roles
  "Account Manager", "AI/ML Engineer", "AR/VR Developer", "Backend Developer", "Blockchain Developer", "BPO Associate", "Business Analyst", "Cloud Engineer", "Compliance Officer", "Content Strategist", "CRM Specialist", "Customer Success Manager", "Cybersecurity Analyst", "Data Analyst", "Data Scientist", "Database Administrator", "DevOps Engineer", "Digital Marketing Specialist", "E-commerce Manager", "Embedded Systems Engineer", "Entrepreneur", "Finance Analyst", "Frontend Developer", "Fresher", "Full Stack Developer", "Game Developer", "GenAI Engineer", "Growth Hacker", "Helpdesk Technician", "HR Specialist", "IT Consultant", "IT Support", "Investment Analyst", "Learning & Development", "Legal Counsel", "Logistics Manager", "Mobile App Developer", "Network Engineer", "Operations Manager", "Penetration Tester", "Platform Engineer", "Power BI Developer", "Procurement Specialist", "Product Manager", "Project Manager", "QA Engineer", "Quality Assurance Lead", "Recruiter", "Release Manager", "Risk Analyst", "Salesforce Developer", "Scrum Master", "Security Engineer", "SEO Specialist", "Site Reliability Engineer", "Solutions Architect", "Startup Founder", "Support Engineer", "Supply Chain Analyst", "System Administrator", "Technical Writer", "Test Automation Engineer", "UI/UX Designer", "Venture Capital Analyst",
  // Curated Non-IT Roles
  "Teacher", "Accountant", "Sales Executive", "Operations Manager", "Marketing Executive", "HR Executive", "Business Analyst", "Bank Clerk"
];

// List of common tech, soft, and domain skills that can be selected
const expandedSkills = [
  // Programming
  "C", "C++", "C#", "Go", "Java", "JavaScript", "Kotlin", "PHP", "Python", "R", "Ruby", "Rust", "Scala", "SQL", "Swift", "TypeScript",
  // Web/Frontend
  "HTML", "CSS", "Sass", "Less", "Bootstrap", "Tailwind CSS", "React", "Redux", "Vue.js", "Angular", "Next.js", "Gatsby", "jQuery",
  // Backend/Databases
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Laravel", "MongoDB", "MySQL", "PostgreSQL", "Oracle", "Firebase", "Redis",
  // Cloud/DevOps
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins", "Git", "Linux", "Bash", "PowerShell", "Ansible", "Puppet", "Chef",
  // Data/AI
  "Pandas", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn", "Tableau", "Power BI", "Excel", "Matplotlib", "Seaborn", "Prompt Engineering", "LLMs", "LangChain",
  // Security
  "Penetration Testing", "Incident Response", "Network Security", "IAM", "SIEM", "Vulnerability Assessment",
  // Soft Skills
  "Communication", "Teamwork", "Leadership", "Problem Solving", "Critical Thinking", "Time Management", "Customer Support", "Presentation Skills", "Negotiation", "Project Management",
  // Testing/QA
  "Manual Testing", "Automation", "Selenium", "Cypress", "Jest", "Mocha", "Chai", "Test Cases", "Bug Reporting",
  // Misc
  "Business Analysis", "Agile", "Scrum", "Kanban", "Design Thinking", "Wireframing", "Prototyping", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Content Writing", "SEO", "Digital Marketing", "Salesforce", "SAP", "ERP", "CRM", "E-commerce", "Logistics", "Supply Chain", "Procurement", "Finance", "Legal", "Compliance"
];

// Sort the roles and skills alphabetically and map them to objects with 'value' and 'label'
const sortedRoleOptions = expandedRoles.map(r => ({ value: r, label: r })).sort((a, b) => a.label.localeCompare(b.label));
const sortedSkillOptions = expandedSkills.map(s => ({ value: s, label: s })).sort((a, b) => a.label.localeCompare(b.label));

// Remove 'Fresher' from target role options
const sortedTargetRoleOptions = sortedRoleOptions.filter(opt => opt.value !== "Fresher");

export default function RoleSelector({ currentRole, setCurrentRole, targetRole, setTargetRole, fresherSkills, setFresherSkills }) {
  // Each dropdown has its own options
  const [currentRoleOptions, setCurrentRoleOptions] = useState(sortedRoleOptions);
  const [targetRoleOptions, setTargetRoleOptions] = useState(sortedTargetRoleOptions);
  const [skillOptions, setSkillOptions] = useState(sortedSkillOptions);

  // Handle current role change
  const handleCurrentRoleChange = (selected) => {
    setCurrentRole(selected ? selected.value : "");
  };
  // Handle target role change
  const handleTargetRoleChange = (selected) => {
    setTargetRole(selected ? selected.value : "");
  };
  // Add custom role to current role options
  const handleCreateCurrentRole = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setCurrentRoleOptions(prev => [...prev, newOption].sort((a, b) => a.label.localeCompare(b.label)));
    setCurrentRole(inputValue);
  };
  // Add custom role to target role options
  const handleCreateTargetRole = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setTargetRoleOptions(prev => [...prev, newOption].sort((a, b) => a.label.localeCompare(b.label)));
    setTargetRole(inputValue);
  };
  // Handle fresher skill change
  const handleFresherSkillsChange = (selected) => {
    setFresherSkills(selected ? selected.map(opt => opt.value) : []);
  };
  // Add custom skill to options
  const handleCreateSkill = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSkillOptions(prev => [...prev, newOption].sort((a, b) => a.label.localeCompare(b.label)));
    setFresherSkills(prev => [...prev, inputValue]);
  };

  // Custom styles for a modern, professional dropdown
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 44,
      borderColor: state.isFocused ? '#1e40af' : '#e2e8f0',
      borderWidth: '2px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(30, 64, 175, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      fontSize: 14,
      borderRadius: '12px',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: '#1e40af',
        boxShadow: '0 2px 6px rgba(30, 64, 175, 0.15)',
      },
      '@media (min-width: 640px)': {
        minHeight: 48,
        fontSize: 16,
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      maxHeight: 200,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      '@media (min-width: 640px)': {
        maxHeight: 280,
      },
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? '#ffffff' : '#1e293b',
      backgroundColor: state.isSelected ? '#1e40af' : state.isFocused ? '#eff6ff' : '#ffffff',
      fontWeight: state.isSelected ? 600 : 400,
      fontSize: 14,
      padding: '10px 14px',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        backgroundColor: state.isSelected ? '#1e40af' : '#eff6ff',
      },
      '@media (min-width: 640px)': {
        fontSize: 15,
        padding: '12px 16px',
      },
    }),
    multiValue: (base) => ({ 
      ...base, 
      backgroundColor: '#eff6ff', 
      color: '#1e40af', 
      fontSize: 12,
      borderRadius: '6px',
      border: '1px solid #dbeafe',
      '@media (min-width: 640px)': {
        fontSize: 14,
        borderRadius: '8px',
      },
    }),
    multiValueLabel: (base) => ({ 
      ...base, 
      color: '#1e40af', 
      fontWeight: 500,
      padding: '3px 6px',
      '@media (min-width: 640px)': {
        padding: '4px 8px',
      },
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#1e40af',
      '&:hover': {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
      },
    }),
    placeholder: (base) => ({ 
      ...base, 
      color: '#64748b', 
      fontSize: 14,
      fontWeight: 400,
      '@media (min-width: 640px)': {
        fontSize: 16,
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1e293b',
      fontSize: 14,
      fontWeight: 500,
      '@media (min-width: 640px)': {
        fontSize: 16,
      },
    }),
    input: (base) => ({
      ...base,
      color: '#1e293b',
      fontSize: 14,
      '@media (min-width: 640px)': {
        fontSize: 16,
      },
    }),
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4">
      {/* Current Role Selector */}
      <div className="space-y-2 sm:space-y-3">
        <label className="block font-bold text-base sm:text-lg text-primary">Current Role</label>
        <div className="relative">
          <CreatableSelect
            isClearable
            options={currentRoleOptions}
            value={currentRoleOptions.find(opt => opt.value === currentRole) || null}
            onChange={handleCurrentRoleChange}
            onCreateOption={handleCreateCurrentRole}
            placeholder="Type or select your current role..."
            classNamePrefix="react-select"
            styles={selectStyles}
            menuPlacement="auto"
            isSearchable={true}
          />
        </div>
      </div>

      {/* Fresher Skill Selector */}
      {currentRole === "Fresher" && (
        <div className="space-y-2 sm:space-y-3">
          <label className="block font-bold text-base sm:text-lg text-primary">Skills You Know (Type or Select)</label>
          <div className="relative">
            <CreatableSelect
              isMulti
              options={skillOptions}
              value={skillOptions.filter(opt => fresherSkills.includes(opt.value))}
              onChange={handleFresherSkillsChange}
              onCreateOption={handleCreateSkill}
              placeholder="Type or select skills you already know..."
              classNamePrefix="react-select"
              styles={selectStyles}
              menuPlacement="auto"
              isSearchable={true}
            />
          </div>
          <p className="text-xs sm:text-sm text-secondary mt-2">
            Select the skills you already have to get a more accurate learning path.
          </p>
        </div>
      )}

      {/* Target Role Selector */}
      <div className="space-y-2 sm:space-y-3">
        <label className="block font-bold text-base sm:text-lg text-primary">Target Role</label>
        <div className="relative">
          <CreatableSelect
            isClearable
            options={targetRoleOptions}
            value={targetRoleOptions.find(opt => opt.value === targetRole) || null}
            onChange={handleTargetRoleChange}
            onCreateOption={handleCreateTargetRole}
            placeholder="Type or select your target role..."
            classNamePrefix="react-select"
            styles={selectStyles}
            menuPlacement="auto"
            isSearchable={true}
          />
        </div>
        <p className="text-xs sm:text-sm text-secondary mt-2">
          Choose the role you want to transition to for personalized guidance.
        </p>
      </div>
    </div>
  );
}
