export interface Member {
  id: string;
  serial: number;
  name: string;
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
  { id: '1', serial: 1, name: 'মোঃ রাকিব হোসেন', mobile: '01727-707276', shares: 1 },
  { id: '2', serial: 2, name: 'মোঃ বাদসা (ডাই কাটিং)', mobile: '01930-063112', shares: 1 },
  { id: '3', serial: 3, name: 'মোঃ টিপু (ডাই কাটিং)', mobile: '01400-967850', shares: 1 },
  { id: '4', serial: 4, name: 'মোঃ সোহেল (লেমিনেশন)', mobile: '01712-886784', shares: 1 },
  { id: '5', serial: 5, name: 'মোঃ সোহেল (ডাই কাটিং)', mobile: '01723-226538', shares: 1 },
];

export const DEFAULT_PASSWORD = 'somity2024';
