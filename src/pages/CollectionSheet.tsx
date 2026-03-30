import { useState, useEffect, useCallback } from 'react';
import { getMembers, getCollections, saveCollectionsBatch } from '@/lib/store';
import { Member, CollectionEntry, MONTHS, getYearsList } from '@/lib/types';
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
import { useIsMobile } from '@/hooks/use-mobile';

interface RowData {
  member: Member;
  amount: number;
  paymentDate: string;
  paid: boolean;
}

export default function CollectionSheet() {
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[currentMonthIdx]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [rows, setRows] = useState<RowData[]>([]);
  const years = getYearsList();
  const isMobile = useIsMobile();

  const monthKey = `${selectedMonth}-${selectedYear}`;

  const loadData = useCallback(() => {
    const members = getMembers();
    const allCollections = getCollections(monthKey);
    const oldCollections = selectedYear === new Date().getFullYear().toString() ? getCollections(selectedMonth) : [];
    const combined = [...allCollections, ...oldCollections];
    const data: RowData[] = members.map(m => {
      const entry = combined.find(c => c.memberId === m.id);
      return {
        member: m,
        amount: entry?.amount ?? 0,
        paymentDate: entry?.paymentDate ?? '',
        paid: entry?.paid ?? false,
      };
    });
    setRows(data);
  }, [monthKey, selectedMonth, selectedYear]);

  useEffect(() => { loadData(); }, [loadData]);

  const updateRow = (idx: number, field: keyof Omit<RowData, 'member'>, value: any) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    const entries: CollectionEntry[] = rows.map(r => ({
      memberId: r.member.id,
      month: monthKey,
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
    const headers = ['নং', 'সদস্যের নাম', 'পেশা', 'মোবাইল', 'শেয়ার', 'টাকার পরিমাণ', 'টাকা প্রদানের তারিখ', 'স্ট্যাটাস'];
    const csvRows = [headers.join(',')];
    rows.forEach((r, i) => {
      csvRows.push([
        i + 1,
        `"${r.member.name}"`,
        `"${r.member.occupation}"`,
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
    a.download = `হিসাব_সিট_${selectedMonth}_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV ফাইল ডাউনলোড হচ্ছে');
  };

  const totalCollection = rows.filter(r => r.paid).reduce((s, r) => s + r.amount, 0);
  const paidCount = rows.filter(r => r.paid).length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
      {/* Print header */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-xl font-bold">স্বপ্নপূরণ সমবায় সমিতি</h1>
        <p className="text-sm">গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫</p>
        <p className="text-sm">যোগাযোগ: ০১৭২৭-৭০৭২৭৬, ০১৯৩০-০৬৩১১২</p>
        <p className="text-base font-bold mt-2">মাসিক আদায় সিট — {selectedMonth} {selectedYear}</p>
      </div>

      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-3 space-y-3 no-print border-b border-border -mx-4 px-4 pt-2 sm:-mx-6 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold">প্রতি মাসের হিসাব সিট</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-20 h-8 text-xs sm:w-24 sm:h-9 sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-28 h-8 text-xs sm:w-40 sm:h-9 sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary + actions in one row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[hsl(var(--coop-blue)/0.1)] text-[hsl(var(--coop-blue))] px-2 py-0.5 rounded-full text-xs font-medium">
            সদস্য: {rows.length}
          </span>
          <span className="bg-[hsl(var(--coop-green)/0.1)] text-[hsl(var(--coop-green))] px-2 py-0.5 rounded-full text-xs font-medium">
            আদায়: {paidCount}/{rows.length}
          </span>
          <span className="bg-[hsl(var(--coop-red)/0.1)] text-[hsl(var(--coop-red))] px-2 py-0.5 rounded-full text-xs font-medium">
            ৳{totalCollection.toLocaleString('bn-BD')}
          </span>
          <div className="flex gap-1.5 ml-auto">
            <Button onClick={handleSave} size="sm" className="h-7 text-xs bg-[hsl(var(--coop-green))] hover:bg-[hsl(var(--coop-green)/0.9)]">
              <Save className="h-3.5 w-3.5 mr-1" /> সংরক্ষণ
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm" className="h-7 text-xs">
              <Printer className="h-3.5 w-3.5" />
            </Button>
            <Button onClick={handleExportCSV} variant="outline" size="sm" className="h-7 text-xs">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile card view */}
      {isMobile ? (
        <div className="space-y-3 print:hidden">
          {rows.map((row, idx) => (
            <div
              key={row.member.id}
              className={cn(
                'rounded-lg border bg-card p-3 space-y-3',
                row.paid && 'border-[hsl(var(--coop-green)/0.4)] bg-[hsl(var(--coop-green)/0.03)]'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                  <h3 className="font-semibold text-sm">{row.member.name}</h3>
                  <p className="text-xs text-muted-foreground">শেয়ার: {row.member.shares}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={row.paid}
                    onCheckedChange={v => updateRow(idx, 'paid', !!v)}
                  />
                  <span className={cn('text-xs font-medium', row.paid ? 'text-[hsl(var(--coop-green))]' : 'text-muted-foreground')}>
                    {row.paid ? 'পরিশোধিত' : 'বাকি'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">টাকা</label>
                  <Input
                    type="number"
                    min={0}
                    value={row.amount || ''}
                    onChange={e => updateRow(idx, 'amount', parseInt(e.target.value) || 0)}
                    className="h-8 text-sm"
                    placeholder="০"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">তারিখ</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn('w-full justify-start text-left font-normal h-8 text-xs', !row.paymentDate && 'text-muted-foreground')}
                      >
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {row.paymentDate ? format(new Date(row.paymentDate), 'dd/MM/yy') : 'তারিখ'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={row.paymentDate ? new Date(row.paymentDate) : undefined}
                        onSelect={d => updateRow(idx, 'paymentDate', d ? d.toISOString() : '')}
                        className="p-3 pointer-events-auto"
                        locale={bn}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">কোনো সদস্য নেই। প্রথমে সদস্য যুক্ত করুন।</p>
          )}
        </div>
      ) : (
        /* Desktop table view */
        <div className="table-scroll-wrapper print:border-0">
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
                          className="p-3 pointer-events-auto"
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
                  <td colSpan={5} className="text-right">মোট আদায়:</td>
                  <td className="text-center">৳{totalCollection.toLocaleString('bn-BD')}</td>
                  <td></td>
                  <td className="text-center text-sm">{paidCount}/{rows.length} জন</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {/* Print-only table (always full table for printing) */}
      <div className="hidden print:block">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>নং</th>
              <th>সদস্যের নাম</th>
              <th>পেশা</th>
              <th>মোবাইল</th>
              <th>শেয়ার</th>
              <th>টাকার পরিমাণ</th>
              <th>তারিখ</th>
              <th>স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.member.id}>
                <td className="text-center">{idx + 1}</td>
                <td>{row.member.name}</td>
                <td>{row.member.occupation}</td>
                <td>{row.member.mobile}</td>
                <td className="text-center">{row.member.shares}</td>
                <td className="text-center">{row.amount > 0 ? `৳${row.amount.toLocaleString('bn-BD')}` : '—'}</td>
                <td>{row.paymentDate ? format(new Date(row.paymentDate), 'dd/MM/yyyy') : ''}</td>
                <td className="text-center">{row.paid ? 'পরিশোধিত' : 'বাকি'}</td>
              </tr>
            ))}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="font-bold">
                <td colSpan={5} className="text-right">মোট আদায়:</td>
                <td className="text-center">৳{totalCollection.toLocaleString('bn-BD')}</td>
                <td></td>
                <td className="text-center">{paidCount}/{rows.length} জন</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
