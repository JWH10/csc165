import React from 'react';
import { Benefit } from '../types';

interface BenefitCardProps {
  benefit: Benefit;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Health: 'bg-red-100 text-red-700',
  Financial: 'bg-green-100 text-green-700',
  Wellness: 'bg-purple-100 text-purple-700',
  Professional: 'bg-blue-100 text-blue-700',
  Lifestyle: 'bg-orange-100 text-orange-700',
  Insurance: 'bg-gray-100 text-gray-700',
};

const statusConfig = {
  unused: { label: 'Unused', dot: '🔴', bar: 'bg-red-400', text: 'text-red-600' },
  partial: { label: 'In Progress', dot: '🟡', bar: 'bg-amber-400', text: 'text-amber-600' },
  maximized: { label: 'Maximized', dot: '🟢', bar: 'bg-green-500', text: 'text-green-600' },
};

export default function BenefitCard({ benefit, onClick }: BenefitCardProps) {
  const status = statusConfig[benefit.status];
  const catColor = categoryColors[benefit.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="benefit-card group" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{benefit.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-900 transition-colors">
              {benefit.name}
            </h3>
            <span className={`badge mt-1 ${catColor}`}>{benefit.category}</span>
          </div>
        </div>
        <span className={`text-xs font-medium ${status.text}`}>
          {status.dot} {status.label}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Annual Value</span>
          <span className="text-sm font-bold text-gray-900">
            {benefit.annualValue > 0 ? `$${benefit.annualValue.toLocaleString()}` : 'Unlimited'}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${status.bar} transition-all duration-700`}
            style={{ width: `${benefit.percentUsed}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">{benefit.percentUsed}% used</span>
          {benefit.deadline && (
            <span className="text-xs text-amber-600 font-medium">⏰ {benefit.deadline.includes('Dec') ? 'Expires Dec 31' : benefit.deadline}</span>
          )}
        </div>
      </div>

      {benefit.annualValue > 0 && benefit.percentUsed < 100 && (
        <div className="mb-3 p-2 bg-blue-50 rounded-lg">
          <span className="text-xs text-blue-700 font-medium">
            💡 ${Math.round(benefit.annualValue * (1 - benefit.percentUsed / 100)).toLocaleString()} unclaimed
          </span>
        </div>
      )}

      <button
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          benefit.status === 'maximized'
            ? 'bg-green-50 text-green-700 cursor-default'
            : 'bg-[#1e3a5f] text-white hover:bg-blue-800 hover:shadow-md'
        }`}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        {benefit.status === 'maximized' ? '✅ Fully Claimed' : '→ Take Action'}
      </button>
    </div>
  );
}
