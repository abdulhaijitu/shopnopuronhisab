import { useState, useEffect, useCallback } from 'react';
import { getMembers, getCollections, saveCollectionsBatch } from '@/lib/store';
import { Member, CollectionEntry, MONTHS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, Printer, Download } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface RowData {
  member: Member;
  amount: number;
  paymentDate: string;
  paid: boolean;
}

export default function CollectionSheet() {
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[currentMonthIdx]);
  const [rows, setRows] = useState<RowData[]>([]);

  const loadData = useCallback(() => {
    const members = getMembers();
    const collections = getCollections(selectedMonth);
    const data: RowData[] = members.map(m => {
      const entry = collections.find(c => c.memberId === m.id);
      return {
        member: m,
        amount: entry?.amount ?? 0,
        paymentDate: entry?.paymentDate ?? '',
        paid: entry?.paid ?? false,
      };
    });
    setRows(data);
  }, [selectedMonth]);

  useEffect(() => { loadData(); }, [loadData]);

  const updateRow = (idx: number, field: keyof Omit<RowData, 'member'>, value: any) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    const entries: CollectionEntry[] = rows.map(r => ({
      memberId: r.member.id,
      month: selectedMonth,
      amount: r.amount,
      paymentDate: r.paymentDate,
      paid: r.paid,
    }));
    saveCollectionsBatch(entries);
    toast.success(`${selectedMonth} মাসের হিসাব সংরক্ষণ হয়েছে`);
  };

  const handlePrint = () => {
    handleSave();
    window.print();
  };

  const handleExportCSV = () => {
    const BOM = '\uFEFF';
    const headers = ['নং', 'সদস্যের নাম', 'মোবাইল', 'শেয়ার', 'টাকার পরিমাণ', 'টাকা প্রদানের তারিখ', 'স্ট্যাটাস'];
    const csvRows = [headers.join(',')];
    rows.forEach((r, i) => {
      csvRows.push([
        i + 1,
        `"${r.member.name}"`,
        r.member.mobile,
        r.member.shares,
        r.amount,
        r.paymentDate ? format(new Date(r.paymentDate), 'dd/MM/yyyy') : '',
        r.paid ? 'পরিশোধিত' : 'বাকি',
      ].join(','));
    });
    const blob = new Blob([BOM + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `হিসাব_সিট_${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV ফাইল ডাউনলোড হচ্ছে');
  };

  const totalCollection = rows.filter(r => r.paid).reduce((s, r) => s + r.amount, 0);
  const paidCount = rows.filter(r => r.paid).length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
      {/* Print header - only visible when printing */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-xl font-bold">স্বপ্নপূরণ সমবায় সমিতি</h1>
        <p className="text-sm">গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫</p>
        <p className="text-sm">যোগাযোগ: ০১৭২৭-৭০৭২৭৬, ০১৯৩০-০৬৩১১২</p>
        <p className="text-base font-bold mt-2">মাসিক আদায় সিট — {selectedMonth}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <h2 className="text-xl font-bold">প্রতি মাসের হিসাব সিট</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">মাস:</span>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap gap-4 text-sm no-print">
        <span className="bg-[hsl(var(--coop-blue)/0.1)] text-[hsl(var(--coop-blue))] px-3 py-1 rounded-full font-medium">
          মোট সদস্য: {rows.length}
        </span>
        <span className="bg-[hsl(var(--coop-green)/0.1)] text-[hsl(var(--coop-green))] px-3 py-1 rounded-full font-medium">
          আদায়কৃত: {paidCount}/{rows.length}
        </span>
        <span className="bg-[hsl(var(--coop-red)/0.1)] text-[hsl(var(--coop-red))] px-3 py-1 rounded-full font-medium">
          মোট আদায়: ৳{totalCollection.toLocaleString('bn-BD')}
        </span>
      </div>

      {/* Ledger table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="ledger-table">
          <thead>
            <tr>
              <th className="w-12">নং</th>
              <th>সদস্যের নাম</th>
              <th className="hidden sm:table-cell">পেশা</th>
              <th className="hidden sm:table-cell">মোবাইল</th>
              <th className="w-16">শেয়ার</th>
              <th className="w-28">টাকার পরিমাণ</th>
              <th className="w-40">টাকা প্রদানের তারিখ</th>
              <th className="w-24">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.member.id} className={row.paid ? 'bg-[hsl(var(--coop-green)/0.05)]' : ''}>
                <td className="text-center">{idx + 1}</td>
                <td className="font-medium">{row.member.name}</td>
                <td className="hidden sm:table-cell">{row.member.occupation}</td>
                <td className="hidden sm:table-cell">{row.member.mobile}</td>
                <td className="text-center">{row.member.shares}</td>
                <td>
                  <Input
                    type="number"
                    min={0}
                    value={row.amount || ''}
                    onChange={e => updateRow(idx, 'amount', parseInt(e.target.value) || 0)}
                    className="h-8 text-sm w-full"
                    placeholder="০"
                  />
                </td>
                <td>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn('w-full justify-start text-left font-normal h-8 text-xs', !row.paymentDate && 'text-muted-foreground')}
                      >
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {row.paymentDate ? format(new Date(row.paymentDate), 'dd/MM/yyyy') : 'তারিখ'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={row.paymentDate ? new Date(row.paymentDate) : undefined}
                        onSelect={d => updateRow(idx, 'paymentDate', d ? d.toISOString() : '')}
                        className={cn('p-3 pointer-events-auto')}
                        locale={bn}
                      />
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox
                      checked={row.paid}
                      onCheckedChange={v => updateRow(idx, 'paid', !!v)}
                    />
                    <span className={`text-xs font-medium ${row.paid ? 'text-[hsl(var(--coop-green))]' : 'text-muted-foreground'}`}>
                      {row.paid ? 'পরিশোধিত' : 'বাকি'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">কোনো সদস্য নেই। প্রথমে সদস্য যুক্ত করুন।</td></tr>
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="bg-muted font-bold">
                <td colSpan={4} className="text-right">মোট আদায়:</td>
                <td className="text-center">৳{totalCollection.toLocaleString('bn-BD')}</td>
                <td></td>
                <td className="text-center text-sm">{paidCount}/{rows.length} জন</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 no-print">
        <Button onClick={handleSave} className="bg-[hsl(var(--coop-green))] hover:bg-[hsl(var(--coop-green)/0.9)]">
          <Save className="h-4 w-4 mr-1" /> সংরক্ষণ করুন
        </Button>
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
