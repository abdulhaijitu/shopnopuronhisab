import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { setAuthenticated, getPassword } from '@/lib/store';
import logo from '@/assets/logo.png';

interface Props { onSuccess: () => void; }

export default function LoginScreen({ onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getPassword()) {
      setAuthenticated(true);
      onSuccess();
    } else {
      setError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--coop-blue)/0.1)] via-background to-[hsl(var(--coop-green)/0.1)] p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-[hsl(var(--coop-blue))]">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-20 h-20">
            <img src={logo} alt="স্বপ্নপূরণ সমবায় সমিতি" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl text-[hsl(var(--coop-blue))]">
            স্বপ্নপূরণ সমবায় সমিতি
          </CardTitle>
          <CardDescription className="text-sm">
            গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড দিন</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="পাসওয়ার্ড"
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-[hsl(var(--coop-blue))] hover:bg-[hsl(var(--coop-blue)/0.9)]">
              প্রবেশ করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
