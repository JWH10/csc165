import React, { useState } from 'react';
import { Benefit } from '../types';

interface BenefitDetailProps {
  benefit: Benefit;
  onClose: () => void;
  onClaim: (id: string) => void;
  onAskAI: (name: string) => void;
}

export default function BenefitDetail({ benefit, onClose, onClaim, onAskAI }: BenefitDetailProps) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(benefit.claimed);

  const handleClaim = async () => {
    setClaiming(true);
    await onClaim(benefit.id);
    setClaimed(true);
    setClaiming(false);
  };

  const statusColor = {
    unused: 'text-red-600 bg-red-50 border-red-200',
    partial: 'text-amber-600 bg-amber-50 border-amber-200',
    maximized: 'text-green-600 bg-green-50 border-green-200',
  }[benefit.status];

  const statusLabel = {
    unused: '🔴 Unused',
    partial: '🟡 In Progress',
    maximized: '🟢 Maximized',
  }[benefit.status];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="modal-content bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-[#1e3a5f] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{benefit.emoji}</span>
              <div>
                <h2 className="text-xl font-bold">{benefit.name}</h2>
                <span className="text-blue-300 text-sm">{benefit.category}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-blue-300 hover:text-white text-2xl leading-none transition-colors"
            >
              ×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {benefit.annualValue > 0 ? `$${benefit.annualValue.toLocaleString()}` : '∞'}
              </div>
              <div className="text-xs text-blue-200 mt-1">Annual Value</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{benefit.percentUsed}%</div>
              <div className="text-xs text-blue-200 mt-1">Used</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {benefit.annualValue > 0
                  ? `$${Math.round(benefit.annualValue * (1 - benefit.percentUsed / 100)).toLocaleString()}`
                  : '∞'
                }
              </div>
              <div className="text-xs text-blue-200 mt-1">Remaining</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${statusColor}`}>
            {statusLabel}
            {benefit.deadline && (
              <span className="ml-auto text-xs font-normal">⏰ Deadline: {benefit.deadline}</span>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About This Benefit</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">📋 How to Claim</h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
              {benefit.howToClaim}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">📊 Usage Progress</h3>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  benefit.status === 'maximized' ? 'bg-green-500' :
                  benefit.status === 'partial' ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${benefit.percentUsed}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{benefit.percentUsed}% used</span>
              <span>{100 - benefit.percentUsed}% remaining</span>
            </div>
          </div>

          {benefit.formsOrLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔗 Resources & Links</h3>
              <div className="space-y-2">
                {benefit.formsOrLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 cursor-pointer">
                    <span className="text-blue-400">→</span>
                    <span className="hover:underline">{link}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => { onAskAI(benefit.name); onClose(); }}
              className="flex-1 py-3 rounded-xl border-2 border-[#1e3a5f] text-[#1e3a5f] font-medium hover:bg-blue-50 transition-colors text-sm flex items-center justify-center gap-2"
            >
              💬 Ask AI About This
            </button>
            {!claimed && benefit.status !== 'maximized' ? (
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="flex-1 py-3 rounded-xl bg-[#1e3a5f] text-white font-medium hover:bg-blue-800 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {claiming ? (
                  <>
                    <span className="animate-spin">⟳</span> Claiming...
                  </>
                ) : (
                  <>✅ Mark as Claimed</>
                )}
              </button>
            ) : (
              <div className="flex-1 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium text-sm flex items-center justify-center gap-2">
                🟢 Claimed!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
