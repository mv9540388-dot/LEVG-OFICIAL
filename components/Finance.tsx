
import React, { useState } from 'react';
import { User } from '../types';
import { PAYMENT_INFO } from '../constants';

interface FinanceProps {
  user: User | null;
  onRecharge: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

const Finance: React.FC<FinanceProps> = ({ user, onRecharge, onWithdraw }) => {
  const [activeTab, setActiveTab] = useState<'recharge' | 'withdraw'>('recharge');
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('Yape');

  const banks = [
    { name: 'Yape', icon: 'fa-mobile-alt', color: 'bg-purple-600' },
    { name: 'BCP', icon: 'fa-university', color: 'bg-blue-800' },
    { name: 'BBVA', icon: 'fa-university', color: 'bg-blue-900' },
    { name: 'Interbank', icon: 'fa-university', color: 'bg-green-600' },
    { name: 'Scotiabank', icon: 'fa-university', color: 'bg-red-600' }
  ];

  const handleAction = () => {
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt <= 0) return alert("Ingrese un monto válido");

    if (activeTab === 'recharge') {
      if (!showInvoice) {
        setShowInvoice(true);
        return;
      }
      if (!proofUploaded) return alert("Por favor suba la captura de su comprobante");
      
      setIsProcessing(true);
      setTimeout(() => {
        onRecharge(numAmt);
        setIsProcessing(false);
        alert(`¡DEPÓSITO CONFIRMADO! Payments Latam ha verificado tu pago de S/ ${numAmt}. Tu saldo se ha actualizado instantáneamente.`);
        setAmount('');
        setShowInvoice(false);
        setProofUploaded(false);
      }, 1500);
    } else {
      if (numAmt > (user?.balance || 0)) return alert("Saldo insuficiente");
      setIsProcessing(true);
      setTimeout(() => {
        onWithdraw(numAmt);
        setIsProcessing(false);
        alert(`Solicitud de retiro recibida. Transferencia bancaria en curso a través de la red ${PAYMENT_INFO.withdrawalBank}.`);
        setAmount('');
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Dynamic Balance Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-800 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-4 border-teal-400">
        <div className="absolute -top-10 -right-10 opacity-10">
            <i className="fas fa-coins text-[14rem] animate-pulse"></i>
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-teal-400 text-teal-950 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Saldo Activo</span>
                <span className="bg-white/10 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Payments Latam Online</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter">S/ {user?.balance.toFixed(2)}</span>
            </div>
            <div className="mt-8 flex justify-between items-end bg-white/5 p-4 rounded-2xl">
                <div>
                    <span className="text-[9px] text-white/40 font-black uppercase block">Ganancias del Día</span>
                    <span className="font-black text-lg text-teal-300">+S/ {(user?.totalEarned || 0).toFixed(2)}</span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] text-white/40 font-black uppercase block">Estatus</span>
                    <span className="font-black text-sm text-yellow-400 italic">Nivel {user?.vipLevel}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex bg-gray-100 p-2">
          <button 
            className={`flex-1 py-5 rounded-[2rem] font-black transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'recharge' ? 'bg-white text-blue-700 shadow-xl' : 'text-gray-400'}`}
            onClick={() => setActiveTab('recharge')}
          >
            <i className="fas fa-plus-circle"></i> Recargar
          </button>
          <button 
            className={`flex-1 py-5 rounded-[2rem] font-black transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'withdraw' ? 'bg-white text-blue-700 shadow-xl' : 'text-gray-400'}`}
            onClick={() => setActiveTab('withdraw')}
          >
            <i className="fas fa-minus-circle"></i> Retirar
          </button>
        </div>

        <div className="p-8 space-y-8">
          {!showInvoice ? (
            <div className="space-y-8 animate-fade-in">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Monto a Operar (Soles)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-blue-600 text-2xl">S/</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-16 pr-8 py-6 bg-gray-50 border-4 border-transparent focus:border-blue-500 rounded-[2rem] outline-none text-3xl font-black transition-all shadow-inner"
                  />
                </div>
              </div>

              {activeTab === 'recharge' ? (
                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Selecciona Canal de Pago</h4>
                   <div className="grid grid-cols-2 gap-3">
                      {banks.map(bank => (
                        <button 
                          key={bank.name}
                          onClick={() => setSelectedBank(bank.name)}
                          className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                            selectedBank === bank.name ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                          }`}
                        >
                          <div className={`w-10 h-10 ${bank.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                            <i className={`fas ${bank.icon}`}></i>
                          </div>
                          <span className="font-black text-xs text-gray-700 uppercase">{bank.name}</span>
                        </button>
                      ))}
                   </div>
                   <div className="flex items-center gap-4 p-5 bg-teal-50 rounded-3xl border border-teal-100 shadow-sm">
                      <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-teal-200 animate-bounce">
                        <i className="fas fa-bolt"></i>
                      </div>
                      <p className="text-[10px] text-teal-900 font-black leading-tight uppercase tracking-wider">
                        INSTANTÁNEO: <br/><span className="text-teal-600 font-bold">Payments Latam verificado 24/7</span>
                      </p>
                   </div>
                </div>
              ) : (
                <div className="space-y-6">
                   <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
                      <i className="fas fa-university text-3xl text-blue-600"></i>
                      <div>
                        <h4 className="font-black text-xs uppercase text-blue-900 tracking-widest">Retiro Vía BCP</h4>
                        <p className="text-[10px] text-blue-500 font-bold uppercase">Transferencias Seguras a Terceros</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="N° de Cuenta o CCI BCP"
                        className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                      />
                      <input 
                        type="text" 
                        placeholder="Nombre Completo del Titular"
                        className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                      />
                   </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-slide-up">
              <div className="bg-white border-4 border-blue-600 p-8 rounded-[2.5rem] space-y-6 shadow-2xl relative">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em]">Ticket de Pago</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase italic">Canal: {selectedBank} - Payments Latam</span>
                  </div>
                  <i className="fas fa-shield-check text-2xl text-teal-500"></i>
                </div>
                
                <div className="space-y-5">
                  <div className="flex flex-col text-center py-4 bg-gray-50 rounded-3xl">
                    <span className="text-[9px] text-gray-400 font-black uppercase mb-1">Monto a Transferir</span>
                    <span className="font-black text-4xl text-gray-900 tracking-tighter">S/ {amount}</span>
                  </div>

                  <div className="space-y-4 px-2">
                    <div className="flex justify-between items-center group">
                      <span className="text-[9px] text-gray-400 font-black uppercase">Titular Recaudación</span>
                      <span className="font-black text-xs uppercase text-gray-800">{PAYMENT_INFO.receiver}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-[9px] text-gray-400 font-black uppercase">{selectedBank === 'Yape' ? 'Celular Yape' : 'Cuenta BCP'}</span>
                      <span className="font-black text-xs text-blue-700">{selectedBank === 'Yape' ? PAYMENT_INFO.phone : PAYMENT_INFO.bcp}</span>
                    </div>
                  </div>
                  
                  {selectedBank !== 'Yape' && (
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col gap-1">
                      <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">CCI Interbancario</span>
                      <span className="font-mono text-[9px] break-all font-black text-blue-900">{PAYMENT_INFO.cci}</span>
                    </div>
                  )}
                </div>
              </div>

              <div 
                onClick={() => setProofUploaded(true)}
                className={`border-4 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center gap-4 transition-all cursor-pointer group ${
                  proofUploaded ? 'border-teal-500 bg-teal-50 shadow-xl shadow-teal-100' : 'border-gray-200 hover:border-blue-500 bg-gray-50'
                }`}
              >
                <i className={`fas ${proofUploaded ? 'fa-check-circle text-teal-500 scale-125' : 'fa-cloud-upload-alt text-gray-300 group-hover:text-blue-400'} text-5xl transition-all duration-300`}></i>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center leading-tight">
                  {proofUploaded ? '¡Captura Subida con Éxito!' : 'Subir Captura del Pago Realizado'}
                </span>
              </div>
            </div>
          )}

          <button 
            onClick={handleAction}
            disabled={isProcessing}
            className={`w-full py-6 rounded-[2.5rem] font-black text-white text-xs uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 ${
              isProcessing ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800 shadow-blue-200'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <i className="fas fa-spinner fa-spin"></i> Verificando en Payments Latam...
              </span>
            ) : (showInvoice ? 'Confirmar Depósito' : (activeTab === 'recharge' ? 'Continuar al Pago' : 'Solicitar Retiro BCP'))}
          </button>
        </div>
      </div>

      <div className="text-center px-8">
        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
          Tu dinero está protegido por la red de seguridad de Lendlease Group & Payments Latam Service Perú. Retiros pagados vía BCP.
        </p>
      </div>
    </div>
  );
};

export default Finance;
