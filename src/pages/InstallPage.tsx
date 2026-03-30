import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share, MoreVertical, Plus } from 'lucide-react';
import logo from '@/assets/logo.png';

const InstallPage = () => {
  return (
    <div className="max-w-lg mx-auto p-3 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="স্বপ্নপূরণ সমবায় সমিতি" className="h-10 w-auto" />
        <h1 className="text-lg font-bold text-foreground">📲 অ্যাপ ইনস্টল করুন</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        এই অ্যাপটি আপনার ফোনের হোম স্ক্রিনে যুক্ত করলে নেটিভ অ্যাপের মতো কাজ করবে — অফলাইনেও!
      </p>

      <Card>
        <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MoreVertical className="h-4 w-4" /> Android (Chrome)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-2 sm:p-4 sm:pt-2">
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Chrome-এ এই সাইট খুলুন</li>
            <li>উপরে ডানদিকে <strong>⋮</strong> মেনু ট্যাপ করুন</li>
            <li><strong>"হোম স্ক্রিনে যোগ করুন"</strong> বা <strong>"Install app"</strong> ট্যাপ করুন</li>
            <li><strong>"যোগ করুন"</strong> ট্যাপ করুন</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Share className="h-4 w-4" /> iPhone / iPad (Safari)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-2 sm:p-4 sm:pt-2">
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Safari-তে এই সাইট খুলুন</li>
            <li>নিচে <Share className="inline h-3.5 w-3.5" /> (Share) বাটন ট্যাপ করুন</li>
            <li><strong>"Add to Home Screen"</strong> <Plus className="inline h-3.5 w-3.5" /> ট্যাপ করুন</li>
            <li><strong>"Add"</strong> ট্যাপ করুন</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="h-4 w-4" /> Desktop (Chrome / Edge)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-2 sm:p-4 sm:pt-2">
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Chrome বা Edge-এ সাইট খুলুন</li>
            <li>Address bar-এ <Download className="inline h-3.5 w-3.5" /> install আইকন ক্লিক করুন</li>
            <li><strong>"Install"</strong> ক্লিক করুন</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallPage;
