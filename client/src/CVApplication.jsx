import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Edit3, Save, Plus, Trash2 } from 'lucide-react';

// CVApplication.jsx
// Handles the CV/resume application logic, possibly for generating or analyzing resumes within the app.

// General Information Component
const GeneralInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [displayData, setDisplayData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      setDisplayData(formData);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setFormData(displayData);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-pink-800 mb-4 flex items-center ">
          <User className="mr-2" size={24} />
          General Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save className="mr-2" size={16} />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-pink-800 flex items-center">
          <User className="mr-2" size={24} />
          General Information
        </h2>
        <button
          onClick={handleEdit}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
        >
          <Edit3 className="mr-2" size={16} />
          Edit
        </button>
      </div>
      {displayData.name ? (
        <div className="space-y-3">
          <div className="flex items-center">
            <User className="mr-3 text-gray-600" size={20} />
            <span className="text-lg font-medium">{displayData.name}</span>
          </div>
          <div className="flex items-center">
            <Mail className="mr-3 text-gray-600" size={20} />
            <span className="text-gray-700">{displayData.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-3 text-gray-600" size={20} />
            <span className="text-gray-700">{displayData.phone}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No general information added yet. Click Edit to add your details.</p>
      )}
    </div>
  );
};

// Education Component
const Education = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (currentEducation.school && currentEducation.degree && currentEducation.startDate && currentEducation.endDate) {
      setEducationList(prev => [...prev, { ...currentEducation, id: Date.now() }]);
      setCurrentEducation({
        school: '',
        degree: '',
        startDate: '',
        endDate: ''
      });
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEducationList(prev => prev.filter(edu => edu.id !== id));
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <GraduationCap className="mr-2" size={24} />
          Education
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School/Institution Name
            </label>
            <input
              type="text"
              name="school"
              value={currentEducation.school}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter school or institution name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree/Title of Study
            </label>
            <input
              type="text"
              name="degree"
              value={currentEducation.degree}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter degree or title of study"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={currentEducation.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={currentEducation.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save className="mr-2" size={16} />
              Add Education
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <GraduationCap className="mr-2" size={24} />
          Education
        </h2>
        <button
          onClick={handleEdit}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add Education
        </button>
      </div>
      {educationList.length > 0 ? (
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div key={edu.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
                  <p className="text-gray-700 font-medium">{edu.degree}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No education added yet. Click "Add Education" to add your educational background.</p>
      )}
    </div>
  );
};

// Experience Component
const Experience = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    responsibilities: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (currentExperience.company && currentExperience.position && currentExperience.responsibilities && currentExperience.startDate && currentExperience.endDate) {
      setExperienceList(prev => [...prev, { ...currentExperience, id: Date.now() }]);
      setCurrentExperience({
        company: '',
        position: '',
        responsibilities: '',
        startDate: '',
        endDate: ''
      });
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setExperienceList(prev => prev.filter(exp => exp.id !== id));
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
          <Briefcase className="mr-2" size={24} />
          Work Experience
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={currentExperience.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position Title
            </label>
            <input
              type="text"
              name="position"
              value={currentExperience.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter position title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={currentExperience.responsibilities}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your main responsibilities and achievements"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={currentExperience.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={currentExperience.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save className="mr-2" size={16} />
              Add Experience
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-800 flex items-center">
          <Briefcase className="mr-2" size={24} />
          Work Experience
        </h2>
        <button
          onClick={handleEdit}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add Experience
        </button>
      </div>
      {experienceList.length > 0 ? (
        <div className="space-y-4">
          {experienceList.map((exp) => (
            <div key={exp.id} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{exp.responsibilities}</p>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No work experience added yet. Click "Add Experience" to add your professional background.</p>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CV Builder</h1>
          <p className="text-gray-600">Create and manage your professional resume</p>
        </header>
        
        <main>
          <GeneralInfo />
          <Education />
          <Experience />
        </main>
        
        <footer className="text-center mt-8 text-gray-500">
          <p>© 2025 CV Builder - Built with React</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

