
import React, { useState } from 'react';

interface WheelProps {
  onWin: (amount: number) => void;
}

const Wheel: React.FC<WheelProps> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  const prizes = [
    { label: 'S/ 2.0', value: 2 },
    { label: 'S/ 0.5', value: 0.5 },
    { label: 'S/ 10', value: 10 },
    { label: 'S/ 1.0', value: 1 },
    { label: 'S/ 5.0', value: 5 },
    { label: 'Nada', value: 0 },
    { label: 'S/ 100', value: 100 },
    { label: 'S/ 0.2', value: 0.2 }
  ];

  const handleSpin = () => {
    if (isSpinning || hasPlayedToday) return;

    setIsSpinning(true);
    const extraDegrees = 1800 + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasPlayedToday(true);
      
      const normalizedRotation = newRotation % 360;
      const index = Math.floor((360 - (normalizedRotation % 360)) / (360 / prizes.length)) % prizes.length;
      const prize = prizes[index];
      
      if (prize.value > 0) {
        onWin(prize.value);
        alert(`¡Felicidades! Ganaste ${prize.label}`);
      } else {
        alert("¡Suerte para la próxima!");
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-10 py-10 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Ruleta Millonaria</h2>
        <p className="text-xs font-bold text-gray-400">Prueba tu suerte una vez al día.</p>
      </div>

      <div className="relative">
        {/* Indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 text-red-600 text-4xl">
          <i className="fas fa-caret-down"></i>
        </div>
        
        {/* The Wheel */}
        <div 
          className="w-72 h-72 rounded-full border-8 border-gray-900 relative shadow-2xl transition-transform duration-[3000ms] ease-out overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((p, i) => (
            <div 
              key={i}
              className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end px-4 font-black text-[10px] text-white"
              style={{ 
                transform: `rotate(${i * (360 / prizes.length)}deg)`,
                backgroundColor: i % 2 === 0 ? '#1d4ed8' : '#3b82f6',
                clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)'
              }}
            >
              <span className="rotate-90 origin-right whitespace-nowrap">{p.label}</span>
            </div>
          ))}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-4 border-gray-900 z-10 flex items-center justify-center font-black text-xs">LEVG</div>
        </div>
      </div>

      <button 
        onClick={handleSpin}
        disabled={isSpinning || hasPlayedToday}
        className={`px-12 py-5 rounded-full font-black text-white text-lg uppercase tracking-widest shadow-2xl transition-all active:scale-90 ${
          isSpinning || hasPlayedToday ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-200'
        }`}
      >
        {isSpinning ? 'Girando...' : (hasPlayedToday ? 'Vuelve mañana' : '¡Girar ahora!')}
      </button>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-xs text-center">
         <p className="text-[10px] font-bold text-gray-500 italic">
            "Invierto mis ganancias en los nuevos proyectos para crecer más rápido." - Usuario LEVG
         </p>
      </div>
    </div>
  );
};

export default Wheel;
