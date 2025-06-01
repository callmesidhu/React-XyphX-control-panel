import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

import Dashboard from '@/components/Dashboard';
import Portfolio from '@/components/Portfolio';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate loading for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setIsSidebarOpen(false);
  };

  const renderLoadingSkeleton = () => (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-20 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-10 w-3/6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-10 w-3/6" />
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main
        className={`
          min-h-screen transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-64'}
          p-4 md:p-8
        `}
      >
        <div className="max-w-7xl mx-auto">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
