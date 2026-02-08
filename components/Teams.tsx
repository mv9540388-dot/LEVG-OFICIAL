
import React from 'react';
import { User } from '../types';
import { COMMISSIONS } from '../constants';

interface TeamsProps {
  user: User | null;
}

const Teams: React.FC<TeamsProps> = ({ user }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-network-wired text-8xl"></i>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Lendlease Network</h2>
        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-2">Gana por cada nivel de tu red</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { level: 1, label: 'Nivel 1 (Directos)', comm: COMMISSIONS.LEVEL_1 * 100, icon: '🥇' },
          { level: 2, label: 'Nivel 2 (Indirectos)', comm: COMMISSIONS.LEVEL_2 * 100, icon: '🥈' },
          { level: 3, label: 'Nivel 3 (Sub-equipo)', comm: COMMISSIONS.LEVEL_3 * 100, icon: '🥉' },
        ].map((item) => (
          <div key={item.level} className="bg-white p-6 rounded-3xl border-4 border-gray-100 shadow-lg flex justify-between items-center group hover:border-blue-500 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-black text-sm uppercase text-gray-800">{item.label}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Comisión por Primera Inversión</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-black text-blue-700">{item.comm}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4 uppercase tracking-tighter">Comparte tu Enlace</h3>
        <div className="bg-gray-50 p-5 rounded-2xl flex items-center justify-between gap-4 border-2 border-dashed border-gray-200">
          <span className="text-[10px] font-mono truncate text-gray-500 font-bold uppercase tracking-tighter">
            https://levg.pe/register?ref={user?.referralCode}
          </span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`https://levg.pe/register?ref=${user?.referralCode}`);
              alert("Enlace copiado al portapapeles.");
            }}
            className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-lg shadow-blue-200"
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
        
        <div className="mt-10 space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center font-black shadow-inner shrink-0">1</div>
            <div>
              <h4 className="font-black text-sm uppercase">Copia y Envía</h4>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Comparte tu enlace de invitación a través de WhatsApp, Telegram o Facebook.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center font-black shadow-inner shrink-0">2</div>
            <div>
              <h4 className="font-black text-sm uppercase">Registro Exitoso</h4>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Tus amigos se unen y realizan su primera inversión inmobiliaria segura.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center font-black shadow-inner shrink-0">3</div>
            <div>
              <h4 className="font-black text-sm uppercase">Cobra al Instante</h4>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Recibe hasta el 12% de comisión directamente en tu balance para retirar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
