
import React from 'react';
import { User } from '../types';
import { MEMBERSHIPS } from '../constants';

interface SVIPProps {
  user: User | null;
  onBuy: (price: number, name: string) => void;
}

const SVIP: React.FC<SVIPProps> = ({ user, onBuy }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-black text-amber-600 uppercase tracking-tighter">Membresías SVIP</h2>
        <p className="text-xs font-bold text-gray-400">Obtén beneficios exclusivos y bonos diarios.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MEMBERSHIPS.map((m) => (
          <div key={m.id} className="bg-white rounded-[2rem] border-4 border-amber-200 shadow-xl overflow-hidden p-6 relative">
            {user?.vipLevel === 'SVIP' && <div className="absolute top-4 right-4 bg-amber-600 text-white text-[10px] font-black px-2 py-1 rounded-full">ACTIVO</div>}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fas fa-crown text-2xl"></i>
              </div>
              <div>
                <h3 className="font-black text-lg text-gray-900 uppercase leading-none">{m.name}</h3>
                <span className="text-xs text-green-600 font-black">+ S/ {m.dailyBonus} Bono Diario</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {m.perks.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <i className="fas fa-check-circle text-amber-500"></i>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase">Precio</span>
                <span className="text-2xl font-black text-blue-700">S/ {m.price}</span>
              </div>
              <button 
                onClick={() => onBuy(m.price, m.name)}
                className="bg-gray-900 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                Adquirir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SVIP;
