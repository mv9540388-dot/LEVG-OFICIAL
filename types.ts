
export enum AppView {
  LOGIN = 'login',
  HOME = 'home',
  INVEST = 'invest',
  FINANCE = 'finance',
  PROFILE = 'profile',
  ACTIVITY = 'activity',
  TEAMS = 'teams',
  TESTIMONIALS = 'testimonials',
  CHAT = 'chat',
  WHEEL = 'wheel',
  SVIP = 'svip'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  vipLevel: 'Básico' | 'VIP' | 'SVIP';
  referralCode: string;
  joinDate: string;
  totalInvested: number;
  totalEarned: number;
  lastCheckIn?: string;
  investments: ActiveInvestment[];
}

export interface ActiveInvestment {
  productId: string;
  purchaseDate: string;
  units: number;
}

export interface InvestmentProduct {
  id: string;
  title: string;
  tier: 'VIC1' | 'VIC2' | 'VIC3' | 'VIC4' | 'VIC5' | 'NWS6' | 'NWS7' | 'NWS8' | 'NWS9' | 'QLD10';
  type: 'Edificio' | 'Casa' | 'Terreno' | 'Local';
  minInvestment: number;
  dailyReturn: number;
  cycleDays: number;
  image: string;
  description: string;
  colorTheme: string;
  purchaseLimit?: number;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  dailyBonus: number;
  perks: string[];
}

export interface Transaction {
  id: string;
  type: 'Recarga' | 'Retiro' | 'Inversión' | 'Bono' | 'Ruleta' | 'Check-in' | 'SVIP Bonus';
  amount: number;
  status: 'Completado' | 'Pendiente' | 'Rechazado';
  date: string;
}

export interface Mission {
  id: string;
  title: string;
  reward: number;
  description: string;
  completed: boolean;
}

export interface Testimonial {
  id: string;
  user: string;
  amount: number;
  comment: string;
  date: string;
  image?: string;
}
