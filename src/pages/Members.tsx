import { useState } from 'react';
import { getMembers, addMember, updateMember, deleteMember } from '@/lib/store';
import { Member } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Phone, Briefcase, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(getMembers());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: '', occupation: '', mobile: '', shares: 1 });
  const isMobile = useIsMobile();

  const refresh = () => setMembers(getMembers());

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', occupation: '', mobile: '', shares: 1 });
    setDialogOpen(true);
  };

  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({ name: m.name, occupation: m.occupation, mobile: m.mobile, shares: m.shares });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('সদস্যের নাম দিন'); return; }
    if (editing) {
      updateMember(editing.id, form);
      toast.success('সদস্য তথ্য আপডেট হয়েছে');
    } else {
      addMember(form);
      toast.success('নতুন সদস্য যুক্ত হয়েছে');
    }
    setDialogOpen(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি এই সদস্যকে মুছে ফেলতে চান?')) {
      deleteMember(id);
      toast.success('সদস্য মুছে ফেলা হয়েছে');
      refresh();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">সদস্য তালিকা</h2>
        <Button onClick={openAdd} size={isMobile ? 'sm' : 'default'} className="bg-[hsl(var(--coop-green))] hover:bg-[hsl(var(--coop-green)/0.9)]">
          <Plus className="h-4 w-4 mr-1" /> নতুন সদস্য
        </Button>
      </div>

      {/* Mobile card view */}
      {isMobile ? (
        <div className="space-y-3">
          {members.map((m, i) => (
            <div key={m.id} className="rounded-lg border bg-card p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">#{i + 1}</span>
                  <h3 className="font-semibold text-sm">{m.name}</h3>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(m)}>
                    <Pencil className="h-4 w-4 text-[hsl(var(--coop-blue))]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(m.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{m.occupation || '—'}</span>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{m.mobile || '—'}</span>
                <span className="flex items-center gap-1"><Share2 className="h-3 w-3" />শেয়ার: {m.shares}</span>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">কোনো সদস্য নেই</p>
          )}
        </div>
      ) : (
        /* Desktop table view */
        <div className="table-scroll-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th className="w-16">নং</th>
                <th>সদস্যের নাম</th>
                <th>পেশা</th>
                <th>মোবাইল</th>
                <th className="w-20">শেয়ার</th>
                <th className="w-28 no-print">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.id}>
                  <td className="text-center">{i + 1}</td>
                  <td>{m.name}</td>
                  <td>{m.occupation}</td>
                  <td>{m.mobile}</td>
                  <td className="text-center">{m.shares}</td>
                  <td className="no-print">
                    <div className="flex gap-1 justify-center">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(m)}>
                        <Pencil className="h-4 w-4 text-[hsl(var(--coop-blue))]" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">কোনো সদস্য নেই</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'সদস্য সম্পাদনা' : 'নতুন সদস্য যুক্ত করুন'}</DialogTitle>
            <DialogDescription>সদস্যের তথ্য পূরণ করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>সদস্যের নাম</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="নাম লিখুন" />
            </div>
            <div className="space-y-2">
              <Label>পেশা</Label>
              <Input value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} placeholder="পেশা লিখুন" />
            </div>
            <div className="space-y-2">
              <Label>মোবাইল নম্বর</Label>
              <Input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="০১XXX-XXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>শেয়ার সংখ্যা</Label>
              <Input type="number" min={1} value={form.shares} onChange={e => setForm({ ...form, shares: parseInt(e.target.value) || 1 })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>বাতিল</Button>
            <Button onClick={handleSave} className="bg-[hsl(var(--coop-blue))] hover:bg-[hsl(var(--coop-blue)/0.9)]">
              {editing ? 'আপডেট করুন' : 'যুক্ত করুন'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
