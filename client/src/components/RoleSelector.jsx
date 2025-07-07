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

  // Custom styles for a compact, professional dropdown
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 40,
      borderColor: state.isFocused ? '#0d9488' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 2px #99f6e4' : 'none',
      backgroundColor: '#fff',
      fontSize: 15,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      maxHeight: 260,
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      borderRadius: 8,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? '#fff' : '#1e293b',
      backgroundColor: state.isSelected ? '#0d9488' : state.isFocused ? '#e0f2fe' : '#fff',
      fontWeight: state.isSelected ? 600 : 400,
      fontSize: 15,
    }),
    multiValue: (base) => ({ ...base, backgroundColor: '#e0f2fe', color: '#0d9488', fontSize: 14 }),
    multiValueLabel: (base) => ({ ...base, color: '#0d9488', fontWeight: 500 }),
    placeholder: (base) => ({ ...base, color: '#64748b', fontSize: 15 }),
  };

  return (
    <div className="space-y-6">
      {/* Current Role Selector */}
      <div>
        <label className="block font-semibold mb-1 text-primary">Current Role</label>
        <CreatableSelect
          isClearable
          options={currentRoleOptions}
          value={currentRoleOptions.find(opt => opt.value === currentRole) || null}
          onChange={handleCurrentRoleChange}
          onCreateOption={handleCreateCurrentRole}
          placeholder="Type or select current role..."
          classNamePrefix="react-select"
          styles={selectStyles}
          menuPlacement="auto"
        />
      </div>

      {/* Fresher Skill Selector */}
      {currentRole === "Fresher" && (
        <div>
          <label className="block font-semibold mb-1 text-primary">Skills You Know (Type or Select)</label>
          <CreatableSelect
            isMulti
            options={skillOptions}
            value={skillOptions.filter(opt => fresherSkills.includes(opt.value))}
            onChange={handleFresherSkillsChange}
            onCreateOption={handleCreateSkill}
            placeholder="Type or select skills..."
            classNamePrefix="react-select"
            styles={selectStyles}
            menuPlacement="auto"
          />
        </div>
      )}

      {/* Target Role Selector */}
      <div>
        <label className="block font-semibold mb-1 text-primary">Target Role</label>
        <CreatableSelect
          isClearable
          options={targetRoleOptions}
          value={targetRoleOptions.find(opt => opt.value === targetRole) || null}
          onChange={handleTargetRoleChange}
          onCreateOption={handleCreateTargetRole}
          placeholder="Type or select target role..."
          classNamePrefix="react-select"
          styles={selectStyles}
          menuPlacement="auto"
        />
      </div>
    </div>
  );
}
