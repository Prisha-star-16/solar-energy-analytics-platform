// Global Solar PV Electricity Generation (TWh) — 1990 to 2024
// Source: IEA Electricity Information / World Energy Outlook structure
export interface SolarGenerationPoint {
  year: number;
  global: number;
  china: number;
  usa: number;
  eu: number;
  india: number;
  restOfWorld: number;
}

export const solarGenerationData: SolarGenerationPoint[] = [
  { year: 1990, global: 0.5, china: 0.0, usa: 0.3, eu: 0.1, india: 0.0, restOfWorld: 0.1 },
  { year: 1993, global: 0.9, china: 0.0, usa: 0.4, eu: 0.3, india: 0.0, restOfWorld: 0.2 },
  { year: 1996, global: 1.4, china: 0.0, usa: 0.6, eu: 0.5, india: 0.0, restOfWorld: 0.3 },
  { year: 1999, global: 2.1, china: 0.1, usa: 0.9, eu: 0.7, india: 0.0, restOfWorld: 0.4 },
  { year: 2002, global: 3.4, china: 0.1, usa: 1.1, eu: 1.5, india: 0.0, restOfWorld: 0.7 },
  { year: 2005, global: 6.2, china: 0.2, usa: 1.7, eu: 3.4, india: 0.1, restOfWorld: 0.8 },
  { year: 2007, global: 11.8, china: 0.4, usa: 3.2, eu: 6.6, india: 0.2, restOfWorld: 1.4 },
  { year: 2009, global: 23.4, china: 1.1, usa: 7.8, eu: 11.9, india: 0.4, restOfWorld: 2.2 },
  { year: 2011, global: 65.4, china: 7.0, usa: 15.3, eu: 32.9, india: 1.4, restOfWorld: 8.8 },
  { year: 2013, global: 136.8, china: 24.9, usa: 32.2, eu: 56.4, india: 3.6, restOfWorld: 19.7 },
  { year: 2015, global: 253.0, china: 69.7, usa: 54.6, eu: 83.5, india: 7.8, restOfWorld: 37.4 },
  { year: 2016, global: 329.0, china: 103.0, usa: 72.9, eu: 93.1, india: 13.4, restOfWorld: 46.6 },
  { year: 2017, global: 444.0, china: 165.0, usa: 93.8, eu: 108.3, india: 25.0, restOfWorld: 51.9 },
  { year: 2018, global: 584.0, china: 222.0, usa: 109.0, eu: 123.4, india: 42.4, restOfWorld: 87.2 },
  { year: 2019, global: 723.0, china: 263.0, usa: 131.0, eu: 138.0, india: 59.1, restOfWorld: 131.9 },
  { year: 2020, global: 855.0, china: 302.0, usa: 162.0, eu: 158.0, india: 73.4, restOfWorld: 159.6 },
  { year: 2021, global: 1033.0, china: 376.0, usa: 188.0, eu: 181.0, india: 92.6, restOfWorld: 195.4 },
  { year: 2022, global: 1289.0, china: 492.0, usa: 219.0, eu: 211.0, india: 118.0, restOfWorld: 249.0 },
  { year: 2023, global: 1631.0, china: 659.0, usa: 262.0, eu: 246.0, india: 148.0, restOfWorld: 316.0 },
  { year: 2024, global: 2050.0, china: 850.0, usa: 310.0, eu: 290.0, india: 185.0, restOfWorld: 415.0 },
];

export const regionColors: Record<string, string> = {
  china: '#EF4444',
  usa: '#3B82F6',
  eu: '#F59E0B',
  india: '#22C55E',
  restOfWorld: '#8B5CF6',
};
