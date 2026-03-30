

## পেশা (Occupation) কলাম যুক্ত করা

### Changes

1. **`src/lib/types.ts`** — `Member` interface-এ `occupation: string` ফিল্ড যুক্ত করা। `SEED_MEMBERS`-এ প্রতিটি সদস্যের জন্য পেশা যোগ করা।

2. **`src/pages/Members.tsx`** — টেবিলে "সদস্যের নাম" এর পরে "পেশা" কলাম যুক্ত করা। Add/Edit ফর্মে পেশা ইনপুট ফিল্ড যোগ করা। `colSpan` আপডেট করা।

3. **`src/pages/CollectionSheet.tsx`** — যদি পেশা কলাম থাকে তাহলে সেখানেও যুক্ত করা।

