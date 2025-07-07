# Career ROI Calculator

**Career ROI Calculator** is a modern, full-stack web application designed to empower learners—working professionals, students, and freshers—to make informed decisions about upskilling and career transitions in the tech industry.
Built with **React.js** and **Tailwind CSS** on the frontend, and **Node.js**/**Express.js** on the backend, this tool leverages AI (OpenAI GPT-4) to provide personalized insights and actionable learning paths.

---

## 🚀 Features

- **Role Transition Analysis:**  
  Select your current and target tech roles (e.g., Cloud Engineer, DevOps, SRE, GenAI Engineer, etc.) to get a tailored transition plan.
- **Skill Gap Assessment:**  
  Identify missing skills using static mappings or dynamic AI-powered suggestions via the OpenAI GPT-4 API.
- **Personalized Learning Path:**  
  Receive a recommended upskilling roadmap, including:
  - Estimated duration (months)
  - Projected cost
  - Certifications to pursue
  - Projects to complete
- **ROI & Breakeven Calculator:**  
  Input your current and expected CTC (salary) to instantly see:
  - Expected salary gain
  - ROI percentage
  - Breakeven period (months)
- **Modern UI/UX:**  
  Clean, responsive interface built with React and Tailwind CSS for a seamless user experience.
- **Secure & Scalable:**  
  Uses `.env` for API keys and environment variables. Backend and frontend are cleanly separated for scalability.
- **Developer Friendly:**  
  Includes dev tooling like `concurrently` and `nodemon` for efficient development and hot-reloading.

---

## 🌟 Why Use Career ROI Calculator?

- **Data-Driven Decisions:**  
  Make smarter career moves with clear, quantifiable ROI insights.
- **AI Integration:**  
  Get up-to-date, personalized skill gap analysis and learning suggestions.
- **EdTech Focus:**  
  Designed for the upskilling and career advancement needs of today's tech workforce.

---

## 🗂️ Project Structure

```
career-roi-calculator/
  ├── client/   # Frontend (React, Tailwind CSS, Vite)
  ├── server/   # Backend (Node.js, Express.js, OpenAI integration)
  ├── README.md
  ├── .gitignore
  └── eslint.config.js
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone the repository
```sh
git clone https://github.com/your-username/career-roi-calculator.git
cd career-roi-calculator
```

### 2. Setup Environment Variables
- Create a `.env` file in `server/` and add your OpenAI API key:
  ```
  OPENAI_API_KEY=your_openai_key_here
  ```

### 3. Install Dependencies

**Backend:**
```sh
cd server
npm install
```

**Frontend:**
```sh
cd ../client
npm install
```

### 4. Run the Application

**Development (with hot-reload):**
```sh
# From the root directory
# (Requires concurrently and scripts in root package.json, or run backend and frontend separately as described above)
cd server && npm start
cd ../client && npm run dev
```

---

## ✨ Example Use Cases

- **Professionals:**  
  Evaluate the ROI of moving from Support Engineer to DevOps Engineer.
- **Students:**  
  Plan a transition from BPO Associate to Data Analyst.
- **Freshers:**  
  Map out a path to become a GenAI Engineer.

---

## 🔒 Security

- All API keys and sensitive data are managed via environment variables.
- Never commit your `.env` files to version control.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or suggestions.

---

## 📄 License

MIT License

---

## 📢 Inspiration & References

- [Coursera Career Academy](https://www.coursera.org/career-academy)
- [Springboard Career Track](https://www.springboard.com/)
- [Pathrise](https://www.pathrise.com/)
- [OpenAI GPT-4 API](https://platform.openai.com/docs/guides/gpt)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

---

**Empower your career journey with data, AI, and actionable insights!**
