

## Logo & Favicon যুক্ত করার পরিকল্পনা

দুটি আপলোড করা লোগো ব্যবহার করে অ্যাপের সব উপযুক্ত জায়গায় লোগো ও favicon সেট করা হবে।

### ফাইল ও পরিবর্তন

#### 1. অ্যাসেট কপি
- `user-uploads://Logo-1.png` → `src/assets/logo.png` (বড় লোগো — sidebar, login, install page)
- `user-uploads://Logo-circle.png` → `public/favicon.png` (favicon)
- `user-uploads://Logo-circle.png` → `src/assets/logo-circle.png` (collapsed sidebar)

#### 2. `index.html` — Favicon সেট
- বিদ্যমান `public/favicon.ico` থাকলে মুছে ফেলা
- `<link rel="icon" href="/favicon.png" type="image/png">` যুক্ত
- `<link rel="apple-touch-icon" href="/favicon.png">` যুক্ত

#### 3. `src/components/LoginScreen.tsx`
- Lock আইকনের বৃত্তের জায়গায় `logo.png` ইমেজ দেখানো

#### 4. `src/components/AppSidebar.tsx`
- SidebarHeader-এ টেক্সটের উপরে `logo.png` ছোট করে দেখানো
- Collapsed অবস্থায় `logo-circle.png` দেখানো ("স্ব" টেক্সটের বদলে)

#### 5. `src/components/AppHeader.tsx`
- Brand bar-এ শিরোনামের পাশে ছোট `logo-circle.png` দেখানো

#### 6. `src/pages/InstallPage.tsx`
- পেজের শীর্ষে ছোট লোগো যুক্ত

