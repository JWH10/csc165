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

export const userData: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  company: 'TechCorp Inc.',
  role: 'Software Engineer',
  salaryRange: '$80,000 - $100,000',
  avatarInitials: 'AJ',
  totalBenefitsValue: 26000,
  claimedValue: 3540,
  unclaimedValue: 22460,
  totalBenefits: 15,
  unusedCount: 10,
  partialCount: 3,
  maximizedCount: 2,
};
