
import React from 'react';
import { AppView, User } from '../types';
import { SUPPORT_INFO, LAUNCH_DATE } from '../constants';

interface HomeProps {
  setView: (view: AppView) => void;
  onCheckIn: () => void;
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ setView, onCheckIn, user }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Carnival Style Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-between border-4 border-white shadow-xl animate-bounce">
        <span className="flex items-center gap-2">
            <i className="fas fa-rocket"></i> ¡LANZADO HOY!
        </span>
        <span className="bg-black/20 px-3 py-1 rounded-full">{LAUNCH_DATE}</span>
      </div>

      {/* Hero Banner with Lima Vibes */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-60 group border-b-8 border-yellow-400">
        <img 
          src="https://picsum.photos/seed/limacarnival/800/400" 
          alt="Carnaval de Inversión" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-8">
          <h2 className="text-white text-4xl font-black uppercase tracking-tighter italic leading-none mb-1">
            CARNAVAL <br/> <span className="text-yellow-400">DE GANANCIAS</span>
          </h2>
          <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">La Velocidad del Cajón Peruano en tus pagos</p>
        </div>
      </div>

      {/* Instant Payment Badge */}
      <div className="bg-teal-600 text-white p-4 rounded-3xl flex items-center gap-4 shadow-lg border-2 border-teal-400 animate-pulse">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <i className="fas fa-bolt text-2xl"></i>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest">Payments Latam Activo</h4>
          <p className="text-[8px] font-bold opacity-80 uppercase">Tus recargas se reflejan al instante sin esperas 24/7</p>
        </div>
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onCheckIn}
          className="bg-white p-6 rounded-[2.5rem] border-4 border-orange-200 shadow-xl flex flex-col items-center gap-3 hover:bg-orange-50 transition-all active:scale-90"
        >
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center shadow-inner">
            <i className="fas fa-calendar-check text-3xl"></i>
          </div>
          <span className="font-black text-gray-800 text-[10px] uppercase tracking-tighter">Bono Diario</span>
        </button>
        <button 
          onClick={() => setView(AppView.WHEEL)}
          className="bg-white p-6 rounded-[2.5rem] border-4 border-purple-200 shadow-xl flex flex-col items-center gap-3 hover:bg-purple-50 transition-all active:scale-90"
        >
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center shadow-inner">
            <i className="fas fa-dharmachakra text-3xl animate-spin-slow"></i>
          </div>
          <span className="font-black text-gray-800 text-[10px] uppercase tracking-tighter">Ruleta Luck</span>
        </button>
      </div>

      {/* Social and Support */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-black text-xs mb-1 flex items-center gap-3 uppercase text-gray-400 tracking-widest">
          <div className="w-8 h-px bg-gray-200"></div> Comunidad Oficial <div className="w-8 h-px bg-gray-200"></div>
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <a 
            href={`https://wa.me/${SUPPORT_INFO.whatsapp.replace(/\D/g, '')}`} 
            target="_blank" 
            className="flex items-center justify-between bg-emerald-500 text-white p-5 rounded-2xl shadow-xl shadow-emerald-100 transition-transform hover:scale-[1.03] group"
          >
            <div className="flex items-center gap-4">
              <i className="fab fa-whatsapp text-3xl"></i>
              <div className="flex flex-col">
                <span className="font-black text-[10px] uppercase">Soporte Lendlease</span>
                <span className="text-[8px] opacity-70">Atención Personalizada</span>
              </div>
            </div>
            <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a 
            href="https://t.me/levgperu" 
            target="_blank" 
            className="flex items-center justify-between bg-sky-500 text-white p-5 rounded-2xl shadow-xl shadow-sky-100 transition-transform hover:scale-[1.03] group"
          >
            <div className="flex items-center gap-4">
              <i className="fab fa-telegram text-3xl"></i>
              <div className="flex flex-col">
                <span className="font-black text-[10px] uppercase">Canal Oficial</span>
                <span className="text-[8px] opacity-70">Bonos y Noticias</span>
              </div>
            </div>
            <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>

      {/* Featured CTA: New Low Entry Projects */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-900 to-black p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-t-8 border-yellow-400">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <i className="fas fa-gem text-9xl animate-pulse"></i>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">NUEVO</span>
            <h4 className="font-black text-2xl uppercase tracking-tighter leading-none italic">PROYECTOS VIC <br/> DESDE S/ 10</h4>
          </div>
          <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-8">Rendimientos disparados por el lanzamiento oficial.</p>
          <button 
            onClick={() => setView(AppView.INVEST)}
            className="w-full bg-yellow-400 text-indigo-950 font-black py-5 rounded-3xl shadow-xl shadow-yellow-200 transition-all active:scale-95 uppercase text-sm tracking-widest"
          >
            Ver Catálogo Real
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
