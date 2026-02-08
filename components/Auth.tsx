
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (phone: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      onLogin(phone, name);
    } else {
      alert("Por favor ingrese un número de teléfono válido (9 dígitos)");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-white max-w-md mx-auto">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-lg mb-4 transform rotate-12">
          <span className="text-blue-900 text-4xl font-black -rotate-12">LEVG</span>
        </div>
        <h1 className="text-3xl font-bold">Bienvenido a LEVG</h1>
        <p className="opacity-80 mt-2">La mejor plataforma de inversión inmobiliaria</p>
      </div>

      <div className="bg-white rounded-2xl p-6 w-full text-gray-800 shadow-2xl">
        <div className="flex mb-6 border-b">
          <button 
            className={`flex-1 pb-2 font-semibold ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`flex-1 pb-2 font-semibold ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-3.5 text-gray-400"></i>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej: Juan Perez"
                  required={!isLogin}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <div className="relative">
              <i className="fas fa-phone absolute left-3 top-3.5 text-gray-400"></i>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="912 345 678"
                maxLength={9}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3.5 text-gray-400"></i>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 mt-4"
          >
            {isLogin ? 'Acceder' : 'Crear Cuenta'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          Al continuar, aceptas nuestros <span className="underline">Términos y Condiciones</span>
        </div>
      </div>

      <div className="mt-8 text-white/70 text-sm flex items-center gap-2">
        <i className="fas fa-shield-alt"></i>
        <span>Lanzamiento Exclusivo Perú - 2024</span>
      </div>
    </div>
  );
};

export default Login;
