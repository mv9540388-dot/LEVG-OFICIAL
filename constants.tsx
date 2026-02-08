
import { InvestmentProduct, Mission, Testimonial, Membership } from './types';

export const LAUNCH_DATE = "8 de febrero de 2026";

export const COMMISSIONS = {
  LEVEL_1: 0.12, // 12%
  LEVEL_2: 0.03, // 3%
  LEVEL_3: 0.01  // 1%
};

export const STACKING_BONUSES: Record<string, number> = {
  'VIC1': 5,
  'VIC2': 8,
  'VIC3': 12,
  'VIC4': 18,
  'VIC5': 28,
  'NWS6': 38,
  'NWS7': 48,
  'NWS8': 58,
  'NWS9': 68,
  'QLD10': 88
};

export const PAYMENT_INFO = {
  receiver: "Thalia Salazar Barrera",
  phone: "+51 932672182",
  yape: "932672182",
  bcp: "19197651014086",
  cci: "00219119765101408656",
  service: "Payments Latam Service 🇵🇪",
  withdrawalBank: "BCP (Banco de Crédito del Perú)"
};

export const SUPPORT_INFO = {
  whatsapp: "+51 938382628",
  telegram: "LEVG PERU"
};

export const TEAM_RECHARGE_REWARDS = [
  { threshold: 800, reward: 10 },
  { threshold: 1500, reward: 20 },
  { threshold: 3000, reward: 35 },
  { threshold: 5000, reward: 50 },
  { threshold: 8000, reward: 80 },
  { threshold: 15000, reward: 180 },
];

const THEMES = [
  'border-yellow-400 shadow-yellow-200 bg-yellow-50/50',
  'border-blue-500 shadow-blue-200 bg-blue-50/50',
  'border-purple-600 shadow-purple-200 bg-purple-50/50',
  'border-pink-500 shadow-pink-200 bg-pink-50/50',
  'border-orange-500 shadow-orange-200 bg-orange-50/50',
  'border-teal-500 shadow-teal-200 bg-teal-50/50',
  'border-indigo-600 shadow-indigo-200 bg-indigo-50/50',
  'border-red-500 shadow-red-200 bg-red-50/50',
  'border-emerald-500 shadow-emerald-200 bg-emerald-50/50',
  'border-cyan-500 shadow-cyan-200 bg-cyan-50/50'
];

// Cheaper products with higher gains as requested
const tierConfig: Array<{
  tier: InvestmentProduct['tier'];
  price: number;
  profit: number;
  count: number;
  limit?: number;
}> = [
  { tier: 'VIC1', price: 10, profit: 1.8, count: 6 }, // Super cheap entry
  { tier: 'VIC2', price: 50, profit: 10, count: 6 },
  { tier: 'VIC3', price: 200, profit: 45, count: 6 },
  { tier: 'VIC4', price: 500, profit: 120, count: 6 },
  { tier: 'VIC5', price: 1200, profit: 300, count: 6 },
  { tier: 'NWS6', price: 2500, profit: 650, count: 6, limit: 10 },
  { tier: 'NWS7', price: 5000, profit: 1400, count: 6, limit: 10 },
  { tier: 'NWS8', price: 10000, profit: 3000, count: 6, limit: 5 },
  { tier: 'NWS9', price: 18000, profit: 5800, count: 6, limit: 5 },
  { tier: 'QLD10', price: 30000, profit: 11000, count: 6, limit: 2 },
];

export const PRODUCTS: InvestmentProduct[] = tierConfig.flatMap((cfg, i) => 
  Array.from({ length: cfg.count }).map((_, j) => ({
    id: `${cfg.tier}-${j + 1}`,
    title: `${cfg.tier} ${['Residencial', 'Empresarial', 'Global', 'Elite', 'Vanguard', 'Alpha'][j % 6]}`,
    tier: cfg.tier,
    type: j % 2 === 0 ? 'Edificio' : 'Casa',
    minInvestment: cfg.price,
    dailyReturn: cfg.profit,
    cycleDays: 10 + (i * 2), // Short cycles for faster returns
    image: `https://picsum.photos/seed/levgperu${cfg.tier}${j}/600/400`,
    description: `Este producto de inversión inmobiliaria es gestionado por el sistema de IA de Lendlease. Los fondos se reinvierten en proyectos de alta demanda en Lima y provincias.`,
    colorTheme: THEMES[i % THEMES.length],
    purchaseLimit: cfg.limit
  }))
);

export const MEMBERSHIPS: Membership[] = [
  { id: 'svip1', name: 'SVIP BRONCE', price: 100, dailyBonus: 2, perks: ['Soporte Prioritario', 'Retiros 1h', 'Bono 5% Referidos'] },
  { id: 'svip2', name: 'SVIP ORO', price: 500, dailyBonus: 15, perks: ['Gestor Personal', 'Retiros Instantáneos', 'Bono 10% Referidos'] },
  { id: 'svip3', name: 'SVIP DIAMANTE', price: 2000, dailyBonus: 75, perks: ['Acceso a Preventas', 'Regalos Mensuales', 'Bono 15% Referidos'] },
];

export const MISSIONS: Mission[] = [
  { id: 'm1', title: 'Primera Inversión', reward: 5, description: 'Realiza tu primera inversión en cualquier producto.', completed: false },
  { id: 'm2', title: 'Invitar 3 Amigos', reward: 15, description: 'Tus referidos deben registrarse con tu código.', completed: false },
  { id: 'm3', title: 'Recarga VIP', reward: 10, description: 'Recarga al menos 200 soles en una transacción.', completed: false }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', user: 'Juan R.', amount: 450, comment: 'Retiro exitoso en menos de 2 horas vía BCP. LEVG cumple!', date: 'Hoy' },
  { id: 't2', user: 'Maria S.', amount: 120, comment: 'Empecé con 10 soles y ya estoy retirando mis ganancias diarias.', date: 'Ayer' },
  { id: 't3', user: 'Carlos M.', amount: 800, comment: 'El soporte de Thalia es muy amable, me ayudaron con mi recarga inmediata.', date: 'Hace 2 días' }
];
