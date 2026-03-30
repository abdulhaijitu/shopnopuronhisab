import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { label: 'ড্যাশবোর্ড', path: '/', icon: LayoutDashboard },
  { label: 'সদস্য', path: '/members', icon: Users },
  { label: 'আদায়', path: '/collection', icon: ClipboardList },
  { label: 'রিপোর্ট', path: '/yearly', icon: BarChart3 },
  { label: 'সেটিংস', path: '/settings', icon: Settings },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around md:hidden z-50 no-print pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
              isActive
                ? 'text-[hsl(var(--coop-green))]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
