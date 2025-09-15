import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Bookmark, Bell, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navigation on login or chat pages
  if (location.pathname === '/' || location.pathname === '/chat') {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/home', variant: 'agriculture' as const },
    { icon: Bookmark, label: 'Saved', path: '/saved', variant: 'golden' as const },
    { icon: Bell, label: 'Alerts', path: '/alerts', variant: 'ghost' as const },
    { icon: Settings, label: 'Settings', path: '/settings', variant: 'ghost' as const },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? item.variant : 'ghost'}
                size="icon-lg"
                onClick={() => navigate(item.path)}
                className="flex-col h-16 w-16 gap-1"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;