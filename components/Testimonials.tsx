
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Muro de Retiros</h2>
        <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">En vivo</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <i className="fas fa-user"></i>
                </div>
                <span className="font-bold text-sm">{t.user}</span>
              </div>
              <span className="text-[10px] text-gray-400">{t.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">"{t.comment}"</p>
            <div className="bg-green-50 p-3 rounded-xl flex items-center justify-between border border-green-100">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="text-xs font-bold text-green-800 uppercase">Retiro Exitoso</span>
              </div>
              <span className="font-bold text-green-700">S/ {t.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 p-6 rounded-2xl text-center text-white">
        <h3 className="font-bold text-lg mb-2">¡Sé parte de nuestro muro!</h3>
        <p className="text-white/80 text-xs mb-4">Comparte tu captura de retiro en nuestro grupo y recibe un bono especial.</p>
        <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl text-sm shadow-md active:scale-95 transition-transform">
          Unirse a la Comunidad
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
