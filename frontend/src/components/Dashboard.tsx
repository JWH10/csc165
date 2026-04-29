import React, { useState, useMemo } from 'react';
import { Benefit, UserProfile } from '../types';
import Header from './Header';
import BenefitCard from './BenefitCard';
import BenefitDetail from './BenefitDetail';

interface DashboardProps {
  benefits: Benefit[];
  userProfile: UserProfile | null;
  onClaimBenefit: (id: string) => void;
  onAskAI: (name: string) => void;
}

type TabType = 'all' | 'unused' | 'partial' | 'maximized';

export default function Dashboard({ benefits, userProfile, onClaimBenefit, onAskAI }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [sortBy, setSortBy] = useState<'value' | 'status' | 'name'>('value');

  const unclaimedValue = useMemo(() => {
    return benefits
      .filter(b => b.status !== 'maximized')
      .reduce((sum, b) => sum + Math.round(b.annualValue * (1 - b.percentUsed / 100)), 0);
  }, [benefits]);

  const filteredBenefits = useMemo(() => {
    let filtered = benefits;
    if (activeTab !== 'all') {
      filtered = benefits.filter(b => b.status === activeTab);
    }
    return [...filtered].sort((a, b) => {
      if (sortBy === 'value') return b.annualValue - a.annualValue;
      if (sortBy === 'status') {
        const order: Record<string, number> = { unused: 0, partial: 1, maximized: 2 };
        return (order[a.status] ?? 0) - (order[b.status] ?? 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [benefits, activeTab, sortBy]);

  const tabCounts = useMemo(() => ({
    all: benefits.length,
    unused: benefits.filter(b => b.status === 'unused').length,
    partial: benefits.filter(b => b.status === 'partial').length,
    maximized: benefits.filter(b => b.status === 'maximized').length,
  }), [benefits]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'all', label: 'All Benefits' },
    { id: 'unused', label: '🔴 Unused' },
    { id: 'partial', label: '🟡 In Progress' },
    { id: 'maximized', label: '🟢 Maximized' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userProfile={userProfile} />

      <div className="bg-gradient-to-r from-[#1e3a5f] to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="text-blue-300 text-sm font-medium mb-1">
                👋 Welcome back, {userProfile?.name?.split(' ')[0] || 'there'}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                You have{' '}
                <span className="text-yellow-300">${unclaimedValue.toLocaleString()}</span>{' '}
                in benefits<br className="hidden sm:block" /> you haven't used yet
              </h1>
              <p className="text-blue-200 mt-2 text-sm">
                {userProfile?.company} • {userProfile?.role} • {benefits.filter(b => b.status === 'unused').length} unused benefits
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-red-300">{tabCounts.unused}</div>
                <div className="text-xs text-blue-200 mt-1">Unused</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-yellow-300">{tabCounts.partial}</div>
                <div className="text-xs text-blue-200 mt-1">In Progress</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl font-bold text-green-300">{tabCounts.maximized}</div>
                <div className="text-xs text-blue-200 mt-1">Maximized</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              ⏰ <strong>FSA expires Dec 31</strong> — $1,920 at risk
            </div>
            <div className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              💰 <strong>401k match</strong> — increase contribution to get $1,600 more/year
            </div>
            <div className="bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              💪 <strong>Quick win</strong> — $600 gym reimbursement unclaimed
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-[#1e3a5f] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}>
                {tab.label}{' '}
                <span className={`ml-1 text-xs ${activeTab === tab.id ? 'text-blue-200' : 'text-gray-400'}`}>
                  ({tabCounts[tab.id]})
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="value">💰 Highest Value</option>
              <option value="status">🔴 Status (Unused First)</option>
              <option value="name">🔤 Name A-Z</option>
            </select>
          </div>
        </div>

        {filteredBenefits.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🎉</span>
            <h3 className="text-xl font-bold text-gray-700 mt-4">All benefits in this category are handled!</h3>
            <p className="text-gray-500 mt-2">Check other tabs to find more opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBenefits.map(benefit => (
              <BenefitCard key={benefit.id} benefit={benefit} onClick={() => setSelectedBenefit(benefit)} />
            ))}
          </div>
        )}

        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">📊 Benefits Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{benefits.length}</div>
              <div className="text-xs text-gray-500 mt-1">Total Benefits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">${unclaimedValue.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Unclaimed Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                ${benefits.reduce((s, b) => s + Math.round(b.annualValue * b.percentUsed / 100), 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">Claimed So Far</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {benefits.length > 0 ? Math.round(benefits.reduce((s, b) => s + b.percentUsed, 0) / benefits.length) : 0}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Avg. Utilization</div>
            </div>
          </div>
        </div>
      </div>

      {selectedBenefit && (
        <BenefitDetail
          benefit={selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
          onClaim={(id) => {
            onClaimBenefit(id);
            setSelectedBenefit(prev => prev ? { ...prev, percentUsed: 100, status: 'maximized', claimed: true } : null);
          }}
          onAskAI={onAskAI}
        />
      )}
    </div>
  );
}
