export interface Benefit {
  id: string;
  name: string;
  emoji: string;
  category: 'Health' | 'Financial' | 'Wellness' | 'Professional' | 'Lifestyle' | 'Insurance';
  annualValue: number;
  percentUsed: number;
  status: 'unused' | 'partial' | 'maximized';
  description: string;
  howToClaim: string;
  deadline: string | null;
  formsOrLinks: string[];
  claimed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  company: string;
  role: string;
  salaryRange: string;
  avatarInitials: string;
  totalBenefitsValue: number;
  claimedValue: number;
  unclaimedValue: number;
  totalBenefits: number;
  unusedCount: number;
  partialCount: number;
  maximizedCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface OnboardingData {
  name: string;
  company: string;
  role: string;
  salaryRange: string;
  benefitCategories: string[];
  situation: string[];
}
