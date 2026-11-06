// Simulated IEA Total Energy Supply (TES) by source, 1990–2024
// Units: Exajoules (EJ). Based on IEA World Energy Balances structure.
export interface EnergySupplyDataPoint {
  year: number;
  coal: number;
  oil: number;
  naturalGas: number;
  nuclear: number;
  hydro: number;
  wind: number;
  solar: number;
  biofuels: number;
  other: number;
}

export const ieaEnergySupply: EnergySupplyDataPoint[] = [
  { year: 1990, coal: 92.4, oil: 131.2, naturalGas: 73.8, nuclear: 20.1, hydro: 9.8, wind: 0.1, solar: 0.0, biofuels: 38.2, other: 2.1 },
  { year: 1992, coal: 92.8, oil: 133.1, naturalGas: 75.3, nuclear: 21.4, hydro: 10.1, wind: 0.2, solar: 0.0, biofuels: 38.7, other: 2.2 },
  { year: 1994, coal: 91.6, oil: 135.4, naturalGas: 77.9, nuclear: 22.0, hydro: 10.4, wind: 0.3, solar: 0.0, biofuels: 39.3, other: 2.3 },
  { year: 1996, coal: 94.2, oil: 139.8, naturalGas: 81.2, nuclear: 23.1, hydro: 10.6, wind: 0.5, solar: 0.0, biofuels: 40.1, other: 2.5 },
  { year: 1998, coal: 92.1, oil: 141.3, naturalGas: 83.4, nuclear: 24.0, hydro: 10.8, wind: 0.8, solar: 0.1, biofuels: 40.8, other: 2.6 },
  { year: 2000, coal: 95.3, oil: 148.6, naturalGas: 87.7, nuclear: 24.9, hydro: 11.0, wind: 1.2, solar: 0.1, biofuels: 41.5, other: 2.8 },
  { year: 2002, coal: 97.1, oil: 150.2, naturalGas: 90.3, nuclear: 25.4, hydro: 11.3, wind: 1.8, solar: 0.1, biofuels: 42.2, other: 2.9 },
  { year: 2004, coal: 103.8, oil: 157.4, naturalGas: 94.6, nuclear: 25.9, hydro: 11.6, wind: 2.6, solar: 0.2, biofuels: 43.1, other: 3.1 },
  { year: 2006, coal: 112.4, oil: 161.8, naturalGas: 98.5, nuclear: 25.5, hydro: 12.0, wind: 3.9, solar: 0.3, biofuels: 44.3, other: 3.3 },
  { year: 2008, coal: 118.6, oil: 163.2, naturalGas: 103.2, nuclear: 24.8, hydro: 12.4, wind: 5.6, solar: 0.5, biofuels: 46.8, other: 3.6 },
  { year: 2010, coal: 124.2, oil: 164.5, naturalGas: 107.8, nuclear: 24.3, hydro: 12.9, wind: 7.9, solar: 0.9, biofuels: 49.2, other: 3.9 },
  { year: 2012, coal: 128.6, oil: 165.3, naturalGas: 111.4, nuclear: 22.7, hydro: 13.5, wind: 11.2, solar: 1.8, biofuels: 52.4, other: 4.2 },
  { year: 2014, coal: 127.1, oil: 167.2, naturalGas: 113.9, nuclear: 22.5, hydro: 14.1, wind: 14.8, solar: 3.6, biofuels: 55.8, other: 4.6 },
  { year: 2016, coal: 123.4, oil: 170.8, naturalGas: 117.2, nuclear: 23.0, hydro: 14.6, wind: 18.9, solar: 6.4, biofuels: 58.6, other: 5.0 },
  { year: 2018, coal: 125.7, oil: 174.6, naturalGas: 123.4, nuclear: 23.5, hydro: 15.1, wind: 24.2, solar: 11.8, biofuels: 61.9, other: 5.4 },
  { year: 2019, coal: 123.3, oil: 175.3, naturalGas: 126.7, nuclear: 23.8, hydro: 15.3, wind: 27.4, solar: 15.2, biofuels: 63.4, other: 5.7 },
  { year: 2020, coal: 115.4, oil: 161.2, naturalGas: 125.1, nuclear: 23.5, hydro: 15.6, wind: 31.8, solar: 19.6, biofuels: 63.8, other: 5.9 },
  { year: 2021, coal: 123.2, oil: 170.4, naturalGas: 130.6, nuclear: 24.0, hydro: 16.1, wind: 36.2, solar: 25.4, biofuels: 65.2, other: 6.2 },
  { year: 2022, coal: 127.8, oil: 175.1, naturalGas: 128.3, nuclear: 23.4, hydro: 15.8, wind: 42.1, solar: 33.8, biofuels: 67.4, other: 6.5 },
  { year: 2023, coal: 126.4, oil: 176.8, naturalGas: 129.7, nuclear: 24.1, hydro: 16.3, wind: 48.6, solar: 44.2, biofuels: 69.1, other: 6.9 },
  { year: 2024, coal: 124.9, oil: 177.2, naturalGas: 131.4, nuclear: 24.6, hydro: 16.8, wind: 56.4, solar: 57.8, biofuels: 71.2, other: 7.2 },
];

export const energySourceColors: Record<string, string> = {
  coal: '#6B7280',
  oil: '#374151',
  naturalGas: '#9CA3AF',
  nuclear: '#7C3AED',
  hydro: '#3B82F6',
  wind: '#06B6D4',
  solar: '#F97316',
  biofuels: '#22C55E',
  other: '#84CC16',
};
