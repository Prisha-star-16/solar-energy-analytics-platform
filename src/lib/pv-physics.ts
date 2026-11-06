// PV Physics Engine — I-V and P-V curve calculations using the single-diode model
// Based on Shockley diode equation with series resistance approximation

export interface PVModuleParams {
  temperature: number;      // °C (cell temperature)
  irradiance: number;       // W/m²
  techType: 'mono' | 'poly' | 'thinfilm';
}

export interface PVCurvePoint {
  voltage: number;
  current: number;
  power: number;
}

export interface PVMetrics {
  voc: number;    // Open-circuit voltage (V)
  isc: number;    // Short-circuit current (A)
  vmp: number;    // Voltage at max power (V)
  imp: number;    // Current at max power (A)
  pmax: number;   // Maximum power (W)
  ff: number;     // Fill factor (%)
  efficiency: number; // Module efficiency (%)
}

// STC Parameters for each technology (single module, 60-cell equivalent)
const STC_PARAMS = {
  mono: {
    vocSTC: 37.8,   // V
    iscSTC: 9.52,   // A
    vmpSTC: 31.2,   // V
    impSTC: 9.04,   // A
    pSTC: 282,      // W
    area: 1.64,     // m²
    betaVoc: -0.0028, // V/°C (temperature coefficient Voc)
    alphaIsc: 0.0005, // A/°C (temperature coefficient Isc)
    gammaPmax: -0.0038, // /°C (temperature coefficient Pmax)
    nIdeality: 1.2,
  },
  poly: {
    vocSTC: 36.4,
    iscSTC: 9.18,
    vmpSTC: 29.8,
    impSTC: 8.72,
    pSTC: 260,
    area: 1.64,
    betaVoc: -0.0032,
    alphaIsc: 0.0004,
    gammaPmax: -0.0043,
    nIdeality: 1.3,
  },
  thinfilm: {
    vocSTC: 68.4,
    iscSTC: 3.56,
    vmpSTC: 56.0,
    impSTC: 3.26,
    pSTC: 182,
    area: 1.44,
    betaVoc: -0.0022,
    alphaIsc: 0.0001,
    gammaPmax: -0.0021,
    nIdeality: 1.5,
  },
};

const T_STC = 25;    // °C Standard Test Condition temperature
const G_STC = 1000;  // W/m² Standard irradiance

export function computePVMetrics(params: PVModuleParams): PVMetrics {
  const { temperature, irradiance, techType } = params;
  const stc = STC_PARAMS[techType];
  const dT = temperature - T_STC;
  const gRatio = irradiance / G_STC;

  // Temperature and irradiance corrections
  const isc = stc.iscSTC * gRatio * (1 + stc.alphaIsc * dT);
  const voc = (stc.vocSTC + stc.betaVoc * dT * stc.vocSTC) * (1 + 0.0268 * Math.log(gRatio > 0.01 ? gRatio : 0.01));
  const pmax = stc.pSTC * gRatio * (1 + stc.gammaPmax * dT);
  const vmp = voc * 0.826 + stc.betaVoc * dT * stc.vocSTC * 0.1;
  const imp = pmax / vmp;
  const ff = (vmp * imp) / (voc * isc) * 100;
  const efficiency = (pmax / (irradiance * stc.area)) * 100;

  return {
    voc: Math.max(0, +voc.toFixed(2)),
    isc: Math.max(0, +isc.toFixed(2)),
    vmp: Math.max(0, +vmp.toFixed(2)),
    imp: Math.max(0, +imp.toFixed(2)),
    pmax: Math.max(0, +pmax.toFixed(1)),
    ff: Math.max(0, Math.min(100, +ff.toFixed(1))),
    efficiency: Math.max(0, +efficiency.toFixed(1)),
  };
}

export function generateIVCurve(params: PVModuleParams, points = 60): PVCurvePoint[] {
  const metrics = computePVMetrics(params);
  const { voc, isc, nIdeality } = { ...metrics, nIdeality: STC_PARAMS[params.techType].nIdeality };
  const curve: PVCurvePoint[] = [];

  // Thermal voltage: Vt = kT/q (at ~300K ≈ 25.85mV, scaled to cell)
  const nCells = params.techType === 'thinfilm' ? 100 : 60;
  const Vt = 0.02585 * nCells * nIdeality;

  // Saturation current
  const I0 = isc / (Math.exp(voc / Vt) - 1);

  for (let i = 0; i <= points; i++) {
    const v = (voc * i) / points;
    // Single diode model: I = Isc - I0*(exp(V/Vt) - 1)
    const expTerm = Math.exp(v / Vt);
    const current = Math.max(0, isc - I0 * (expTerm - 1));
    const power = v * current;
    curve.push({
      voltage: +v.toFixed(3),
      current: +current.toFixed(3),
      power: +power.toFixed(2),
    });
  }

  return curve;
}

export const techComparison = {
  mono: {
    label: 'Monocrystalline Si',
    efficiency: '19–24%',
    tempCoefficient: '-0.38%/°C',
    degradation: '~0.4%/year',
    lifespan: '25–30 years',
    cost: '₹28–34/Wp',
    pros: ['Highest efficiency', 'Best low-light performance', 'Compact footprint'],
    cons: ['Higher cost', 'Energy-intensive manufacturing'],
    color: '#F97316',
  },
  poly: {
    label: 'Polycrystalline Si',
    efficiency: '15–19%',
    tempCoefficient: '-0.43%/°C',
    degradation: '~0.5%/year',
    lifespan: '25–30 years',
    cost: '₹22–28/Wp',
    pros: ['Cost-effective', 'Established technology', 'Good durability'],
    cons: ['Lower efficiency', 'More space needed', 'Blue speckled appearance'],
    color: '#3B82F6',
  },
  thinfilm: {
    label: 'Thin Film (Amorphous Si)',
    efficiency: '10–13%',
    tempCoefficient: '-0.21%/°C',
    degradation: '~0.7%/year',
    lifespan: '20–25 years',
    cost: '₹18–24/Wp',
    pros: ['Best temperature performance', 'Flexible substrates possible', 'Performs well in diffuse light'],
    cons: ['Lowest efficiency', 'Staebler-Wronski effect', 'Largest footprint'],
    color: '#8B5CF6',
  },
};
