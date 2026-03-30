

## স্বপ্নপূরণ সমবায় সমিতি — Digital Ledger App

### Overview
A Bengali-language cooperative society ledger app with localStorage for data persistence and simple password protection for access control.

### Brand & Design
- **Header**: "স্বপ্নপূরণ সমবায় সমিতি" with address and contact numbers
- **Color scheme**: Professional red (#DC2626), blue (#2563EB), green (#16A34A) — cooperative society inspired
- **Ledger-style tables**: Clean borders, professional look like a traditional হিসাব খাতা

### Password Protection
- On first visit, show a simple password entry screen (hardcoded password, stored in localStorage once authenticated)
- No signup — just a shared admin password

### Pages

**১. ড্যাশবোর্ড (Dashboard)**
- Summary cards: মোট সদস্য (Total Members), মোট শেয়ার (Total Shares), চলতি মাসের আদায় (Current Month Collection)
- Quick navigation to other pages

**২. সদস্য তালিকা (Members Management)**
- Table: নং, সদস্যের নাম, মোবাইল, শেয়ার
- Add/Edit/Delete members via modal forms
- Pre-seeded with the 5 provided members

**৩. প্রতি মাসের হিসাব সিট (Monthly Collection Sheet)**
- Month dropdown (জানুয়ারি–ডিসেম্বর), defaults to current month
- Ledger table with columns: নং, সদস্যের নাম, মোবাইল, শেয়ার, টাকার পরিমাণ (editable input), টাকা প্রদানের তারিখ (date picker), পেমেন্ট স্ট্যাটাস (checkbox toggle)
- Auto-populates all members when month is selected
- Total collection shown at bottom
- **সংরক্ষণ করুন** (Save) and **প্রিন্ট করুন** (Print) buttons

### Data Storage
- All data (members, collections) stored in localStorage
- Data organized by month for the collections

### Navigation
- Sidebar or top nav with Bengali labels for all three pages
- Mobile-responsive hamburger menu

