// Campus Green Audit Data — Engineering College, Tamil Nadu
// 12-month energy generation and consumption data

export interface MonthlyEnergyData {
  month: string;
  monthShort: string;
  tangedcoImport: number;    // kWh imported from TANGEDCO grid
  solarGeneration: number;   // kWh from rooftop solar PV (50kW + 20kW = 70kW installed)
  windGeneration: number;    // kWh from small wind turbine
  netExport: number;         // kWh exported back to grid (net metering)
  totalConsumption: number;  // kWh total building load
}

export const campusMonthlyData: MonthlyEnergyData[] = [
  { month: 'January',   monthShort: 'Jan', tangedcoImport: 18420, solarGeneration: 7840,  windGeneration: 1120, netExport: 320,  totalConsumption: 27060 },
  { month: 'February',  monthShort: 'Feb', tangedcoImport: 16780, solarGeneration: 8360,  windGeneration: 1040, netExport: 480,  totalConsumption: 25700 },
  { month: 'March',     monthShort: 'Mar', tangedcoImport: 19640, solarGeneration: 9120,  windGeneration: 920,  netExport: 540,  totalConsumption: 29140 },
  { month: 'April',     monthShort: 'Apr', tangedcoImport: 22380, solarGeneration: 9680,  windGeneration: 840,  netExport: 620,  totalConsumption: 32280 },
  { month: 'May',       monthShort: 'May', tangedcoImport: 24620, solarGeneration: 9940,  windGeneration: 760,  netExport: 480,  totalConsumption: 34840 },
  { month: 'June',      monthShort: 'Jun', tangedcoImport: 21480, solarGeneration: 8240,  windGeneration: 1680, netExport: 280,  totalConsumption: 31120 },
  { month: 'July',      monthShort: 'Jul', tangedcoImport: 19280, solarGeneration: 7560,  windGeneration: 2240, netExport: 160,  totalConsumption: 28920 },
  { month: 'August',    monthShort: 'Aug', tangedcoImport: 18940, solarGeneration: 7820,  windGeneration: 2080, netExport: 240,  totalConsumption: 28600 },
  { month: 'September', monthShort: 'Sep', tangedcoImport: 17640, solarGeneration: 8480,  windGeneration: 1640, netExport: 360,  totalConsumption: 27400 },
  { month: 'October',   monthShort: 'Oct', tangedcoImport: 16820, solarGeneration: 8920,  windGeneration: 1320, netExport: 540,  totalConsumption: 26520 },
  { month: 'November',  monthShort: 'Nov', tangedcoImport: 15640, solarGeneration: 8140,  windGeneration: 1180, netExport: 420,  totalConsumption: 24540 },
  { month: 'December',  monthShort: 'Dec', tangedcoImport: 16480, solarGeneration: 7680,  windGeneration: 1060, netExport: 280,  totalConsumption: 24940 },
];

export interface InverterLog {
  id: string;
  model: string;
  capacity: string;
  location: string;
  dailyGen: number;    // kWh
  monthlyGen: number;  // kWh
  efficiency: number;  // %
  status: 'Normal' | 'Warning' | 'Fault';
  lastInspection: string;
  netMeterReading: number; // kWh
}

export const inverterLogs: InverterLog[] = [
  {
    id: 'INV-01',
    model: 'SMA Sunny Tripower 50000TL',
    capacity: '50 kW',
    location: 'Main Block Rooftop',
    dailyGen: 248,
    monthlyGen: 7440,
    efficiency: 97.8,
    status: 'Normal',
    lastInspection: '2024-10-15',
    netMeterReading: 124320,
  },
  {
    id: 'INV-02',
    model: 'Fronius Symo 20.0-3-M',
    capacity: '20 kW',
    location: 'Science Block Rooftop',
    dailyGen: 94,
    monthlyGen: 2820,
    efficiency: 96.4,
    status: 'Normal',
    lastInspection: '2024-10-15',
    netMeterReading: 48640,
  },
];

export const campusKPIs = {
  installedCapacity: 70,         // kWp
  annualGeneration: 103440,      // kWh
  annualConsumption: 350060,     // kWh
  solarFraction: 29.6,           // %
  co2Avoided: 73.4,              // tonnes/year
  performanceRatio: 78.4,        // %
  specificYield: 1477.7,         // kWh/kWp
  capacityUtilizationFactor: 16.9, // %
};

export const systemSpecs = {
  panels: { count: 194, wattage: 360, type: 'Monocrystalline PERC', area: 388 },
  string: { stringsPerInverter1: 10, modulesPerString: 12, stringsPerInverter2: 4, modulesPerString2: 11 },
  mounting: 'Fixed tilt, 10° south-facing',
  cabling: '4mm² DC, 10mm² AC copper cables',
  earthing: 'Copper plate earthing with copper wire',
  lightning: 'ESE lightning arrester, 60m protection radius',
};
