import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  userProfile: UserProfile | null;
}

export default function Header({ userProfile }: HeaderProps) {
  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <span className="text-xl font-bold tracking-tight">BenefitsMax</span>
              <span className="text-blue-300 text-sm ml-2 hidden sm:inline">by TechCorp</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-blue-200 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">Benefits Guide</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">HR Portal</a>
          </nav>

          {userProfile && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{userProfile.name}</div>
                <div className="text-xs text-blue-300">{userProfile.role}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                {userProfile.avatarInitials}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
