import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Stat {
  label: string;
  value: string;
  trend: number; // positive is up, negative down
}

export interface ChartData {
  name: string;
  value: number;
  value2?: number;
}
