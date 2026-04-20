import { Customer } from '../types';

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];
const occupations = ['Software Engineer', 'Marketing Manager', 'Doctor', 'Teacher', 'Business Owner', 'Consultant', 'Student'];
const categories = ['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Groceries', 'Fitness'];

const firstNames = ['Arjun', 'Priya', 'Rohan', 'Sneha', 'Vikram', 'Ananya', 'Rahul', 'Ishani', 'Amit', 'Kavita', 'Suresh', 'Meera'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Iyer', 'Reddy', 'Patel', 'Deshmukh', 'Singh', 'Nair', 'Joshi'];

function generateName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

export const generateMockData = (count: number): Customer[] => {
  return Array.from({ length: count }, (_, i) => {
    const age = Math.floor(Math.random() * 45) + 18;
    const income = Math.floor(Math.random() * 1500000) + 300000;
    const purchaseFrequency = Math.floor(Math.random() * 10) + 1;
    const avgOrderValue = Math.floor(Math.random() * 5000) + 500;
    const totalSpending = purchaseFrequency * avgOrderValue * (Math.floor(Math.random() * 12) + 1);
    
    // Segmentation Logic (Simplified for mock data generation)
    let segment = 'General';
    if (totalSpending > 50000 && purchaseFrequency > 5) segment = 'High Value';
    else if (purchaseFrequency > 7) segment = 'Loyal';
    else if (purchaseFrequency < 2 && totalSpending > 0) segment = 'At Risk';
    else if (Math.random() > 0.7) segment = 'Bargain Seeker';
    else segment = 'New Potential';

    const lastPurchaseDate = new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
      id: `CUST-${1000 + i}`,
      name: generateName(),
      age,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      city: cities[Math.floor(Math.random() * cities.length)],
      income,
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      purchaseFrequency,
      avgOrderValue,
      totalSpending,
      category: categories[Math.floor(Math.random() * categories.length)],
      channel: Math.random() > 0.4 ? 'Online' : 'Offline',
      type: Math.random() > 0.3 ? 'Returning' : 'New',
      engagement: Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
      discountSensitivity: Math.random(),
      lastPurchaseDate,
      segment
    };
  });
};

export const mockCustomers = generateMockData(100);
