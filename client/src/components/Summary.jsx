import React, { useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line, CartesianGrid } from "recharts";
import { ArrowDownTrayIcon, ShareIcon, AcademicCapIcon, InformationCircleIcon, UserIcon, FlagIcon, LightBulbIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
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
  "DevOps Engineer": { 
    fresher: 350000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹3.5L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "High demand role with excellent growth prospects"
  },
  "Cloud Engineer": { 
    fresher: 350000, 
    average: 1100000, 
    experienced: 1600000,
    range: "₹3.5L - ₹16L",
    source: "Payscale, 2025",
    tips: "Cloud skills are highly valued across industries"
  },
  "GenAI Engineer": { 
    fresher: 400000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹4L - ₹25L",
    source: "AmbitionBox, 2025",
    tips: "Emerging field with premium salaries and high demand"
  },
  "Data Analyst": { 
    fresher: 300000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3L - ₹14L",
    source: "Naukri, 2025",
    tips: "Entry point to data science with good growth potential"
  },
  "Full Stack Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Versatile role with opportunities in startups and enterprises"
  },
  "Data Scientist": { 
    fresher: 450000, 
    average: 1400000, 
    experienced: 2200000,
    range: "₹4.5L - ₹22L",
    source: "Glassdoor, 2025",
    tips: "High-value role requiring strong analytical skills"
  },
  "Machine Learning Engineer": { 
    fresher: 500000, 
    average: 1600000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "Payscale, 2025",
    tips: "Premium role with excellent career progression"
  },
  "Frontend Developer": { 
    fresher: 300000, 
    average: 800000, 
    experienced: 1200000,
    range: "₹3L - ₹12L",
    source: "Naukri, 2025",
    tips: "Good starting point for web development career"
  },
  "Backend Developer": { 
    fresher: 350000, 
    average: 1000000, 
    experienced: 1500000,
    range: "₹3.5L - ₹15L",
    source: "LinkedIn, 2025",
    tips: "Core role with strong demand across all sectors"
  },
  "Mobile App Developer": { 
    fresher: 350000, 
    average: 950000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "AmbitionBox, 2025",
    tips: "Growing field with mobile-first companies"
  },
  "Cybersecurity Analyst": { 
    fresher: 400000, 
    average: 1200000, 
    experienced: 1800000,
    range: "₹4L - ₹18L",
    source: "Glassdoor, 2025",
    tips: "Critical role with increasing importance and demand"
  },
  "Product Manager": { 
    fresher: 500000, 
    average: 1500000, 
    experienced: 2500000,
    range: "₹5L - ₹25L",
    source: "LinkedIn, 2025",
    tips: "Leadership role requiring both technical and business skills"
  },
  "QA Engineer": { 
    fresher: 300000, 
    average: 700000, 
    experienced: 1100000,
    range: "₹3L - ₹11L",
    source: "Naukri, 2025",
    tips: "Essential role with good work-life balance"
  },
  "UI/UX Designer": { 
    fresher: 350000, 
    average: 900000, 
    experienced: 1400000,
    range: "₹3.5L - ₹14L",
    source: "Payscale, 2025",
    tips: "Creative role with focus on user experience"
  },
  "Blockchain Developer": { 
    fresher: 450000, 
    average: 1300000, 
    experienced: 2000000,
    range: "₹4.5L - ₹20L",
    source: "AmbitionBox, 2025",
    tips: "Emerging technology with niche but high-paying opportunities"
  },
  // Non-IT roles
  "Teacher": { average: 350000, range: "₹2L - ₹6L", source: "AmbitionBox, 2025", tips: "Education sector, varies by city and experience" },
  "Sales Executive": { average: 400000, range: "₹2.5L - ₹8L", source: "Naukri, 2025", tips: "Incentives can boost total pay" },
  "Accountant": { average: 350000, range: "₹2.2L - ₹7L", source: "Glassdoor, 2025", tips: "Steady demand in all industries" },
  "Operations Manager": { average: 600000, range: "₹4L - ₹12L", source: "LinkedIn, 2025", tips: "Growth with experience and sector" },
  "Marketing Executive": { average: 450000, range: "₹2.5L - ₹9L", source: "AmbitionBox, 2025", tips: "Digital skills can increase pay" },
  "HR Executive": { average: 400000, range: "₹2.5L - ₹8L", source: "Naukri, 2025", tips: "HR analytics is a growth area" },
  "Business Analyst": { average: 650000, range: "₹4L - ₹12L", source: "Glassdoor, 2025", tips: "Strong analytical skills in demand" },
  "Bank Clerk": { average: 350000, range: "₹2.5L - ₹6L", source: "AmbitionBox, 2025", tips: "Stable government/PSU jobs" },
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
  "Machine Learning": { name: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
  "Data Science": { name: "Data Science Specialization", url: "https://www.coursera.org/specializations/jhu-data-science" },
  "SQL": { name: "SQL for Data Science", url: "https://www.coursera.org/learn/sql-for-data-science" },
  "MongoDB": { name: "MongoDB University", url: "https://university.mongodb.com/" },
  "Git": { name: "Git and GitHub for Beginners", url: "https://www.udemy.com/course/git-and-github-bootcamp/" },
  "Linux": { name: "Linux Command Line Basics", url: "https://www.udemy.com/course/linux-command-line-basics/" },
  "Terraform": { name: "Terraform on Azure", url: "https://learn.microsoft.com/en-us/training/paths/terraform-azure/" },
  "Ansible": { name: "Ansible for DevOps", url: "https://www.udemy.com/course/ansible-for-devops/" },
  "Jenkins": { name: "Jenkins Pipeline Tutorial", url: "https://www.jenkins.io/doc/book/pipeline/" },
  "Prometheus": { name: "Prometheus Monitoring", url: "https://prometheus.io/docs/introduction/getting_started/" },
  "Grafana": { name: "Grafana Tutorial", url: "https://grafana.com/tutorials/" },
  "Elasticsearch": { name: "Elasticsearch Tutorial", url: "https://www.elastic.co/guide/index.html" },
  "Kafka": { name: "Apache Kafka Tutorial", url: "https://kafka.apache.org/documentation/" },
  "Redis": { name: "Redis Tutorial", url: "https://redis.io/topics/tutorial" },
  "PostgreSQL": { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" },
  "MySQL": { name: "MySQL Tutorial", url: "https://www.mysqltutorial.org/" },
  "TypeScript": { name: "TypeScript Tutorial", url: "https://www.typescriptlang.org/docs/" },
  "Angular": { name: "Angular Tutorial", url: "https://angular.io/tutorial" },
  "Vue.js": { name: "Vue.js Tutorial", url: "https://vuejs.org/guide/" },
  "Next.js": { name: "Next.js Tutorial", url: "https://nextjs.org/learn" },
  "Django": { name: "Django Tutorial", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/" },
  "Flask": { name: "Flask Tutorial", url: "https://flask.palletsprojects.com/en/2.3.x/quickstart/" },
  "Spring Boot": { name: "Spring Boot Tutorial", url: "https://spring.io/guides" },
  "Laravel": { name: "Laravel Tutorial", url: "https://laravel.com/docs" },
  "PHP": { name: "PHP Tutorial", url: "https://www.w3schools.com/php/" },
  "Java": { name: "Java Tutorial", url: "https://docs.oracle.com/javase/tutorial/" },
  "C++": { name: "C++ Tutorial", url: "https://www.cplusplus.com/doc/tutorial/" },
  "Go": { name: "Go Tutorial", url: "https://golang.org/doc/tutorial/" },
  "Rust": { name: "Rust Tutorial", url: "https://doc.rust-lang.org/book/" },
  "Swift": { name: "Swift Tutorial", url: "https://docs.swift.org/swift-book/" },
  "Kotlin": { name: "Kotlin Tutorial", url: "https://kotlinlang.org/docs/home.html" },
  "Scala": { name: "Scala Tutorial", url: "https://docs.scala-lang.org/tour/tour-of-scala.html" },
  "R": { name: "R Tutorial", url: "https://www.r-project.org/help.html" },
  "Tableau": { name: "Tableau Tutorial", url: "https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-home.htm" },
  "Power BI": { name: "Power BI Tutorial", url: "https://learn.microsoft.com/en-us/power-bi/" },
  "Excel": { name: "Excel Tutorial", url: "https://support.microsoft.com/en-us/office/excel-help-and-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb" },
  "Matplotlib": { name: "Matplotlib Tutorial", url: "https://matplotlib.org/stable/tutorials/index.html" },
  "Seaborn": { name: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html" },
  "Pandas": { name: "Pandas Tutorial", url: "https://pandas.pydata.org/docs/getting_started/tutorials.html" },
  "NumPy": { name: "NumPy Tutorial", url: "https://numpy.org/doc/stable/user/quickstart.html" },
  "TensorFlow": { name: "TensorFlow Tutorial", url: "https://www.tensorflow.org/tutorials" },
  "PyTorch": { name: "PyTorch Tutorial", url: "https://pytorch.org/tutorials/" },
  "Scikit-learn": { name: "Scikit-learn Tutorial", url: "https://scikit-learn.org/stable/tutorial/" },
  "Prompt Engineering": { name: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" },
  "LangChain": { name: "LangChain Tutorial", url: "https://python.langchain.com/docs/get_started/introduction" },
  "LLMs": { name: "Large Language Models Course", url: "https://www.deeplearning.ai/short-courses/" },
  "Penetration Testing": { name: "Penetration Testing Course", url: "https://www.offensive-security.com/pwk-oscp/" },
  "Incident Response": { name: "Incident Response Training", url: "https://www.sans.org/courses/incident-response-handling/" },
  "Network Security": { name: "Network Security Course", url: "https://www.coursera.org/learn/network-security" },
  "IAM": { name: "Identity and Access Management", url: "https://aws.amazon.com/iam/" },
  "SIEM": { name: "SIEM Fundamentals", url: "https://www.splunk.com/en_us/training/courses/siem-fundamentals.html" },
  "Vulnerability Assessment": { name: "Vulnerability Assessment Course", url: "https://www.coursera.org/learn/vulnerability-assessment" },
  "Communication": { name: "Communication Skills Course", url: "https://www.coursera.org/learn/communication-skills" },
  "Teamwork": { name: "Teamwork and Collaboration", url: "https://www.linkedin.com/learning/topics/teamwork" },
  "Leadership": { name: "Leadership Development", url: "https://www.coursera.org/learn/leadership-development" },
  "Problem Solving": { name: "Problem Solving Course", url: "https://www.coursera.org/learn/problem-solving" },
  "Critical Thinking": { name: "Critical Thinking Course", url: "https://www.coursera.org/learn/critical-thinking" },
  "Time Management": { name: "Time Management Course", url: "https://www.coursera.org/learn/time-management" },
  "Customer Support": { name: "Customer Service Training", url: "https://www.linkedin.com/learning/topics/customer-service" },
  "Presentation Skills": { name: "Presentation Skills Course", url: "https://www.coursera.org/learn/presentation-skills" },
  "Negotiation": { name: "Negotiation Course", url: "https://www.coursera.org/learn/negotiation" },
  "Project Management": { name: "Project Management Course", url: "https://www.coursera.org/learn/project-management" },
  "Manual Testing": { name: "Manual Testing Course", url: "https://www.udemy.com/course/manual-testing-course/" },
  "Automation": { name: "Test Automation Course", url: "https://www.udemy.com/course/selenium-webdriver-with-java/" },
  "Selenium": { name: "Selenium WebDriver", url: "https://www.selenium.dev/documentation/" },
  "Cypress": { name: "Cypress Tutorial", url: "https://docs.cypress.io/" },
  "Jest": { name: "Jest Testing Framework", url: "https://jestjs.io/docs/getting-started" },
  "Mocha": { name: "Mocha Testing Framework", url: "https://mochajs.org/" },
  "Chai": { name: "Chai Assertion Library", url: "https://www.chaijs.com/" },
  "Test Cases": { name: "Test Case Design", url: "https://www.guru99.com/test-case-design.html" },
  "Bug Reporting": { name: "Bug Reporting Best Practices", url: "https://www.atlassian.com/software/jira/guides/bug-reporting" },
  "Business Analysis": { name: "Business Analysis Course", url: "https://www.coursera.org/learn/business-analysis" },
  "Agile": { name: "Agile Methodology Course", url: "https://www.coursera.org/learn/agile-methodology" },
  "Scrum": { name: "Scrum Master Course", url: "https://www.scrum.org/courses" },
  "Kanban": { name: "Kanban Course", url: "https://www.coursera.org/learn/kanban" },
  "Design Thinking": { name: "Design Thinking Course", url: "https://www.coursera.org/learn/design-thinking" },
  "Wireframing": { name: "Wireframing Course", url: "https://www.udemy.com/course/wireframing/" },
  "Prototyping": { name: "Prototyping Course", url: "https://www.coursera.org/learn/prototyping" },
  "Figma": { name: "Figma Tutorial", url: "https://help.figma.com/" },
  "Adobe XD": { name: "Adobe XD Tutorial", url: "https://helpx.adobe.com/xd/tutorials.html" },
  "Photoshop": { name: "Photoshop Tutorial", url: "https://helpx.adobe.com/photoshop/tutorials.html" },
  "Illustrator": { name: "Illustrator Tutorial", url: "https://helpx.adobe.com/illustrator/tutorials.html" },
  "Content Writing": { name: "Content Writing Course", url: "https://www.coursera.org/learn/content-writing" },
  "SEO": { name: "SEO Course", url: "https://www.coursera.org/learn/seo" },
  "Digital Marketing": { name: "Digital Marketing Course", url: "https://www.coursera.org/learn/digital-marketing" },
  "Salesforce": { name: "Salesforce Trailhead", url: "https://trailhead.salesforce.com/" },
  "SAP": { name: "SAP Tutorial", url: "https://www.tutorialspoint.com/sap/" },
  "ERP": { name: "ERP Systems Course", url: "https://www.coursera.org/learn/erp-systems" },
  "CRM": { name: "CRM Systems Course", url: "https://www.coursera.org/learn/crm-systems" },
  "E-commerce": { name: "E-commerce Course", url: "https://www.coursera.org/learn/ecommerce" },
  "Logistics": { name: "Logistics Course", url: "https://www.coursera.org/learn/logistics" },
  "Supply Chain": { name: "Supply Chain Course", url: "https://www.coursera.org/learn/supply-chain" },
  "Procurement": { name: "Procurement Course", url: "https://www.coursera.org/learn/procurement" },
  "Finance": { name: "Finance Course", url: "https://www.coursera.org/learn/finance" },
  "Legal": { name: "Legal Fundamentals", url: "https://www.coursera.org/learn/legal-fundamentals" },
  "Compliance": { name: "Compliance Course", url: "https://www.coursera.org/learn/compliance" }
};

// Helper functions for skill descriptions and difficulty
function getSkillDescription(skill, currentRole, targetRole) {
  const descriptions = {
    "Python": "Essential programming language for data science, automation, and web development.",
    "JavaScript": "Core language for web development, both frontend and backend applications.",
    "React": "Popular frontend framework for building interactive user interfaces.",
    "Node.js": "JavaScript runtime for server-side development and building APIs.",
    "AWS": "Leading cloud platform for scalable infrastructure and services.",
    "Docker": "Containerization platform for consistent application deployment.",
    "Kubernetes": "Container orchestration platform for managing microservices.",
    "Machine Learning": "AI subset focused on algorithms that learn from data patterns.",
    "Data Science": "Interdisciplinary field combining statistics, programming, and domain expertise.",
    "SQL": "Standard language for managing and querying relational databases.",
    "MongoDB": "Popular NoSQL database for flexible document storage.",
    "Git": "Version control system essential for collaborative development.",
    "Linux": "Operating system knowledge crucial for server management and DevOps.",
    "Terraform": "Infrastructure as Code tool for cloud resource management.",
    "Ansible": "Configuration management and automation tool for IT infrastructure.",
    "Jenkins": "Continuous Integration/Continuous Deployment automation server.",
    "Communication": "Ability to convey ideas clearly and collaborate effectively with teams.",
    "Teamwork": "Working collaboratively with others to achieve common goals.",
    "Leadership": "Guiding and motivating teams to accomplish objectives.",
    "Problem Solving": "Analytical thinking to identify and resolve complex issues.",
    "Critical Thinking": "Evaluating information objectively to make informed decisions.",
    "Time Management": "Organizing and prioritizing tasks for maximum productivity.",
    "Project Management": "Planning, executing, and monitoring project deliverables.",
    "Agile": "Iterative development methodology for adaptive project management.",
    "Scrum": "Agile framework for managing complex work with regular feedback.",
    "Design Thinking": "Human-centered approach to innovation and problem-solving.",
    "Figma": "Collaborative design tool for creating user interfaces and prototypes.",
    "Photoshop": "Industry-standard image editing software for design work.",
    "Content Writing": "Creating engaging written content for various platforms.",
    "SEO": "Search Engine Optimization techniques to improve online visibility.",
    "Digital Marketing": "Promoting products/services through digital channels.",
    "Salesforce": "Leading Customer Relationship Management platform.",
    "SAP": "Enterprise resource planning software for business processes.",
    "Finance": "Understanding financial principles and business economics.",
    "Legal": "Knowledge of legal frameworks and compliance requirements."
  };
  
  return descriptions[skill] || `Essential skill for ${targetRole} role.`;
}

function getSkillDifficulty(skill) {
  const difficulties = {
    "Python": "Beginner",
    "JavaScript": "Beginner",
    "React": "Intermediate",
    "Node.js": "Intermediate",
    "AWS": "Intermediate",
    "Docker": "Intermediate",
    "Kubernetes": "Advanced",
    "Machine Learning": "Advanced",
    "Data Science": "Advanced",
    "SQL": "Beginner",
    "MongoDB": "Intermediate",
    "Git": "Beginner",
    "Linux": "Intermediate",
    "Terraform": "Intermediate",
    "Ansible": "Intermediate",
    "Jenkins": "Intermediate",
    "Communication": "Beginner",
    "Teamwork": "Beginner",
    "Leadership": "Advanced",
    "Problem Solving": "Intermediate",
    "Critical Thinking": "Intermediate",
    "Time Management": "Beginner",
    "Project Management": "Intermediate",
    "Agile": "Intermediate",
    "Scrum": "Intermediate",
    "Design Thinking": "Intermediate",
    "Figma": "Beginner",
    "Photoshop": "Intermediate",
    "Content Writing": "Beginner",
    "SEO": "Intermediate",
    "Digital Marketing": "Intermediate",
    "Salesforce": "Intermediate",
    "SAP": "Advanced",
    "Finance": "Intermediate",
    "Legal": "Advanced"
  };
  
  return difficulties[skill] || null;
}

function getFoundationSkills(currentRole, targetRole) {
  const foundationSkills = {
    "DevOps Engineer": "Linux, Git, Docker, AWS",
    "Cloud Engineer": "AWS, Azure, Networking, Security",
    "GenAI Engineer": "Python, Machine Learning, APIs, Cloud",
    "Data Analyst": "SQL, Excel, Python, Statistics",
    "Full Stack Developer": "JavaScript, HTML/CSS, Node.js, Databases",
    "Data Scientist": "Python, Statistics, SQL, Machine Learning",
    "Machine Learning Engineer": "Python, ML Algorithms, Cloud, MLOps",
    "Frontend Developer": "HTML/CSS, JavaScript, React, UI/UX",
    "Backend Developer": "Java/Python, Databases, APIs, Cloud",
    "Mobile App Developer": "Swift/Kotlin, React Native, APIs, App Store",
    "Cybersecurity Analyst": "Networking, Security Tools, Incident Response",
    "Product Manager": "Business Analysis, Agile, User Research, Analytics",
    "QA Engineer": "Testing Tools, Automation, Bug Tracking, CI/CD",
    "UI/UX Designer": "Design Tools, User Research, Prototyping, Design Systems"
  };
  
  return foundationSkills[targetRole] || "Core programming, databases, and relevant tools";
}

function getAdvancedSkills(currentRole, targetRole) {
  const advancedSkills = {
    "DevOps Engineer": "Kubernetes, Terraform, CI/CD, Monitoring",
    "Cloud Engineer": "Multi-cloud, Infrastructure as Code, Security",
    "GenAI Engineer": "LLMs, LangChain, Prompt Engineering, MLOps",
    "Data Analyst": "Advanced SQL, Power BI, Python Libraries, Storytelling",
    "Full Stack Developer": "Advanced Frameworks, Performance, Security, DevOps",
    "Data Scientist": "Deep Learning, Big Data, MLOps, Advanced Analytics",
    "Machine Learning Engineer": "MLOps, Model Deployment, Scalable Systems",
    "Frontend Developer": "Advanced Frameworks, Performance, Accessibility",
    "Backend Developer": "Microservices, Scalability, Security, DevOps",
    "Mobile App Developer": "Native Development, Performance, App Security",
    "Cybersecurity Analyst": "Penetration Testing, Threat Hunting, Compliance",
    "Product Manager": "Strategy, Analytics, User Psychology, Leadership",
    "QA Engineer": "Test Automation, Performance Testing, Security Testing",
    "UI/UX Designer": "Advanced Prototyping, User Psychology, Design Systems"
  };
  
  return advancedSkills[targetRole] || "Advanced frameworks, tools, and methodologies";
}

function getRecommendedCertifications(targetRole) {
  const certifications = {
    "DevOps Engineer": "AWS DevOps, Docker, Kubernetes",
    "Cloud Engineer": "AWS Solutions Architect, Azure, GCP",
    "GenAI Engineer": "AWS ML, Google ML, DeepLearning.AI",
    "Data Analyst": "Google Data Analytics, Power BI, Tableau",
    "Full Stack Developer": "AWS Developer, MongoDB, React",
    "Data Scientist": "AWS ML, Google ML, IBM Data Science",
    "Machine Learning Engineer": "AWS ML, Google ML, Azure ML",
    "Frontend Developer": "React, Angular, Vue.js Certifications",
    "Backend Developer": "AWS Developer, Java, Python Certifications",
    "Mobile App Developer": "Apple Developer, Google Developer",
    "Cybersecurity Analyst": "CompTIA Security+, CISSP, CEH",
    "Product Manager": "CSPO, PMP, Agile Certifications",
    "QA Engineer": "ISTQB, Selenium, Test Automation",
    "UI/UX Designer": "Google UX Design, Adobe Certifications"
  };
  
  return certifications[targetRole] || "Role-specific certifications and industry standards";
}

// This function identifies what type of career transition the user is making — from non-IT to IT, within IT, or no change at all.
function getTransitionType(currentRole, targetRole) {
  if (!currentRole || !targetRole) return "unknown";
  const nonITRoles = [
    "Accountant", "Architect", "Banker", "Chef", "Civil Engineer", "Dentist", "Doctor", "Event Manager", "Fashion Designer", "Graphic Designer", "Hotel Manager", "HR Manager", "Interior Designer", "Journalist", "Lawyer", "Logistics Coordinator", "Marketing Manager", "Mechanical Engineer", "Nurse", "Operations Executive", "Pharmacist", "Physiotherapist", "Professor", "Public Relations Manager", "Real Estate Agent", "Research Analyst", "Retail Store Manager", "Sales Executive", "School Principal", "Social Media Manager", "Teacher", "Tourism Manager", "Trainer", "Travel Agent"
  ];
  if (currentRole === "Fresher" || nonITRoles.includes(currentRole)) return "nonit-to-it";    //If the user is a fresher or has a non-IT role, we categorize it as a "nonit-to-it" transition — meaning a domain switch into tech.
  if (currentRole && targetRole && currentRole !== targetRole) return "it-to-it";   // If the current and target roles are different and not non-IT, it's an "it-to-it" transition — switching from one tech role to another.
  if (currentRole && targetRole && currentRole === targetRole) return "same-domain";    // If both roles are the same, it means the user is trying to upskill or get a better salary in the same domain.
  return "unknown";   // if no above condition matches
}

// To calculate an estimated expected salary (CTC) after transitioning to the target role, using the current role, target role, and existing salary.
function calculateExpectedCTC(currentRole, targetRole, currentCTC) {
  if (!targetRole || !salaryData[targetRole]) return 0;     // If the targetRole is missing or not found in the salaryData dictionary, return 0 — cannot calculate without data.
  const transitionType = getTransitionType(currentRole, targetRole);    // determines type of role change
  let projected = salaryData[targetRole].average;     // Default expected salary is the average salary for the target role (used as a baseline).

  if (transitionType === "nonit-to-it") {   
    projected = salaryData[targetRole].fresher;
  } else if (transitionType === "it-to-it") {
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.2, salaryData[targetRole].average); // 20% hike
  } else if (transitionType === "same-domain") {
    const ctc = Number(currentCTC) || salaryData[targetRole].fresher;
    projected = Math.min(ctc * 1.35, salaryData[targetRole].average); // 35% hike
  }
  return Math.round(projected);
}

export default function Summary({ data, currentRole, targetRole, gapSkills, learningPath, fresherSkills }) {
  const summaryRef = useRef();

  // Prepare data for the before/after bar chart
  const chartData = [
    {
      name: "Current CTC",
      value: data.currentCTC,
      fill: "#6366f1"
    },
    {
      name: "Projected CTC",
      value: data.expectedCTC,
      fill: "#06b6d4"
    }
  ];

  // Use the exact targetRole from data, fallback to generic if not found
  const targetRoleName = data.targetRole || targetRole || "DevOps Engineer";      // determine target role
  const recs = recommendations[targetRoleName] || genericRecommendations;       //get course recommendations

  // Calculate fallback expectedCTC if not provided
  const fallbackExpectedCTC = calculateExpectedCTC(currentRole, targetRole, data.currentCTC);       
  const expectedCTC = Number(data.expectedCTC) > 0 ? Number(data.expectedCTC) : fallbackExpectedCTC;      

  // PDF Download with clickable links
  const handleDownload = () => {
    const input = summaryRef.current;
    if (!input) return;
    html2pdf().set({
      margin: 0.5,
      filename: `career-roi-summary-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    }).from(input).save();        // generates and downloads the PDF automatically.
  };

  // Share (copy summary to clipboard)
  const handleShare = () => {
    const summaryText = `Career ROI Summary\n\nCurrent Role: ${currentRole}\nTarget Role: ${targetRole}\nCurrent CTC: ₹${data.currentCTC}\nExpected CTC: ₹${expectedCTC}\nSalary Gain: ₹${data.gain}\nROI: ${data.roi}%\nBreakeven: ${data.breakeven}\nRecommended Courses: ${recs.map(r => r.name).join(", ")}`;
    navigator.clipboard.writeText(summaryText);
    alert("Summary copied to clipboard! You can now share it anywhere.");
  };

  return (
    <div ref={summaryRef} data-summary-content className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Your Career Upskilling Summary</h1>
        <p className="text-center text-blue-100">Complete roadmap to your next career milestone</p>
      </div>

      {/* Role Transition Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <UserIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-800">Current Position</h3>
          </div>
          <div className="text-lg font-semibold text-blue-900">{currentRole || "Not specified"}</div>
          <div className="text-sm text-blue-700 mt-1">
            Current CTC: ₹{Number(data.currentCTC).toLocaleString('en-IN')}/year
          </div>
          {salaryData[currentRole]?.average && (
            <div className="text-xs text-blue-600 mt-1">
              Market CTC: ₹{salaryData[currentRole].average.toLocaleString('en-IN')}/year
              <span className="ml-1 text-gray-400">({salaryData[currentRole].source})</span>
            </div>
          )}
          {currentRole === "Fresher" && fresherSkills && fresherSkills.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-semibold text-blue-700">Known Skills:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {fresherSkills.slice(0, 5).map((skill, index) => (
                  <span key={index} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {fresherSkills.length > 5 && (
                  <span className="text-xs text-blue-600">+{fresherSkills.length - 5} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <FlagIcon className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-green-800">Target Position</h3>
          </div>
          <div className="text-lg font-semibold text-green-900">{targetRole || "Not specified"}</div>
          <div className="text-sm text-green-700 mt-1">
            Expected CTC: ₹{expectedCTC.toLocaleString('en-IN')}/year
            <span className="ml-1 text-xs text-gray-500" title="Estimated based on your current and target role. You can edit this in the ROI step.">[?]</span>
          </div>
          {salaryData[targetRole]?.average && (
            <div className="text-xs text-green-600 mt-1">
              Market CTC: ₹{salaryData[targetRole].average.toLocaleString('en-IN')}/year
              <span className="ml-1 text-gray-400">({salaryData[targetRole].source})</span>
            </div>
          )}
          <div className="text-xs text-green-600 mt-2">
            Salary Range: ₹{salaryData[targetRole]?.fresher?.toLocaleString('en-IN')} - ₹{salaryData[targetRole]?.average?.toLocaleString('en-IN')}
          </div>
          {salaryData[targetRole]?.experienced && (
            <div className="text-xs text-green-600 mt-1">
              Hot Skills CTC: ₹{salaryData[targetRole].experienced.toLocaleString('en-IN')}/year
            </div>
          )}
          {salaryData[targetRole]?.tips && (
            <div className="text-xs text-green-700 mt-2 italic">
              💡 {salaryData[targetRole].tips}
            </div>
          )}
        </div>
      </div>

      {/* Skill Gap Analysis */}
      {gapSkills && gapSkills.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-3">
            <LightBulbIcon className="w-5 h-5 text-yellow-600" />
            <h3 className="font-bold text-yellow-800">Skill Gap Analysis</h3>
          </div>
          <div className="text-sm text-yellow-700 mb-2">
            Skills you need to develop to transition to {targetRole}:
          </div>
          <div className="flex flex-wrap gap-2">
            {gapSkills.map((skill, index) => {
              const resource = skillResources[skill];
              return (
                <span key={index} className="text-sm bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  {resource ? (
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-yellow-900 hover:underline"
                      title={`Learn ${skill}: ${resource.name}`}
                    >
                      {skill}
                    </a>
                  ) : (
                    skill
                  )}
                </span>
              );
            })}
          </div>
          <div className="text-xs text-yellow-600 mt-2">
            💡 Click on any skill to access learning resources
          </div>
        </div>
      )}

      {/* Learning Path Summary */}
      {learningPath && learningPath.duration && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <AcademicCapIcon className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800">Your Learning Journey</h3>
          </div>
          
          {/* Learning Path Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-2xl font-bold text-purple-900">{learningPath.duration}</div>
              <div className="text-sm text-purple-700 font-medium">Total Duration</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-2xl font-bold text-purple-900">{learningPath.certifications?.length || 0}</div>
              <div className="text-sm text-purple-700 font-medium">Learning Steps</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-2xl font-bold text-purple-900">₹{learningPath.totalCost?.toLocaleString('en-IN') || 'TBD'}</div>
              <div className="text-sm text-purple-700 font-medium">Total Investment</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-2xl font-bold text-purple-900">{learningPath.projects || 0}</div>
              <div className="text-sm text-purple-700 font-medium">Projects</div>
            </div>
          </div>
          
          {/* Detailed Learning Path from AI */}
          {learningPath.certifications && learningPath.certifications.length > 0 && (
            <div className="mt-6">
              <h4 className="font-bold text-purple-800 mb-4 text-lg">AI-Generated Learning Plan</h4>
              <div className="space-y-4">
                {learningPath.certifications.map((skill, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-purple-100 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      {/* Week Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-bold text-purple-900 text-lg">{skill}</h5>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                            1 week
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                          Learn {skill} to build your foundation in {targetRole}.
                        </p>
                        
                        {/* Resources and Links */}
                        <div className="flex flex-wrap gap-2">
                          {/* Find resource for this skill */}
                          {skillResources[skill] && (
                            <a 
                              href={skillResources[skill].url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                            >
                              📚 {skillResources[skill].name}
                            </a>
                          )}
                          
                          {/* Generic resource if specific not found */}
                          {!skillResources[skill] && (
                            <a 
                              href="https://www.coursera.org/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
                            >
                              🎓 Learn {skill} on Coursera
                            </a>
                          )}
                          
                          {/* Additional resources */}
                          <a 
                            href="https://www.udemy.com/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                          >
                            💰 Find courses on Udemy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Learning Tips */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">💡</div>
              <div>
                <h5 className="font-semibold text-blue-800 mb-1">Learning Tips</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Dedicate 2-3 hours daily for consistent progress</li>
                  <li>• Practice with real projects to reinforce learning</li>
                  <li>• Join online communities for support and networking</li>
                  <li>• Track your progress and celebrate milestones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Skills Learning Guide */}
      {gapSkills && gapSkills.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <AcademicCapIcon className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-orange-800">Complete Skills Learning Guide</h3>
          </div>
          
          <div className="text-sm text-orange-700 mb-4">
            Here's your comprehensive guide to learn all the skills needed for {targetRole}:
          </div>
          
          {/* Role-Specific Learning Path */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <h4 className="font-bold text-orange-800 mb-3">🎯 Role-Specific Learning Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold text-orange-800">Foundation Skills</div>
                <div className="text-sm text-orange-600 mt-1">
                  {getFoundationSkills(currentRole, targetRole)}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-orange-800">Advanced Skills</div>
                <div className="text-sm text-orange-600 mt-1">
                  {getAdvancedSkills(currentRole, targetRole)}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-orange-800">Certifications</div>
                <div className="text-sm text-orange-600 mt-1">
                  {getRecommendedCertifications(targetRole)}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Strategy */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <h4 className="font-bold text-orange-800 mb-3">📚 Learning Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-orange-800">Focus Areas</div>
                <div className="text-orange-600">Prioritize core skills first</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-semibold text-orange-800">Time Investment</div>
                <div className="text-orange-600">2-3 hours daily recommended</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Analysis */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-green-800">ROI Analysis</h3>
        </div>
        
        {/* Predicted Salary Information */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-green-800">Predicted Salary</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">₹{Number(data.currentCTC).toLocaleString('en-IN')}</div>
              <div className="text-sm text-green-600">Current Salary</div>
              <div className="text-xs text-gray-500">({currentRole})</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">₹{Number(data.expectedCTC).toLocaleString('en-IN')}</div>
              <div className="text-sm text-blue-600">Predicted Salary</div>
              <div className="text-xs text-gray-500">({targetRole})</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-lg font-bold text-purple-700">
              +₹{Number(data.gain).toLocaleString('en-IN')} Annual Increase
            </div>
            <div className="text-sm text-gray-600">Based on market data and transition analysis</div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="w-full h-64 mb-6 bg-white rounded-lg shadow flex items-center justify-center p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 10, right: 10, top: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'CTC']} />
              <Legend />
              <Bar dataKey="value" name="CTC (₹)" radius={[8, 8, 0, 0]} isAnimationActive fill={({ payload }) => payload.fill} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{data.roi}%</div>
            <div className="text-sm text-green-700 font-semibold">ROI</div>
            <div className="text-xs text-gray-600">Return on Investment</div>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">₹{Number(data.gain).toLocaleString('en-IN')}</div>
            <div className="text-sm text-blue-700 font-semibold">Annual Gain</div>
            <div className="text-xs text-gray-600">Salary Increase</div>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">{data.breakeven}</div>
            <div className="text-sm text-purple-700 font-semibold">Breakeven</div>
            <div className="text-xs text-gray-600">Recovery Time</div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <AcademicCapIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-primary">Recommended Courses & Certifications</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recs.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
              <a 
                href={rec.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-accent hover:text-accent-dark font-semibold text-lg block mb-2"
              >
                {rec.name}
              </a>
              <div className="text-sm text-gray-600">Click to explore course details</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary-dark transition"
          onClick={handleDownload}
        >
          <ArrowDownTrayIcon className="w-5 h-5" /> Download Complete Plan
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold shadow hover:bg-accent-dark transition"
          onClick={handleShare}
        >
          <ShareIcon className="w-5 h-5" /> Share Summary
        </button>
      </div>
    </div>
  );
}
