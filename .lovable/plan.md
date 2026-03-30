

## Responsive ও UI/UX অডিট — সম্পূর্ণ পরিকল্পনা

কোডবেস পর্যালোচনায় নিম্নলিখিত সমস্যা চিহ্নিত হয়েছে:

### চিহ্নিত সমস্যাসমূহ

1. **CollectionSheet মোবাইলে ব্যবহারযোগ্য নয়** — ৮টি কলামের টেবিল ৩৯০px স্ক্রিনে horizontal scroll প্রয়োজন; ইনপুট ফিল্ড ও ক্যালেন্ডার পপওভার ছোট স্ক্রিনে কষ্টকর
2. **Members টেবিলে মোবাইলে অ্যাকশন বাটন চাপা** — সরু স্ক্রিনে edit/delete বাটন ক্লিক করা কঠিন
3. **YearlyReport ১৪+ কলামের টেবিল** — মোবাইলে কার্যত ব্যবহারের অযোগ্য
4. **App.css অপ্রয়োজনীয়** — Vite boilerplate CSS, কোথাও ব্যবহৃত হচ্ছে না
5. **Sidebar header-এ repetition** — সাইডবার ও টপ বার উভয়েই সমিতির নাম দেখাচ্ছে
6. **টেবিল font-size মোবাইলে বড়** — ledger-table `text-sm` সব জায়গায়, মোবাইলে `text-xs` হওয়া উচিত
7. **CollectionSheet-এ action buttons স্ক্রলের নিচে হারিয়ে যায়** — sticky বা top-এ থাকা উচিত

### পরিবর্তন পরিকল্পনা

#### 1. `src/index.css` — Responsive ledger-table ও utility উন্নতি
- মোবাইলে `.ledger-table th, td` এর padding ও font-size কমানো (`px-2 py-1.5 text-xs`)
- স্ক্রলযোগ্য টেবিল wrapper-এর জন্য `-webkit-overflow-scrolling: touch` যুক্ত

#### 2. `src/pages/CollectionSheet.tsx` — মোবাইল-ফ্রেন্ডলি কার্ড ভিউ
- মোবাইলে (< 640px) টেবিলের বদলে **card/list ভিউ** দেখানো — প্রতি সদস্যের জন্য একটি কার্ডে নাম, amount input, date picker, ও paid checkbox থাকবে
- ডেস্কটপে (≥ 640px) বিদ্যমান টেবিল ভিউ বজায়
- Action buttons (সংরক্ষণ, প্রিন্ট, CSV) উপরে `sticky` করা

#### 3. `src/pages/Members.tsx` — মোবাইল কার্ড ভিউ
- মোবাইলে টেবিলের বদলে কার্ড লেআউট — প্রতি সদস্যের নাম, পেশা, মোবাইল, শেয়ার ও action buttons
- ডেস্কটপে টেবিল বজায়

#### 4. `src/pages/YearlyReport.tsx` — মোবাইলে সদস্যভিত্তিক কার্ড
- মোবাইলে ১৪ কলামের টেবিল লুকিয়ে প্রতি সদস্যের জন্য একটি expandable কার্ড — মাসভিত্তিক আদায় তালিকা
- ডেস্কটপে টেবিল বজায়

#### 5. `src/pages/Dashboard.tsx` — ছোট UI ফিক্স
- কার্ড grid মোবাইলে `grid-cols-2` (বর্তমানে `grid-cols-1`, দুটি ছোট কার্ড পাশাপাশি ভালো দেখাবে)
- মাসভিত্তিক টেবিলে মোবাইলে কমপ্যাক্ট সাইজ

#### 6. `src/App.tsx` — টপ বার উন্নতি
- মোবাইলে সমিতির নাম সংক্ষেপ করা বা লুকানো (সাইডবারে আছে)

#### 7. `src/App.css` — ডিলিট
- অব্যবহৃত Vite boilerplate CSS সরানো

### প্রযুক্তিগত বিবরণ
- `useIsMobile()` hook ব্যবহার করে conditional rendering (টেবিল vs কার্ড)
- Tailwind responsive classes (`sm:`, `md:`, `lg:`) ব্যবহার
- কোনো নতুন dependency লাগবে না
- Print view-তে সবকিছু আগের মতো টেবিলেই থাকবে

