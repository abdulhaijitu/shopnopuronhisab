import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { label: 'ড্যাশবোর্ড', path: '/', icon: LayoutDashboard },
  { label: 'সদস্য', path: '/members', icon: Users },
  { label: 'আদায়', path: '/collection', icon: ClipboardList },
  { label: 'রিপোর্ট', path: '/yearly', icon: BarChart3 },
  { label: 'ইনস্টল', path: '/install', icon: Download },
];

const triggerHaptic = () => {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
};

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-md border-t border-border flex items-center justify-around md:hidden z-50 no-print pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={triggerHaptic}
            className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 active:scale-90 ${
              isActive
                ? 'text-[hsl(var(--coop-green))]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute top-1.5 w-1 h-1 rounded-full bg-[hsl(var(--coop-green))] animate-scale-in" />
            )}
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </span>
            <span className={`text-[10px] font-medium leading-tight transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
