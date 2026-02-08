
import React, { useState } from 'react';
import { User } from '../types';
import { PRODUCTS } from '../constants';

interface InvestProps {
  user: User | null;
  onInvest: (productId: string, units: number) => void;
}

const Invest: React.FC<InvestProps> = ({ user, onInvest }) => {
  const [filter, setFilter] = useState('Todos');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const tiers = ['Todos', 'VIC1', 'VIC2', 'VIC3', 'VIC4', 'VIC5', 'NWS6', 'NWS7', 'NWS8', 'NWS9', 'QLD10'];

  const filteredProducts = filter === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.tier === filter);

  const updateQty = (id: string, delta: number) => {
    const current = quantities[id] || 1;
    const next = Math.max(1, current + delta);
    setQuantities(prev => ({ ...prev, [id]: next }));
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-5 sticky top-16 z-40 bg-gray-50/95 backdrop-blur py-4 px-2">
        <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
                PROYECTOS <br/> <span className="text-blue-600">INMOBILIARIOS</span>
            </h2>
            <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Sistema Lendlease</span>
                <span className="text-green-600 font-black text-[10px] uppercase flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> ONLINE
                </span>
            </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide px-1">
          {tiers.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === t 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105 border-b-4 border-blue-900' 
                  : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-blue-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 px-1">
        {filteredProducts.map((p) => {
          const active = user?.investments.find(inv => inv.productId === p.id);
          const currentUnitsOwned = active?.units || 0;
          const selectedQty = quantities[p.id] || 1;
          
          return (
            <div 
              key={p.id} 
              className={`bg-white rounded-[3rem] border-[6px] ${p.colorTheme} shadow-2xl overflow-hidden flex flex-col transition-all hover:translate-y-[-5px] group`}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[1500ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Product Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-white px-5 py-2 rounded-2xl text-[10px] font-black text-indigo-950 shadow-2xl uppercase tracking-widest border border-gray-100 flex items-center gap-2">
                      <i className="fas fa-crown text-amber-500"></i> {p.tier}
                    </div>
                </div>

                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/10">
                   Ciclo: {p.cycleDays} días
                </div>

                <div className="absolute bottom-6 left-8 text-white">
                  <span className="text-[10px] font-black uppercase opacity-60 block tracking-[0.3em] mb-1">Información Activo</span>
                  <h3 className="font-black text-3xl uppercase tracking-tighter leading-none group-hover:text-yellow-400 transition-colors">{p.title}</h3>
                </div>

                {currentUnitsOwned > 0 && (
                   <div className="absolute bottom-6 right-8 bg-teal-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase shadow-2xl border-2 border-teal-300">
                      {currentUnitsOwned} PROPIEDAD{currentUnitsOwned > 1 ? 'ES' : ''}
                   </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
                  <p className="text-gray-600 text-[11px] font-medium leading-relaxed italic">
                    "{p.description}"
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-50 p-6 rounded-[2.5rem] border-4 border-transparent hover:border-blue-100 transition-all flex flex-col items-center shadow-inner group/box">
                    <span className="block text-[10px] text-gray-400 uppercase font-black mb-1 tracking-widest">Inversión</span>
                    <span className="text-blue-900 font-black text-3xl leading-none tracking-tighter">S/ {p.minInvestment}</span>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-[2.5rem] border-4 border-transparent hover:border-teal-100 transition-all flex flex-col items-center shadow-inner group/box">
                    <span className="block text-[10px] text-teal-500 uppercase font-black mb-1 tracking-widest">Ganancia Diaria</span>
                    <span className="text-teal-600 font-black text-3xl leading-none tracking-tighter">S/ {p.dailyReturn.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-[2rem] border-2 border-gray-200">
                   <span className="text-xs font-black uppercase text-gray-500 ml-4 tracking-widest">Cantidad:</span>
                   <div className="flex items-center gap-6 mr-2">
                      <button 
                        onClick={() => updateQty(p.id, -1)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-black shadow-sm border border-gray-100 active:scale-90 transition-transform"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="text-2xl font-black text-blue-900 w-8 text-center">{selectedQty}</span>
                      <button 
                        onClick={() => updateQty(p.id, 1)}
                        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg shadow-blue-200 active:scale-90 transition-transform"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                   </div>
                </div>

                <div className="bg-black p-5 rounded-3xl mb-8 flex items-center justify-between border-b-4 border-blue-600">
                   <div>
                       <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Total a Invertir</p>
                       <p className="text-xl text-white font-black leading-none">S/ {(p.minInvestment * selectedQty).toFixed(2)}</p>
                   </div>
                   <div className="text-right">
                       <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Ganas en {p.cycleDays} días</p>
                       <p className="text-xl text-teal-400 font-black leading-none">S/ {(p.dailyReturn * p.cycleDays * selectedQty).toFixed(2)}</p>
                   </div>
                </div>

                <button 
                  onClick={() => onInvest(p.id, selectedQty)}
                  className="w-full bg-blue-600 text-white font-black py-6 rounded-[2.5rem] hover:bg-blue-700 transition-all shadow-2xl active:scale-95 uppercase text-xs tracking-[0.4em] relative overflow-hidden group shadow-blue-200"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <i className="fas fa-shopping-cart text-lg"></i> Invertir Ahora
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 opacity-10 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invest;
