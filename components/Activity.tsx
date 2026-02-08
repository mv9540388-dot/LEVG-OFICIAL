
import React from 'react';
import { User, AppView } from '../types';
import { MISSIONS, TEAM_RECHARGE_REWARDS, LAUNCH_DATE } from '../constants';

interface ActivityProps {
  user: User | null;
  onClaim: (amount: number) => void;
  setView: (view: AppView) => void;
}

const Activity: React.FC<ActivityProps> = ({ user, onClaim, setView }) => {
  return (
    <div className="space-y-6 pb-10">
      <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 p-6 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <h2 className="text-3xl font-black mb-1 uppercase tracking-tighter">Eventos Especiales</h2>
        <p className="text-white/80 text-xs font-bold bg-white/20 inline-block px-3 py-1 rounded-full">
          Lanzamiento: {LAUNCH_DATE}
        </p>
      </div>

      {/* Team Recharge Rewards Section */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <i className="fas fa-users-cog"></i>
          </div>
          <div>
            <h3 className="font-black text-sm uppercase">Premios de Equipo Lendlease</h3>
            <p className="text-[10px] text-gray-400">Recarga acumulada diaria LV1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {TEAM_RECHARGE_REWARDS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase">Hito LV1</span>
                <span className="text-sm font-bold text-gray-800">S/ {item.threshold.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-green-500 uppercase">Premio</span>
                <div className="text-green-600 font-black">S/ {item.reward}</div>
              </div>
              <button 
                onClick={() => onClaim(item.reward)}
                className="ml-4 px-4 py-2 bg-green-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest active:scale-95 transition-transform"
              >
                Cajear
              </button>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-[9px] text-amber-800 space-y-1 italic">
          <p>• El sistema se reinicia diariamente.</p>
          <p>• Solo cuentan recargas de nuevos usuarios invitados el mismo día.</p>
          <p>• Se recomienda reclamar el nivel más alto alcanzado.</p>
        </div>
      </div>

      {/* Special Highlights */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setView(AppView.WHEEL)}
          className="bg-white p-5 rounded-3xl border-4 border-purple-400 shadow-lg flex flex-col items-center gap-3 hover:scale-105 transition-transform"
        >
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <i className="fas fa-dharmachakra text-2xl animate-spin-slow"></i>
          </div>
          <span className="font-black text-gray-800 text-xs uppercase">Ruleta Diaria</span>
        </button>
        <button 
          onClick={() => setView(AppView.SVIP)}
          className="bg-white p-5 rounded-3xl border-4 border-amber-400 shadow-lg flex flex-col items-center gap-3 hover:scale-105 transition-transform"
        >
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <i className="fas fa-crown text-2xl"></i>
          </div>
          <span className="font-black text-gray-800 text-xs uppercase">Membresía SVIP</span>
        </button>
      </div>

      {/* Missions */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-800 uppercase px-1">Retos de Usuario</h3>
        {MISSIONS.map((m) => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
              <i className="fas fa-star text-2xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-gray-800 text-sm">{m.title}</h4>
              <p className="text-[10px] text-gray-400 leading-tight">{m.description}</p>
              <div className="mt-1">
                <span className="text-green-600 font-black text-sm">+ S/ {m.reward}</span>
              </div>
            </div>
            <button 
              onClick={() => onClaim(m.reward)}
              className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest active:scale-95 transition-transform"
            >
              Cajear
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-8 rounded-[2rem] border-4 border-blue-500 shadow-2xl">
        <h3 className="font-black mb-4 flex items-center gap-2 text-sm uppercase text-white">
          <i className="fas fa-ticket-alt text-orange-500"></i>
          Canjear Código LEVG
        </h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Introduce Código" 
            className="flex-1 p-4 bg-white/10 border-2 border-white/20 rounded-2xl outline-none focus:border-blue-500 font-black text-center text-white"
          />
          <button className="px-6 bg-blue-600 text-white font-black rounded-2xl active:scale-95 transition-transform">
            OK
          </button>
        </div>
        <p className="mt-3 text-[9px] text-white/40 text-center uppercase font-bold tracking-widest">Reclama bonos en nuestro Telegram</p>
      </div>
    </div>
  );
};

export default Activity;
