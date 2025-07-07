import React, { useState, useEffect } from 'react';

// StandaloneROICalculator.jsx
// Provides a standalone version of the ROI calculator for embedding or separate use.

const salaryRanges = {
  'IT': { min: 200000, max: 5000000, step: 1000 },
  'NonIT': { min: 200000, max: 3000000, step: 10000 },
  'Fresher': { fixed: 350000 }
};

const defaultHike = 30;
const defaultDuration = 5;
const defaultSwitch = 2;

export default function StandaloneROICalculator({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('IT');
  const [currentSalary, setCurrentSalary] = useState('600000');
  const [hikePercentage, setHikePercentage] = useState(defaultHike);
  const [workDuration, setWorkDuration] = useState(defaultDuration);
  const [switchFrequency, setSwitchFrequency] = useState(defaultSwitch);
  const [salaryProgression, setSalaryProgression] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [noSwitchProgression, setNoSwitchProgression] = useState([]);
  const [noSwitchEarnings, setNoSwitchEarnings] = useState(0);

  useEffect(() => {
    if (selectedCategory === 'IT') setCurrentSalary('600000');
    else if (selectedCategory === 'NonIT') setCurrentSalary('400000');
    else if (selectedCategory === 'Fresher') setCurrentSalary('350000');
  }, [selectedCategory]);

  useEffect(() => {
    calculateProgression();
    // eslint-disable-next-line
  }, [selectedCategory, currentSalary, hikePercentage, workDuration, switchFrequency]);

  const calculateProgression = () => {

    // With job switches (higher hikes at intervals)
    let salary = selectedCategory === 'Fresher' ? salaryRanges.Fresher.fixed : parseInt(currentSalary);
    let total = 0;
    let years = parseInt(workDuration);
    const hikePercent = parseInt(hikePercentage) / 100;
    const switchInterval = parseInt(switchFrequency);
    const progress = [salary];
    for (let year = 1; year <= years; year++) {     // This loop simulates salary growth over time, incorporating both regular annual hikes and larger hikes during job switches at specified intervals.
      total += salary;
      if (year % switchInterval === 0) {      
        salary += (salary * hikePercent);     // Higher hike on switch year
      } else {      
        salary += (salary * 0.05);      // Normal 5% annual hike
      }
      progress.push(Math.round(salary));      // Track yearly salary
    }
    setTotalEarnings(total);
    setSalaryProgression(progress);

    // No switch scenario (5% increment every year)
    let nsSalary = selectedCategory === 'Fresher' ? salaryRanges.Fresher.fixed : parseInt(currentSalary);
    let nsTotal = 0;
    const nsProgress = [nsSalary];
    for (let year = 1; year <= years; year++) {
      nsTotal += nsSalary;
      nsSalary += (nsSalary * 0.05);      // Always 5% hike
      nsProgress.push(Math.round(nsSalary));
    }
    setNoSwitchEarnings(nsTotal);
    setNoSwitchProgression(nsProgress);
  };

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return "—";      
    const lakhs = value / 100000;
    if (lakhs >= 1) return `${lakhs.toFixed(1)}L`;      // If the number is >= 1 lakh, format as `X.XL`
    return `₹${value.toLocaleString('en-IN')}`;     //  Otherwise, show exact ₹ amount with commas
  };

  const renderSalaryInput = () => {
    if (selectedCategory === 'Fresher') {
      return (
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-700">Fixed Starting Salary</h2>
          <div className="px-3 py-1 bg-blue-50 rounded-lg">
            <span className="text-blue-500 font-medium">{formatCurrency(salaryRanges.Fresher.fixed)}</span>
          </div>
        </div>
      );
    }
    const range = salaryRanges[selectedCategory || 'IT'];
    return (
      <div className="flex flex-col gap-2 max-w-md mx-auto">
        <div className="justify-between items-center mb-2">
          <h2 className="text-xl text-left font-semibold text-gray-700">Current Salary</h2>
          <p className='text-left text-gray-600'>Enter your current annual salary (₹)</p>
        </div>
        <div className="px-2 py-1 bg-blue-50 text-blue-500 w-40 font-medium rounded-lg hover:bg-blue-100 ml-auto cursor-text items-right justify-end">₹
          <input
            type="number"
            value={currentSalary}
            onChange={e => setCurrentSalary(e.target.value)}
            onBlur={e => {
              const value = parseInt(e.target.value);
              if (value < range.min) setCurrentSalary(range.min.toString());
              else if (value > range.max) setCurrentSalary(range.max.toString());
              else setCurrentSalary(value.toString());
            }}
            className="text-blue-500 font-medium bg-transparent w-32 text-right focus:outline-none"
          />
        </div>
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={currentSalary}
          onChange={e => setCurrentSalary(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    );
  };

  // 1, 3, 5-year projections
  const getProjection = (progress, year) => progress[year] ? progress[year] : progress[progress.length - 1];
  const extraGain = totalEarnings - noSwitchEarnings;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white/90 p-8 rounded-2xl shadow-2xl w-full">
        <button
          className="mb-4 px-4 py-2 rounded bg-gray-200 text-primary font-semibold hover:bg-gray-300 transition"
          onClick={onBack}
        >
           Back to Main Page
        </button>
        <h1 className="text-3xl font-extrabold mb-4 text-primary text-center">Salary Growth & ROI Simulator</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <button
            className={`px-6 py-2 rounded-lg font-bold shadow transition-all duration-200 border ${selectedCategory === 'IT' ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}
            onClick={() => setSelectedCategory('IT')}
          >IT</button>
          <button
            className={`px-6 py-2 rounded-lg font-bold shadow transition-all duration-200 border ${selectedCategory === 'NonIT' ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}
            onClick={() => setSelectedCategory('NonIT')}
          >Non-IT</button>
          <button
            className={`px-6 py-2 rounded-lg font-bold shadow transition-all duration-200 border ${selectedCategory === 'Fresher' ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}
            onClick={() => setSelectedCategory('Fresher')}
          >Fresher</button>
        </div>
        {renderSalaryInput()}
        <div className="flex flex-col md:flex-row gap-4 mt-6 max-w-2xl mx-auto">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-primary">Average Hike on Switch (%)</label>
            <input
              type="number"
              min={5}
              max={100}
              value={hikePercentage}
              onChange={e => setHikePercentage(e.target.value)}
              className="w-full p-2 border rounded focus:outline-accent"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-primary">Work Duration (years)</label>
            <input
              type="number"
              min={1}
              max={20}
              value={workDuration}
              onChange={e => setWorkDuration(e.target.value)}
              className="w-full p-2 border rounded focus:outline-accent"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-primary">Switch Frequency (years)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={switchFrequency}
              onChange={e => setSwitchFrequency(e.target.value)}
              className="w-full p-2 border rounded focus:outline-accent"
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-primary mb-2">Salary Progression</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Year</th>
                <th className="py-2 px-4">With Switching</th>
                <th className="py-2 px-4">No Switch (5%/yr)</th>
              </tr>
            </thead>
            <tbody>
              {salaryProgression.map((salary, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 font-semibold">{idx}</td>
                  <td className="py-2 px-4">{formatCurrency(salary)}</td>
                  <td className="py-2 px-4">{formatCurrency(noSwitchProgression[idx] || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-lg font-semibold text-green-700">
            Total Earnings over {workDuration} years: <span className="text-primary">{formatCurrency(totalEarnings)}</span>
          </div>
          <div className="mt-2 text-base text-accent font-medium">
            Extra Gain from Switching: <span className="font-bold">{formatCurrency(extraGain)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 