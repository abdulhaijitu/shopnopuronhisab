

## সেটিংস পেইজ কমপ্যাক্ট ডিজাইন

### পরিবর্তন — `src/pages/SettingsPage.tsx`

- পেইজ wrapper: `space-y-6` → `space-y-4`, padding `p-4 md:p-6` → `p-3 md:p-6`
- CardHeader: কাস্টম `p-3 pb-1 sm:p-4 sm:pb-2` (ড্যাশবোর্ডের মতো)
- CardContent: `p-3 pt-2 sm:p-4 sm:pt-2`
- ফর্মের ভেতরের `space-y-4` → `space-y-3`
- Input ফিল্ড: `h-9` (ছোট height)
- Label: `text-xs sm:text-sm`
- CardTitle: `text-base` (ছিল `text-lg`)
- CardDescription: `text-xs`
- বাটন গ্রুপের gap: `gap-3` → `gap-2`
- পেইজ heading: `text-lg` (ছিল `text-xl`)

শুধু Tailwind ক্লাস পরিবর্তন, কোনো লজিক বা নতুন ফাইল নেই।

