import { useState } from 'react';
import { getMembers, getAllCollections } from '@/lib/store';
import { MONTHS } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

const YEARS = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 2 + i).toString());

export default function YearlyReport() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const members = getMembers();
  const allCollections = getAllCollections();

  // Build a map: memberId -> month -> amount
  const data = members.map((m, idx) => {
    const monthlyAmounts = MONTHS.map(month => {
      const entry = allCollections.find(c => c.memberId === m.id && c.month === month && c.paid);
      return entry?.amount ?? 0;
    });
    const total = monthlyAmounts.reduce((s, a) => s + a, 0);
    return { member: m, serial: idx + 1, monthlyAmounts, total };
  });

  const monthTotals = MONTHS.map((_, mi) => data.reduce((s, d) => s + d.monthlyAmounts[mi], 0));
  const grandTotal = data.reduce((s, d) => s + d.total, 0);

  const handleExportCSV = () => {
    const BOM = '\uFEFF';
    const headers = ['নং', 'সদস্যের নাম', ...MONTHS, 'মোট'];
    const csvRows = [headers.join(',')];
    data.forEach(d => {
      csvRows.push([d.serial, `"${d.member.name}"`, ...d.monthlyAmounts, d.total].join(','));
    });
    csvRows.push(['', 'মোট', ...monthTotals, grandTotal].join(','));
    const blob = new Blob([BOM + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `বার্ষিক_রিপোর্ট_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV ফাইল ডাউনলোড হচ্ছে');
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-4">
      {/* Print header */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-xl font-bold">স্বপ্নপূরণ সমবায় সমিতি</h1>
        <p className="text-sm">গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫</p>
        <p className="text-base font-bold mt-2">বার্ষিক আদায় সারাংশ — {selectedYear}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <h2 className="text-xl font-bold">বার্ষিক সারাংশ রিপোর্ট</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">বছর:</span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-4 text-sm no-print">
        <span className="bg-[hsl(var(--coop-blue)/0.1)] text-[hsl(var(--coop-blue))] px-3 py-1 rounded-full font-medium">
          মোট সদস্য: {members.length}
        </span>
        <span className="bg-[hsl(var(--coop-green)/0.1)] text-[hsl(var(--coop-green))] px-3 py-1 rounded-full font-medium">
          সর্বমোট আদায়: ৳{grandTotal.toLocaleString('bn-BD')}
        </span>
      </div>

      {/* Yearly table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="ledger-table text-xs">
          <thead>
            <tr>
              <th className="w-10">নং</th>
              <th className="min-w-[140px] text-left">সদস্যের নাম</th>
              {MONTHS.map(m => (
                <th key={m} className="min-w-[70px]">{m.slice(0, 3)}</th>
              ))}
              <th className="min-w-[80px] bg-[hsl(var(--coop-green))] text-white">মোট</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.member.id}>
                <td className="text-center">{d.serial}</td>
                <td className="font-medium">{d.member.name}</td>
                {d.monthlyAmounts.map((amt, mi) => (
                  <td key={mi} className={`text-center ${amt > 0 ? 'text-[hsl(var(--coop-green))] font-medium' : 'text-muted-foreground'}`}>
                    {amt > 0 ? `৳${amt.toLocaleString('bn-BD')}` : '—'}
                  </td>
                ))}
                <td className="text-center font-bold bg-[hsl(var(--coop-green)/0.08)]">
                  ৳{d.total.toLocaleString('bn-BD')}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={14 + 1} className="text-center py-8 text-muted-foreground">কোনো ডেটা নেই</td></tr>
            )}
          </tbody>
          {data.length > 0 && (
            <tfoot>
              <tr className="bg-muted font-bold text-xs">
                <td colSpan={2} className="text-right">মাসিক মোট:</td>
                {monthTotals.map((t, i) => (
                  <td key={i} className="text-center">{t > 0 ? `৳${t.toLocaleString('bn-BD')}` : '—'}</td>
                ))}
                <td className="text-center bg-[hsl(var(--coop-green)/0.15)]">৳{grandTotal.toLocaleString('bn-BD')}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 no-print">
        <Button onClick={handlePrint} variant="outline">
          <Printer className="h-4 w-4 mr-1" /> প্রিন্ট করুন
        </Button>
        <Button onClick={handleExportCSV} variant="outline">
          <Download className="h-4 w-4 mr-1" /> CSV ডাউনলোড
        </Button>
      </div>
    </div>
  );
}
