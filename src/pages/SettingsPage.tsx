import { useState } from 'react';
import { getPassword, setPassword } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPwd !== getPassword()) {
      toast.error('বর্তমান পাসওয়ার্ড সঠিক নয়');
      return;
    }
    if (newPwd.length < 4) {
      toast.error('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে');
      return;
    }
    if (newPwd !== confirmPwd) {
      toast.error('নতুন পাসওয়ার্ড মিলছে না');
      return;
    }
    setPassword(newPwd);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে');
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Settings className="h-5 w-5" /> সেটিংস
      </h2>

      <Card className="border-t-4 border-t-[hsl(var(--coop-blue))]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-[hsl(var(--coop-blue))]" /> পাসওয়ার্ড পরিবর্তন
          </CardTitle>
          <CardDescription>অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">বর্তমান পাসওয়ার্ড</Label>
              <Input id="current" type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} placeholder="বর্তমান পাসওয়ার্ড দিন" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">নতুন পাসওয়ার্ড</Label>
              <Input id="new" type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="নতুন পাসওয়ার্ড দিন" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">নতুন পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input id="confirm" type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="আবার নতুন পাসওয়ার্ড দিন" />
            </div>
            <Button type="submit" className="bg-[hsl(var(--coop-blue))] hover:bg-[hsl(var(--coop-blue)/0.9)]">
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
