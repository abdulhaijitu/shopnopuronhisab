

## SEO ও Social Meta — Lovable ব্রান্ডিং সরানো

### পরিবর্তনসমূহ

#### 1. `index.html`
- `meta name="author"` থেকে `"Lovable"` সরিয়ে `"স্বপ্নপূরণ সমবায় সমিতি"` দেওয়া
- Open Graph meta সম্পূর্ণ করা: `og:image`, `og:url`, `og:locale` (bn_BD) যুক্ত
- Twitter Card meta যুক্ত: `twitter:card`, `twitter:title`, `twitter:description`
- Favicon/theme-color meta যুক্ত

#### 2. `public/robots.txt`
- যেহেতু এটি একটি internal accounting app, `Disallow: /` করা উচিত নাকি বর্তমান `Allow: /` রাখা — সেটি user preference অনুযায়ী। ডিফল্ট: Allow রাখা হবে।

#### 3. `public/manifest.json` (নতুন ফাইল)
- PWA-ready web app manifest — app name, short_name, theme_color, background_color, icons placeholder

কোনো কোড লজিক পরিবর্তন নেই, শুধু meta/SEO ফাইল আপডেট।

