import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileSpreadsheet, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setAuthenticated } from '@/lib/store';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { path: '/members', label: 'সদস্য তালিকা', icon: Users },
  { path: '/collection', label: 'হিসাব সিট', icon: FileSpreadsheet },
];

export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.reload();
  };

  return (
    <header className="no-print bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] shadow-lg">
      {/* Top brand bar */}
      <div className="border-b border-[hsl(var(--sidebar-border))]">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-[hsl(var(--coop-green))]">
            স্বপ্নপূরণ সমবায় সমিতি
          </h1>
          <p className="text-xs md:text-sm opacity-80 mt-0.5">
            গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫
          </p>
          <p className="text-xs opacity-60">
            যোগাযোগ: ০১৭২৭-৭০৭২৭৬, ০১৯৩০-০৬৩১১২
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <nav className="hidden md:flex gap-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--coop-green))]'
                    : 'hover:bg-[hsl(var(--sidebar-accent))] opacity-80 hover:opacity-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hidden md:flex text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
          >
            <LogOut className="h-4 w-4 mr-1" />
            লগআউট
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm ${
                  location.pathname === item.path
                    ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--coop-green))]'
                    : 'opacity-80'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm opacity-80"
            >
              <LogOut className="h-4 w-4" />
              লগআউট
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
