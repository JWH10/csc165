import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import OnboardingWizard from './components/OnboardingWizard';
import ChatBot from './components/ChatBot';
import { Benefit, UserProfile } from './types';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPreFill, setChatPreFill] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onboardingDone = localStorage.getItem('onboardingComplete');
    if (onboardingDone) {
      setShowOnboarding(false);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [benefitsRes, userRes] = await Promise.all([
        fetch('/api/benefits'),
        fetch('/api/user/profile'),
      ]);
      const benefitsData = await benefitsRes.json();
      const userData = await userRes.json();
      setBenefits(benefitsData);
      setUserProfile(userData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  const handleClaimBenefit = async (id: string) => {
    try {
      const res = await fetch(`/api/benefits/${id}/claim`, { method: 'PATCH' });
      const updated = await res.json();
      setBenefits(prev => prev.map(b => b.id === id ? updated : b));
    } catch (err) {
      console.error('Failed to claim benefit:', err);
    }
  };

  const handleAskAI = (benefitName: string) => {
    setChatPreFill(`Tell me how to claim my ${benefitName} benefit`);
    setChatOpen(true);
  };

  if (loading && !showOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">💼</div>
          <div className="text-xl font-semibold text-gray-700">Loading your benefits...</div>
          <div className="mt-3 flex justify-center gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 bg-blue-900 rounded-full animate-bounce" style={{animationDelay: `${i * 0.1}s`}} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showOnboarding ? (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <Dashboard
            benefits={benefits}
            userProfile={userProfile}
            onClaimBenefit={handleClaimBenefit}
            onAskAI={handleAskAI}
          />
          <ChatBot
            isOpen={chatOpen}
            onToggle={() => { setChatOpen(!chatOpen); setChatPreFill(''); }}
            preFillMessage={chatPreFill}
            userName={userProfile?.name?.split(' ')[0] || 'there'}
          />
        </>
      )}
    </div>
  );
}

export default App;
