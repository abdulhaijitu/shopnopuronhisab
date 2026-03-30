export interface Member {
  id: string;
  serial: number;
  name: string;
  occupation: string;
  mobile: string;
  shares: number;
}

export interface CollectionEntry {
  memberId: string;
  month: string;
  amount: number;
  paymentDate: string;
  paid: boolean;
}

export const MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
] as const;

export const SEED_MEMBERS: Member[] = [
  { id: '1', serial: 1, name: 'মোঃ রাকিব হোসেন', occupation: 'ব্যবসা', mobile: '01727-707276', shares: 1 },
  { id: '2', serial: 2, name: 'মোঃ বাদসা (ডাই কাটিং)', occupation: 'ডাই কাটিং', mobile: '01930-063112', shares: 1 },
  { id: '3', serial: 3, name: 'মোঃ টিপু (ডাই কাটিং)', occupation: 'ডাই কাটিং', mobile: '01400-967850', shares: 1 },
  { id: '4', serial: 4, name: 'মোঃ সোহেল (লেমিনেশন)', occupation: 'লেমিনেশন', mobile: '01712-886784', shares: 1 },
  { id: '5', serial: 5, name: 'মোঃ সোহেল (ডাই কাটিং)', occupation: 'ডাই কাটিং', mobile: '01723-226538', shares: 1 },
];

export const START_YEAR = 2023;

export const getYearsList = (): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) => (START_YEAR + i).toString());
};

export const DEFAULT_PASSWORD = 'somity2024';
