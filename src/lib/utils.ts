import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals = 1): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(decimals)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(decimals)}k`;
  return value.toFixed(decimals);
}

export function formatCurrency(value: number, currency = '₹'): string {
  if (value >= 10_000_000) return `${currency}${(value / 10_000_000).toFixed(2)} Cr`;
  if (value >= 100_000) return `${currency}${(value / 100_000).toFixed(2)} L`;
  return `${currency}${value.toFixed(2)}`;
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Performance Ratio calculator
export function calculatePR(eGrid: number, gii: number, pNomPV: number): number {
  if (gii <= 0 || pNomPV <= 0) return 0;
  return (eGrid / (gii * pNomPV)) * 100;
}

// Array sizing calculator
export interface ArraySizingResult {
  panelCount: number;
  stringCount: number;
  modulesPerString: number;
  totalDCPower: number;    // kWp
  dcAcRatio: number;
  inverterKVA: number;
  estimatedAnnualGen: number; // kWh/year
}

export function calculateArraySizing(
  dailyLoadKWh: number,
  peakSunHours: number,
  panelWattage: number,
  systemEfficiency = 0.78,
  dcAcTarget = 1.15
): ArraySizingResult {
  const dailyGenNeeded = dailyLoadKWh / systemEfficiency;
  const panelCount = Math.ceil((dailyGenNeeded / peakSunHours) * 1000 / panelWattage);
  const totalDCPower = (panelCount * panelWattage) / 1000;
  const inverterKVA = totalDCPower / dcAcTarget;
  const modulesPerString = Math.round(600 / (panelWattage > 350 ? 40 : 36)); // approx Vmp match
  const stringCount = Math.ceil(panelCount / modulesPerString);
  const estimatedAnnualGen = totalDCPower * peakSunHours * 365 * systemEfficiency;

  return {
    panelCount,
    stringCount,
    modulesPerString,
    totalDCPower: +totalDCPower.toFixed(2),
    dcAcRatio: +(totalDCPower / inverterKVA).toFixed(2),
    inverterKVA: +inverterKVA.toFixed(1),
    estimatedAnnualGen: Math.round(estimatedAnnualGen),
  };
}
