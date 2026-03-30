import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { isAuthenticated } from '@/lib/store';
import LoginScreen from '@/components/LoginScreen';
import AppSidebar from '@/components/AppSidebar';
import Dashboard from '@/pages/Dashboard';
import MembersPage from '@/pages/Members';
import CollectionSheet from '@/pages/CollectionSheet';
import YearlyReport from '@/pages/YearlyReport';
import SettingsPage from '@/pages/SettingsPage';
import NotFound from '@/pages/NotFound';
import MobileBottomNav from '@/components/MobileBottomNav';

const queryClient = new QueryClient();

const App = () => {
  const [authed, setAuthed] = useState(isAuthenticated());

  if (!authed) {
    return (
      <>
        <Sonner />
        <LoginScreen onSuccess={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <header className="no-print h-12 hidden md:flex items-center border-b border-border bg-background px-4 gap-3">
                  <SidebarTrigger />
                  <h2 className="hidden sm:block text-sm font-semibold text-[hsl(var(--coop-green))] truncate">
                    স্বপ্নপূরণ সমবায় সমিতি
                  </h2>
                </header>
                <main className="flex-1 overflow-auto pb-16 md:pb-0">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/members" element={<MembersPage />} />
                    <Route path="/collection" element={<CollectionSheet />} />
                    <Route path="/yearly" element={<YearlyReport />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
