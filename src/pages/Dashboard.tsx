import { useState } from 'react';
import { getMembers, getAllCollections } from '@/lib/store';
import { MONTHS, getYearsList } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Share2, Banknote, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const members = getMembers();
  const allCollections = getAllCollections();
  const years = getYearsList();

  const currentMonthIdx = new Date().getMonth();
  const currentMonth = MONTHS[currentMonthIdx];
  const currentMonthKey = `${currentMonth}-${selectedYear}`;

  const totalMembers = members.length;
  const totalShares = members.reduce((s, m) => s + m.shares, 0);

  // Filter collections for selected year (support both new "month-year" and old "month" format)
  const yearCollections = allCollections.filter(c => {
    if (c.month.includes('-')) {
      return c.month.endsWith(`-${selectedYear}`);
    }
    // Old format: treat as current year
    return selectedYear === new Date().getFullYear().toString();
  });

  const currentMonthCollections = yearCollections.filter(c => {
    const monthName = c.month.includes('-') ? c.month.split('-')[0] : c.month;
    return monthName === currentMonth && c.paid;
  });
  const currentMonthTotal = currentMonthCollections.reduce((s, c) => s + c.amount, 0);
  const totalYearly = yearCollections.filter(c => c.paid).reduce((s, c) => s + c.amount, 0);

  const cards = [
    { label: 'মোট সদস্য', value: totalMembers, icon: Users, color: 'var(--coop-blue)' },
    { label: 'মোট শেয়ার', value: totalShares, icon: Share2, color: 'var(--coop-green)' },
    { label: `${currentMonth} আদায়`, value: `৳${currentMonthTotal.toLocaleString('bn-BD')}`, icon: Banknote, color: 'var(--coop-red)' },
    { label: `${selectedYear} সর্বমোট`, value: `৳${totalYearly.toLocaleString('bn-BD')}`, icon: TrendingUp, color: 'var(--coop-blue)' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold">ড্যাশবোর্ড</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">বছর:</span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

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

      {/* Monthly summary for selected year */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">মাসভিত্তিক আদায় সারাংশ — {selectedYear}</CardTitle>
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
                  const mc = yearCollections.filter(c => {
                    const monthName = c.month.includes('-') ? c.month.split('-')[0] : c.month;
                    return monthName === month && c.paid;
                  });
                  const total = mc.reduce((s, c) => s + c.amount, 0);
                  return (
                    <tr key={month}>
                      <td className="font-medium">{month}</td>
                      <td className="text-center">{mc.length}</td>
                      <td className={`text-right ${total > 0 ? 'text-[hsl(var(--coop-green))] font-medium' : 'text-muted-foreground'}`}>
                        {total > 0 ? `৳${total.toLocaleString('bn-BD')}` : '—'}
                      </td>
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
