
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onOpenChat }) => {
  return (
    <header className="gradient-bg text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-900 font-bold">L</span>
          </div>
          <h1 className="font-bold text-xl tracking-tight">LEVG</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            S/ {user?.balance.toFixed(2)}
          </div>
          <button 
            onClick={onOpenChat}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="fas fa-headset"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
