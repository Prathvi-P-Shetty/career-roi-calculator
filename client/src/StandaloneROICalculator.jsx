import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

// StandaloneROICalculator.jsx
// Provides a standalone version of the ROI calculator for embedding or separate use.

const salaryRanges = {
  'IT': { min: 400000, max: 2500000, step: 50000 }, // 4L - 25L (more realistic)
  'NonIT': { min: 300000, max: 1500000, step: 25000 }, // 3L - 15L (more realistic)
  'EntryLevel': { min: 250000, max: 800000, step: 25000 } // 2.5L - 8L (entry level range)
};

const defaultHike = 20; // More realistic default
const defaultDuration = 5;
const defaultSwitch = 3; // More realistic switch frequency

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
    else if (selectedCategory === 'EntryLevel') setCurrentSalary('350000');
  }, [selectedCategory]);

  useEffect(() => {
    calculateProgression();
    // eslint-disable-next-line
  }, [selectedCategory, currentSalary, hikePercentage, workDuration, switchFrequency]);

  const calculateProgression = () => {

    // With job switches (higher hikes at intervals)
    let salary = parseInt(currentSalary);
    let total = 0;
    let years = parseInt(workDuration);
    const hikePercent = parseInt(hikePercentage) / 100;
    const switchInterval = parseInt(switchFrequency);
    const progress = [salary];
    
    for (let year = 1; year <= years; year++) {
      total += salary;
      if (year % switchInterval === 0) {      
        salary += (salary * hikePercent);     // Higher hike on switch year
      } else {      
        salary += (salary * 0.08);      // Normal 8% annual hike (more realistic)
      }
      progress.push(Math.round(salary));      // Track yearly salary
    }
    setTotalEarnings(total);
    setSalaryProgression(progress);

    // No switch scenario (8% increment every year)
    let nsSalary = parseInt(currentSalary);
    let nsTotal = 0;
    const nsProgress = [nsSalary];
    for (let year = 1; year <= years; year++) {
      nsTotal += nsSalary;
      nsSalary += (nsSalary * 0.08);      // Always 8% hike (more realistic)
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
    const range = salaryRanges[selectedCategory || 'IT'];
    return (
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4 max-w-md mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">Current Salary</h2>
          <p className='text-secondary'>Enter your current annual salary (₹)</p>
        </div>
        <div className="px-4 py-1 md:py-3 bg-gradient-to-r from-primary-50 to-accent-50 text-primary w-full font-medium rounded-xl border-2 border-primary-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200">
          ₹
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
            className="text-primary font-medium bg-transparent w-full text-right focus:outline-none"
          />
        </div>
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={currentSalary}
          onChange={e => setCurrentSalary(e.target.value)}
          className="w-full h-3 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    );
  };

  // 1, 3, 5-year projections
  const getProjection = (progress, year) => progress[year] ? progress[year] : progress[progress.length - 1];
  const extraGain = totalEarnings - noSwitchEarnings;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col items-center justify-center p-2 md:p-4 lg:p-4 xl:p-4 2xl:p-4">
      <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-white/95 backdrop-blur-sm p-2 md:p-8 lg:p-8 xl:p-8 2xl:p-8 rounded-3xl shadow-edtech-xl border border-primary-100 w-full">
        <button
          className="mb-5 px-5 py-2 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 rounded-xl bg-secondary-100 text-secondary font-semibold hover:bg-secondary-200 transition-all duration-200 shadow-edtech flex items-center gap-2"
          onClick={onBack}
        >
          <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
          Back to Main Page
        </button>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChartBarIcon className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-extrabold text-primary">Salary Growth Estimator</h1>
          </div>
          <p className="text-lg text-secondary">Compare career strategies and their financial impact</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-8 justify-center">
          <button
            className={`px-6 py-2 md:px-8 md:py-4 lg:px-8 lg:py-4 xl:px-8 xl:py-4 2xl:px-8 2xl:py-4 rounded-xl font-bold shadow-edtech transition-all duration-200 border-2 ${
              selectedCategory === 'IT' 
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white border-primary' 
                : 'bg-white text-primary border-secondary-200 hover:border-primary'
            }`}
            onClick={() => setSelectedCategory('IT')}
          >
            IT Professional
          </button>
          <button
            className={`px-6 py-2 md:px-8 md:py-4 lg:px-8 lg:py-4 xl:px-8 xl:py-4 2xl:px-8 2xl:py-4 rounded-xl font-bold shadow-edtech transition-all duration-200 border-2 ${
              selectedCategory === 'NonIT' 
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white border-primary' 
                : 'bg-white text-primary border-secondary-200 hover:border-primary'
            }`}
            onClick={() => setSelectedCategory('NonIT')}
          >
            Non-IT Professional
          </button>
          <button
            className={`px-6 py-2 md:px-8 md:py-4 lg:px-8 lg:py-4 xl:px-8 xl:py-4 2xl:px-8 2xl:py-4 rounded-xl font-bold shadow-edtech transition-all duration-200 border-2 ${
              selectedCategory === 'EntryLevel' 
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white border-primary' 
                : 'bg-white text-primary border-secondary-200 hover:border-primary'
            }`}
            onClick={() => setSelectedCategory('EntryLevel')}
          >
            Entry Level
          </button>
        </div>
        
        {renderSalaryInput()}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <div className="space-y-3">
            <label className="block font-bold text-primary">Average Hike on Switch (%)</label>
            <input
              type="number"
              min={5}
              max={100}
              value={hikePercentage}
              onChange={e => setHikePercentage(e.target.value)}
              className="w-full p-4 border-2 border-secondary-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
            />
          </div>
          <div className="space-y-3">
            <label className="block font-bold text-primary">Work Duration (years)</label>
            <input
              type="number"
              min={1}
              max={20}
              value={workDuration}
              onChange={e => setWorkDuration(e.target.value)}
              className="w-full p-4 border-2 border-secondary-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
            />
          </div>
          <div className="space-y-3">
            <label className="block font-bold text-primary">Switch Frequency (years)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={switchFrequency}
              onChange={e => setSwitchFrequency(e.target.value)}
              className="w-full p-4 border-2 border-secondary-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 shadow-edtech">
            <div className="flex items-center gap-3 mb-3">
              <ArrowTrendingUpIcon className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-bold text-primary">With Switching</h3>
            </div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalEarnings)}</div>
            <p className="text-sm text-secondary mt-1">Total earnings</p>
          </div>
          
          <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200 shadow-edtech">
            <div className="flex items-center gap-3 mb-3">
              <CurrencyDollarIcon className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-accent">No Switching</h3>
            </div>
            <div className="text-2xl font-bold text-accent">{formatCurrency(noSwitchEarnings)}</div>
            <p className="text-sm text-secondary mt-1">Total earnings</p>
          </div>
          
          <div className="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-2xl border border-success-200 shadow-edtech">
            <div className="flex items-center gap-3 mb-3">
              <ChartBarIcon className="w-8 h-8 text-success" />
              <h3 className="text-lg font-bold text-success">Extra Gain</h3>
            </div>
            <div className="text-2xl font-bold text-success">{formatCurrency(extraGain)}</div>
            <p className="text-sm text-secondary mt-1">From switching</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Salary Progression</h2>
          <div className="bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-edtech">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-primary-50 to-accent-50">
                  <th className="py-4 px-6 text-primary font-bold">Year</th>
                  <th className="py-4 px-6 text-primary font-bold">With Switching</th>
                  <th className="py-4 px-6 text-primary font-bold">No Switch (8%/yr)</th>
                </tr>
              </thead>
              <tbody>
                {salaryProgression.map((salary, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-secondary-50'}>
                    <td className="py-3 px-6 font-semibold text-primary">{idx}</td>
                    <td className="py-3 px-6 text-accent font-medium">{formatCurrency(salary)}</td>
                    <td className="py-3 px-6 text-secondary">{formatCurrency(noSwitchProgression[idx] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 