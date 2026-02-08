
import React from 'react';
import { User, Transaction } from '../types';

interface ProfileProps {
  user: User | null;
  transactions: Transaction[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, transactions, onLogout }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <i className="fas fa-user-circle text-4xl"></i>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.phone}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Equipo {user.vipLevel}
            </span>
            <span className="text-[10px] text-gray-400">Desde: {user.joinDate}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 block mb-1">Código de Referido</span>
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-700">{user.referralCode}</span>
            <button className="text-blue-500 hover:text-blue-700"><i className="fas fa-copy"></i></button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 block mb-1">Nivel VIP</span>
          <div className="flex justify-between items-center">
            <span className="font-bold text-amber-600">Nivel 1</span>
            <i className="fas fa-crown text-amber-400"></i>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3 px-1">Historial de Transacciones</h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <i className="fas fa-history text-3xl mb-2 block"></i>
              No hay transacciones aún.
            </div>
          ) : (
            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'Recarga' ? 'bg-green-50 text-green-600' :
                      tx.type === 'Retiro' ? 'bg-red-50 text-red-600' :
                      tx.type === 'Inversión' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      <i className={`fas ${
                        tx.type === 'Recarga' ? 'fa-arrow-down' :
                        tx.type === 'Retiro' ? 'fa-arrow-up' :
                        tx.type === 'Inversión' ? 'fa-building' :
                        'fa-gift'
                      }`}></i>
                    </div>
                    <div>
                      <span className="font-bold text-sm block">{tx.type}</span>
                      <span className="text-[10px] text-gray-400">{tx.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold block ${
                      tx.type === 'Recarga' || tx.type === 'Bono' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'Recarga' || tx.type === 'Bono' ? '+' : '-'} S/ {tx.amount.toFixed(2)}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      tx.status === 'Completado' ? 'bg-green-100 text-green-700' :
                      tx.status === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-gray-100 text-gray-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
      >
        <i className="fas fa-sign-out-alt"></i>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
