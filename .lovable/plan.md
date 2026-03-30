

## ড্যাশবোর্ড কার্ড কমপ্যাক্ট ডিজাইন

বর্তমানে CardHeader-এ `p-6` এবং CardContent-এ `p-6 pt-0` ডিফল্ট padding আছে — মোবাইলে (391px viewport) এটা অনেক জায়গা নেয়।

### পরিবর্তন — `src/pages/Dashboard.tsx`

- CardHeader: `p-3 pb-1` (মোবাইলে), `sm:p-4 sm:pb-2` (ডেস্কটপে)
- CardContent: `p-3 pt-0` / `sm:p-4 sm:pt-0`
- আইকন ছোট করা: `h-4 w-4` (মোবাইলে `h-5 w-5` ছিল)
- ভ্যালু font: `text-lg sm:text-2xl` (মোবাইলে ছোট)
- লেবেল: `text-xs sm:text-sm`
- Grid gap: `gap-2 sm:gap-3 lg:gap-4`
- কার্ড border-left width `border-l-3` (সামান্য পাতলা)

কোনো নতুন ফাইল বা dependency লাগবে না। শুধু Dashboard.tsx-এর কার্ড সেকশনের Tailwind ক্লাস আপডেট।

