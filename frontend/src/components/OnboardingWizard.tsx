import React, { useState } from 'react';
import { OnboardingData } from '../types';

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
}

const BENEFIT_CATEGORIES = [
  { id: 'health', label: '🏥 Health Insurance', desc: 'Medical, preventive care' },
  { id: 'dental', label: '🦷 Dental', desc: 'Cleanings, fillings, crowns' },
  { id: 'vision', label: '👁️ Vision', desc: 'Exams, glasses, contacts' },
  { id: '401k', label: '💰 401k / Retirement', desc: 'Employer match, investments' },
  { id: 'fsa_hsa', label: '🏦 FSA / HSA', desc: 'Tax-advantaged health savings' },
  { id: 'wellness', label: '💪 Gym / Wellness', desc: 'Fitness, mental health' },
  { id: 'learning', label: '📚 Professional Dev', desc: 'Courses, certifications' },
  { id: 'remote', label: '🏠 Remote Work Stipend', desc: 'Home office, internet' },
  { id: 'childcare', label: '👶 Childcare / DCFSA', desc: 'Dependent care savings' },
  { id: 'legal', label: '⚖️ Legal Services', desc: 'Consultations, wills' },
];

const SITUATIONS = [
  { id: 'kids', label: '👶 Have kids or dependents' },
  { id: 'homeowner', label: '🏠 Own a home' },
  { id: 'freelance', label: '💻 Freelance / side work' },
  { id: 'loans', label: '🎓 Student loans' },
  { id: 'health_condition', label: '💊 Chronic health condition' },
  { id: 'wfh', label: '🏠 Work from home' },
  { id: 'pet', label: '🐾 Have pets' },
  { id: 'investing', label: '📈 Active investor' },
];

const SALARY_RANGES = [
  'Under $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  '$100,000 - $150,000',
  '$150,000+',
];

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: 'Alex Johnson',
    company: 'TechCorp Inc.',
    role: 'Software Engineer',
    salaryRange: '$75,000 - $100,000',
    benefitCategories: [],
    situation: [],
  });

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  const estimatedValue = () => {
    let base = 8000;
    if (data.situation.includes('kids')) base += 5000;
    if (data.situation.includes('wfh')) base += 1200;
    if (data.situation.includes('freelance')) base += 2000;
    if (data.benefitCategories.includes('401k')) base += 3200;
    if (data.benefitCategories.includes('fsa_hsa')) base += 1800;
    return base.toLocaleString();
  };

  const TOTAL_STEPS = 4;

  const canProceed = () => {
    if (step === 0) return data.name.trim() !== '' && data.company.trim() !== '';
    if (step === 1) return data.benefitCategories.length > 0;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl">👋</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">Welcome to BenefitsMax</h2>
              <p className="text-gray-500 mt-2">The average employee leaves <strong className="text-red-600">$1,400 in benefits</strong> unclaimed every year. Let's fix that.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Alex Johnson" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={data.company} onChange={e => setData({ ...data, company: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="TechCorp Inc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" value={data.role} onChange={e => setData({ ...data, role: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <select value={data.salaryRange} onChange={e => setData({ ...data, salaryRange: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {SALARY_RANGES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-5xl">🎯</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3">Your Benefit Categories</h2>
              <p className="text-gray-500 mt-1">Select all that your employer offers</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BENEFIT_CATEGORIES.map(cat => (
                <button key={cat.id}
                  onClick={() => setData({ ...data, benefitCategories: toggleItem(data.benefitCategories, cat.id) })}
                  className={`text-left p-3 rounded-xl border-2 transition-all duration-150 ${
                    data.benefitCategories.includes(cat.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-medium text-sm">{cat.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
                </button>
              ))}
            </div>
            {data.benefitCategories.length === 0 && (
              <p className="text-center text-amber-600 text-sm">Select at least one category to continue</p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-5xl">🔍</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3">Your Situation</h2>
              <p className="text-gray-500 mt-1">Helps us find the most relevant benefits for you</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SITUATIONS.map(sit => (
                <button key={sit.id}
                  onClick={() => setData({ ...data, situation: toggleItem(data.situation, sit.id) })}
                  className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                    data.situation.includes(sit.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-medium text-sm">{sit.label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center">
              <span className="text-6xl">🎉</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">You're Ready!</h2>
              <p className="text-gray-500 mt-2">Here's what we found for you, {data.name.split(' ')[0]}</p>
            </div>
            <div className="bg-gradient-to-br from-[#1e3a5f] to-blue-700 text-white rounded-2xl p-6 text-center">
              <div className="text-sm text-blue-200 mb-1">Estimated unclaimed benefits</div>
              <div className="text-5xl font-bold mb-1">${estimatedValue()}</div>
              <div className="text-blue-200 text-sm">available in your package</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <span className="text-2xl">⏰</span>
                <div>
                  <div className="font-semibold text-red-700 text-sm">FSA Deadline Alert</div>
                  <div className="text-xs text-red-600">You may have FSA funds expiring December 31</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-semibold text-green-700 text-sm">Free Money Alert</div>
                  <div className="text-xs text-green-600">Possible uncaptured 401k employer match</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-2xl">💪</span>
                <div>
                  <div className="font-semibold text-blue-700 text-sm">Easy Quick Win</div>
                  <div className="text-xs text-blue-600">Gym/wellness reimbursement is fast to claim</div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400">We'll show you exactly how to claim each benefit on your personalized dashboard.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1e3a5f] to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="h-1.5 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
        </div>

        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                i < step ? 'bg-green-500 text-white' : i === step ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? 'bg-green-500' : 'bg-gray-100'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: '65vh' }}>
          {renderStep()}
        </div>

        <div className="px-6 pb-6 flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              ← Back
            </button>
          )}
          <button
            onClick={() => step < TOTAL_STEPS - 1 ? setStep(s => s + 1) : onComplete(data)}
            disabled={!canProceed()}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              canProceed() ? 'bg-[#1e3a5f] text-white hover:bg-blue-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            {step < TOTAL_STEPS - 1 ? 'Continue →' : '🚀 View My Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
