
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.HOME, icon: 'fa-home', label: 'Inicio' },
    { view: AppView.INVEST, icon: 'fa-building', label: 'Invertir' },
    { view: AppView.FINANCE, icon: 'fa-wallet', label: 'Finanzas' },
    { view: AppView.ACTIVITY, icon: 'fa-gift', label: 'Bonos' },
    { view: AppView.PROFILE, icon: 'fa-user', label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => setView(item.view)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === item.view ? 'text-blue-700' : 'text-gray-400'
          }`}
        >
          <i className={`fas ${item.icon} text-xl`}></i>
          <span className="text-[10px] font-semibold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
