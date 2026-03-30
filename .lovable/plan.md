

## Full PWA সেটআপ — Offline সাপোর্ট সহ

### পরিবর্তন

#### 1. `vite-plugin-pwa` ইনস্টল ও কনফিগারেশন — `vite.config.ts`
- `vite-plugin-pwa` dependency যুক্ত
- `VitePWA()` plugin যুক্ত করা:
  - `registerType: "autoUpdate"`
  - `devOptions: { enabled: false }` (editor preview-তে সমস্যা এড়াতে)
  - `navigateFallbackDenylist: [/^\/~oauth/]`
  - manifest তথ্য (name, short_name, theme_color, icons)
  - workbox runtime caching কনফিগ

#### 2. PWA আইকন তৈরি — `public/`
- `pwa-192x192.png` ও `pwa-512x512.png` placeholder আইকন (সবুজ ব্যাকগ্রাউন্ডে "স্বপ্নপূরণ" টেক্সট সহ SVG-based)

#### 3. Service Worker গার্ড — `src/main.tsx`
- iframe বা Lovable preview domain-এ থাকলে service worker unregister করা
- শুধু production-এ SW কাজ করবে

#### 4. `public/manifest.json` আপডেট
- icons array-তে 192x192 ও 512x512 আইকন reference যুক্ত

#### 5. Install prompt পেজ (ঐচ্ছিক)
- `/install` রাউটে একটি সহজ পেজ — ব্যবহারকারীকে "হোম স্ক্রিনে যুক্ত করুন" নির্দেশনা দেওয়া

### গুরুত্বপূর্ণ সতর্কতা
- PWA features (offline, install prompt) শুধু **published version**-এ কাজ করবে, Lovable editor preview-তে নয়।

### ফাইল পরিবর্তন
- `vite.config.ts` — VitePWA plugin যুক্ত
- `src/main.tsx` — SW guard যুক্ত
- `public/manifest.json` — icons আপডেট
- `public/pwa-192x192.png`, `public/pwa-512x512.png` — আইকন
- `src/pages/InstallPage.tsx` — নতুন install নির্দেশনা পেজ
- `src/App.tsx` — `/install` রাউট যুক্ত

