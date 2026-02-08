
import React, { useState, useEffect } from 'react';
import { AppView, User, Transaction, ActiveInvestment } from './types';
import Login from './components/Auth';
import Home from './components/Home';
import Invest from './components/Invest';
import Finance from './components/Finance';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Teams from './components/Teams';
import Testimonials from './components/Testimonials';
import Chatbot from './components/Chatbot';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Wheel from './components/Wheel';
import SVIP from './components/SVIP';
import { PRODUCTS, STACKING_BONUSES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('levg_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView(AppView.HOME);
    }
  }, []);

  const handleLogin = (phone: string, name: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Inversionista LEVG',
      phone,
      balance: 10, // Welcome bonus
      vipLevel: 'Básico',
      referralCode: 'LEVG' + Math.floor(Math.random() * 9000 + 1000),
      joinDate: new Date().toLocaleDateString(),
      totalInvested: 0,
      totalEarned: 0,
      investments: []
    };
    setUser(newUser);
    localStorage.setItem('levg_user', JSON.stringify(newUser));
    setTransactions([{
      id: 'tx_welcome',
      type: 'Bono',
      amount: 10,
      status: 'Completado',
      date: new Date().toLocaleString()
    }]);
    setView(AppView.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('levg_user');
    setView(AppView.LOGIN);
  };

  const updateBalance = (amount: number, type: Transaction['type'], status: Transaction['status'] = 'Completado') => {
    if (!user) return;
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type,
      amount,
      status,
      date: new Date().toLocaleString()
    };
    
    setTransactions(prev => [newTx, ...prev]);
    
    if (status === 'Completado') {
      const updatedUser = { 
        ...user, 
        balance: user.balance + amount,
        totalInvested: type === 'Inversión' ? user.totalInvested + Math.abs(amount) : user.totalInvested,
        totalEarned: (type === 'Bono' || type === 'Ruleta' || type === 'Check-in' || type === 'SVIP Bonus') ? user.totalEarned + amount : user.totalEarned
      };
      setUser(updatedUser);
      localStorage.setItem('levg_user', JSON.stringify(updatedUser));
    }
  };

  const handleInvestment = (productId: string, units: number) => {
    if (!user) return;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const totalCost = product.minInvestment * units;

    if (user.balance < totalCost) {
      alert("Saldo insuficiente para comprar estas unidades. Por favor recarga.");
      return;
    }

    const currentUnits = user.investments.find(inv => inv.productId === productId)?.units || 0;
    if (product.purchaseLimit && (currentUnits + units) > product.purchaseLimit) {
      alert(`Has alcanzado el límite de compra para este producto. Límite: ${product.purchaseLimit} unidades.`);
      return;
    }

    const updatedInvestments = [...user.investments];
    const index = updatedInvestments.findIndex(inv => inv.productId === productId);
    if (index > -1) {
      updatedInvestments[index].units += units;
    } else {
      updatedInvestments.push({ productId, purchaseDate: new Date().toISOString(), units: units });
    }

    // Logic for Stacking Bonus (VIC/SIVP level)
    const newUnitsTotal = (index > -1 ? updatedInvestments[index].units : units);
    if (newUnitsTotal >= 2) {
       const bonusAmount = STACKING_BONUSES[product.tier];
       // Only alert if they just crossed the threshold
       if (currentUnits < 2 && newUnitsTotal >= 2) {
         alert(`¡Nivel SIVP Alcanzado! Al tener 2 o más unidades de ${product.tier}, recibirás S/ ${bonusAmount} adicionales diarios.`);
       }
    }

    updateBalance(-totalCost, 'Inversión');
    const updatedUser = { ...user, investments: updatedInvestments };
    setUser(updatedUser);
    localStorage.setItem('levg_user', JSON.stringify(updatedUser));
    
    alert(`¡Compra Exitosa! Has adquirido ${units} unidad(es) de ${product.title}. Empezarás a generar ingresos ahora.`);
  };

  const handleCheckIn = () => {
    if (!user) return;
    const today = new Date().toLocaleDateString();
    if (user.lastCheckIn === today) {
      alert("Ya has realizado tu check-in diario hoy.");
      return;
    }
    const reward = 1.0; 
    updateBalance(reward, 'Check-in');
    const updatedUser = { ...user, lastCheckIn: today };
    setUser(updatedUser);
    localStorage.setItem('levg_user', JSON.stringify(updatedUser));
    alert(`¡Check-in exitoso! Has recibido S/ ${reward}.`);
  };

  if (view === AppView.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      <Header user={user} onOpenChat={() => setView(AppView.CHAT)} />
      
      <main className="flex-1 overflow-y-auto pb-24 pt-4 px-4">
        {view === AppView.HOME && <Home setView={setView} onCheckIn={handleCheckIn} user={user} />}
        {view === AppView.INVEST && <Invest user={user} onInvest={handleInvestment} />}
        {view === AppView.FINANCE && <Finance user={user} onRecharge={(amt) => updateBalance(amt, 'Recarga', 'Pendiente')} onWithdraw={(amt) => updateBalance(-amt, 'Retiro')} />}
        {view === AppView.PROFILE && <Profile user={user} transactions={transactions} onLogout={handleLogout} />}
        {view === AppView.ACTIVITY && <Activity user={user} onClaim={(amt) => updateBalance(amt, 'Bono')} setView={setView} />}
        {view === AppView.TEAMS && <Teams user={user} />}
        {view === AppView.TESTIMONIALS && <Testimonials />}
        {view === AppView.CHAT && <Chatbot />}
        {view === AppView.WHEEL && <Wheel onWin={(amt) => updateBalance(amt, 'Ruleta')} />}
        {view === AppView.SVIP && <SVIP user={user} onBuy={(price, name) => {
           if(user && user.balance >= price) {
             updateBalance(-price, 'Inversión');
             const updated = {...user, vipLevel: 'SVIP' as const};
             setUser(updated);
             alert(`¡Felicidades! Ahora eres Miembro ${name}`);
           } else {
             alert("Saldo insuficiente");
           }
        }} />}
      </main>

      <Navigation currentView={view} setView={setView} />
    </div>
  );
};

export default App;
