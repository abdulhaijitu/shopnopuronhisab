import { useState, useRef } from 'react';
import { getPassword, setPassword, exportAllData, importAllData } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, Shield, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPwd !== getPassword()) { toast.error('বর্তমান পাসওয়ার্ড সঠিক নয়'); return; }
    if (newPwd.length < 4) { toast.error('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে'); return; }
    if (newPwd !== confirmPwd) { toast.error('নতুন পাসওয়ার্ড মিলছে না'); return; }
    setPassword(newPwd);
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে');
  };

  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `সমিতি_ব্যাকআপ_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('ব্যাকআপ ফাইল ডাউনলোড হচ্ছে');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        importAllData(ev.target?.result as string);
        toast.success('ডেটা সফলভাবে পুনরুদ্ধার হয়েছে। পেজ রিলোড হচ্ছে...');
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        toast.error('অবৈধ ব্যাকআপ ফাইল। সঠিক JSON ফাইল দিন।');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-xl mx-auto p-3 md:p-6 space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <Settings className="h-4 w-4" /> সেটিংস
      </h2>

      <Card className="border-t-4 border-t-[hsl(var(--coop-blue))]">
        <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-[hsl(var(--coop-blue))]" /> পাসওয়ার্ড পরিবর্তন
          </CardTitle>
          <CardDescription className="text-xs">অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-2 sm:p-4 sm:pt-2">
          <form onSubmit={handleChange} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="current" className="text-xs sm:text-sm">বর্তমান পাসওয়ার্ড</Label>
              <Input id="current" type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} placeholder="বর্তমান পাসওয়ার্ড দিন" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" className="text-xs sm:text-sm">নতুন পাসওয়ার্ড</Label>
              <Input id="new" type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="নতুন পাসওয়ার্ড দিন" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm" className="text-xs sm:text-sm">নতুন পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input id="confirm" type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="আবার নতুন পাসওয়ার্ড দিন" className="h-9" />
            </div>
            <Button type="submit" className="bg-[hsl(var(--coop-blue))] hover:bg-[hsl(var(--coop-blue)/0.9)]">
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-[hsl(var(--coop-green))]">
        <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="h-4 w-4 text-[hsl(var(--coop-green))]" /> ডেটা ব্যাকআপ ও রিস্টোর
          </CardTitle>
          <CardDescription className="text-xs">সকল সদস্য ও আদায়ের তথ্য JSON ফাইল হিসেবে সংরক্ষণ ও পুনরুদ্ধার করুন</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-2 sm:p-4 sm:pt-2 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleExport} className="bg-[hsl(var(--coop-green))] hover:bg-[hsl(var(--coop-green)/0.9)]">
              <Download className="h-4 w-4 mr-1" /> ব্যাকআপ ডাউনলোড
            </Button>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="restore-file"
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-1" /> ব্যাকআপ থেকে পুনরুদ্ধার
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            ⚠️ পুনরুদ্ধার করলে বর্তমান সকল ডেটা প্রতিস্থাপিত হবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
