export interface Customer {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  city: string;
  income: number;
  occupation: string;
  purchaseFrequency: number; // monthly
  avgOrderValue: number;
  totalSpending: number;
  category: string;
  channel: 'Online' | 'Offline';
  type: 'New' | 'Returning';
  engagement: 'Low' | 'Medium' | 'High';
  discountSensitivity: number; // 0 to 1
  lastPurchaseDate: string;
  segment: string;
}

export type SegmentType = 'High Value' | 'Loyal' | 'At Risk' | 'Bargain Seeker' | 'New Potential';
