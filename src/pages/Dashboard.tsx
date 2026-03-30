import { getMembers, getAllCollections } from '@/lib/store';
import { MONTHS } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Share2, Banknote, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const members = getMembers();
  const allCollections = getAllCollections();

  const currentMonthIdx = new Date().getMonth();
  const currentMonth = MONTHS[currentMonthIdx];

  const totalMembers = members.length;
  const totalShares = members.reduce((s, m) => s + m.shares, 0);

  const currentMonthCollections = allCollections.filter(c => c.month === currentMonth && c.paid);
  const currentMonthTotal = currentMonthCollections.reduce((s, c) => s + c.amount, 0);
  const totalAllTime = allCollections.filter(c => c.paid).reduce((s, c) => s + c.amount, 0);

  const cards = [
    { label: 'মোট সদস্য', value: totalMembers, icon: Users, color: 'var(--coop-blue)' },
    { label: 'মোট শেয়ার', value: totalShares, icon: Share2, color: 'var(--coop-green)' },
    { label: `${currentMonth} আদায়`, value: `৳${currentMonthTotal.toLocaleString('bn-BD')}`, icon: Banknote, color: 'var(--coop-red)' },
    { label: 'সর্বমোট আদায়', value: `৳${totalAllTime.toLocaleString('bn-BD')}`, icon: TrendingUp, color: 'var(--coop-blue)' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-xl font-bold">ড্যাশবোর্ড</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <Card key={i} className="border-l-4" style={{ borderLeftColor: `hsl(${c.color})` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-5 w-5" style={{ color: `hsl(${c.color})` }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent month summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">মাসভিত্তিক আদায় সারাংশ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>মাস</th>
                  <th>আদায়কৃত সদস্য</th>
                  <th>মোট আদায়</th>
                </tr>
              </thead>
              <tbody>
                {MONTHS.map(month => {
                  const mc = allCollections.filter(c => c.month === month && c.paid);
                  return (
                    <tr key={month}>
                      <td className="font-medium">{month}</td>
                      <td className="text-center">{mc.length}</td>
                      <td className="text-right">৳{mc.reduce((s, c) => s + c.amount, 0).toLocaleString('bn-BD')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
