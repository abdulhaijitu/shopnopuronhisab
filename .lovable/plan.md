

## মোবাইল বটম নেভিগেশন বার

মোবাইলে সাইডবার টগল করার বদলে স্ক্রিনের নিচে একটি fixed bottom navigation bar দেখানো হবে — যেটি অ্যাপ-স্টাইল UX দেবে।

### পরিবর্তনসমূহ

1. **`src/components/MobileBottomNav.tsx`** (নতুন ফাইল)
   - ৫টি নেভিগেশন আইটেম (ড্যাশবোর্ড, সদস্য, হিসাব, রিপোর্ট, সেটিংস) আইকন + ছোট লেবেল সহ
   - `useLocation` দিয়ে active state হাইলাইট (coop-green রঙে)
   - `fixed bottom-0` পজিশনিং, `z-50`, `no-print` ক্লাস
   - শুধু মোবাইলে দেখাবে (`md:hidden`)

2. **`src/App.tsx`**
   - `MobileBottomNav` কম্পোনেন্ট `Routes`-এর পরে যুক্ত করা
   - মেইন কন্টেন্টে `pb-16 md:pb-0` যুক্ত করা যাতে বটম বারের নিচে কন্টেন্ট না চাপা পড়ে
   - মোবাইলে টপ হেডারের `SidebarTrigger` লুকানো (`hidden md:flex`) — কারণ বটম বারেই নেভিগেশন আছে

3. **`src/components/AppSidebar.tsx`**
   - কোনো পরিবর্তন নেই — ডেস্কটপে সাইডবার আগের মতোই কাজ করবে

### প্রযুক্তিগত বিবরণ
- Tailwind responsive classes দিয়ে mobile-only visibility
- Safe area inset (`pb-safe`) iOS notch/home bar-এর জন্য
- কোনো নতুন dependency লাগবে না

