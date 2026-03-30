import { LayoutDashboard, Users, FileSpreadsheet, BarChart3, Settings, LogOut, Download } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { setAuthenticated } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { path: '/members', label: 'সদস্য তালিকা', icon: Users },
  { path: '/collection', label: 'হিসাব সিট', icon: FileSpreadsheet },
  { path: '/yearly', label: 'বার্ষিক রিপোর্ট', icon: BarChart3 },
  { path: '/settings', label: 'সেটিংস', icon: Settings },
];

export default function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === 'collapsed';
  const isMobile = useIsMobile();
  const location = useLocation();

  const handleLogout = () => {
    setAuthenticated(false);
    window.location.reload();
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="no-print border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="text-center animate-fade-in">
            <h1 className="text-lg font-bold text-[hsl(var(--coop-green))]">
              স্বপ্নপূরণ সমবায় সমিতি
            </h1>
            <p className="text-xs opacity-70 mt-1">
              গাউছুল আজম সুপার মার্কেট, কাঁটাবন রোড, ঢাকা-১২০৫
            </p>
          </div>
        ) : (
          <div className="flex justify-center animate-scale-in">
            <span className="text-lg font-bold text-[hsl(var(--coop-green))]">স্ব</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={item.path} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <NavLink
                      to={item.path}
                      end
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-sidebar-accent hover:translate-x-1"
                      activeClassName="bg-sidebar-accent text-[hsl(var(--coop-green))] font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0 transition-transform duration-200" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'default'}
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="ml-3">লগআউট</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
