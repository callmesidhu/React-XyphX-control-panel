
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderOpen, LogOut, Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebase';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  onLogout,
  isOpen,
  onToggle
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
  ];
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-primary/20"
        onClick={onToggle}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur-sm border-r border-primary/20 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center space-x-3">
              <img src='/logo_dark.png' alt="Logo" className="w-16 h-16 " />
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r  text-primary-400 bg-clip-text text-transparent">
                  XyphX
                </h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`
                    w-full justify-start space-x-3 transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                      : 'hover:bg-primary/10 hover:text-primary text-foreground/80'
                    }
                  `}
                  onClick={() => {
                    onPageChange(item.id);
                    if (window.innerWidth < 768) onToggle();
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary/20">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Navigation;
