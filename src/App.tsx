import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { isAuthenticated } from '@/lib/store';
import LoginScreen from '@/components/LoginScreen';
import AppHeader from '@/components/AppHeader';
import Dashboard from '@/pages/Dashboard';
import MembersPage from '@/pages/Members';
import CollectionSheet from '@/pages/CollectionSheet';
import YearlyReport from '@/pages/YearlyReport';
import NotFound from '@/pages/NotFound';

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
          <AppHeader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/collection" element={<CollectionSheet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
