'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  AlertTriangle,
  CheckCircle,
  Info,
  Sparkles,
  Building2,
  Sun,
  Home,
  RotateCcw,
} from 'lucide-react';
import { calculatePR } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PRPreset {
  name: string;
  sub: string;
  eGrid: string;
  gii: string;
  pNomPV: string;
  icon: typeof Building2;
}

const prPresets: PRPreset[] = [
  {
    name: 'Campus Green Audit 70 kWp System',
    sub: 'Empirical campus rooftop data (PHY2100 Field Trip)',
    eGrid: '98784',
    gii: '1800',
    pNomPV: '70',
    icon: Building2,
  },
  {
    name: 'Utility Solar Park (50 MWp)',
    sub: 'Bhadla / Rewa high-efficiency central inverter park',
    eGrid: '78500000',
    gii: '1950',
    pNomPV: '50000',
    icon: Sun,
  },
  {
    name: 'Residential Rooftop Net Meter (5 kWp)',
    sub: 'Standard single-phase domestic string installation',
    eGrid: '6750',
    gii: '1750',
    pNomPV: '5',
    icon: Home,
  },
];

function PRGauge({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  const color = pct >= 80 ? '#22C55E' : pct >= 75 ? '#F59E0B' : pct >= 65 ? '#F97316' : '#EF4444';
  const angle = -135 + (pct / 100) * 270;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 90 A 50 50 0 1 1 100 90"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d="M 20 90 A 50 50 0 1 1 100 90"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 251.3} 251.3`}
            style={{ transition: 'stroke-dasharray 0.6s ease, stroke 0.4s ease' }}
          />
          {/* Needle */}
          <line
            x1="60"
            y1="60"
            x2={60 + 36 * Math.cos(((angle - 90) * Math.PI) / 180)}
            y2={60 + 36 * Math.sin(((angle - 90) * Math.PI) / 180)}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 0.6s ease' }}
          />
          <circle cx="60" cy="60" r="5" fill={color} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
          <span className="font-mono text-3xl font-extrabold" style={{ color }}>
            {value > 0 ? value.toFixed(1) : '—'}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">PR %</span>
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
          pct >= 80
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            : pct >= 75
            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            : pct >= 65
            ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
            : pct > 0
            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            : 'bg-muted/40 text-muted-foreground'
        )}
      >
        {pct >= 80 ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : pct >= 65 ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : pct > 0 ? (
          <AlertTriangle className="w-3.5 h-3.5" />
        ) : (
          <Info className="w-3.5 h-3.5" />
        )}
        {pct >= 80
          ? 'World-Class Efficiency'
          : pct >= 75
          ? 'Optimal Field Compliance'
          : pct >= 65
          ? 'Acceptable / Minor Loss'
          : pct > 0
          ? 'Requires Immediate O&M'
          : 'Awaiting Input'}
      </div>
    </div>
  );
}

export default function PRCalculator() {
  const [eGrid, setEGrid] = useState<string>('98784');
  const [gii, setGii] = useState<string>('1800');
  const [pNomPV, setPNomPV] = useState<string>('70');
  const [activePreset, setActivePreset] = useState<string>('Campus Green Audit 70 kWp System');

  const pr = useMemo(() => {
    const e = parseFloat(eGrid);
    const g = parseFloat(gii);
    const p = parseFloat(pNomPV);
    if (!e || !g || !p) return 0;
    return calculatePR(e, g, p);
  }, [eGrid, gii, pNomPV]);

  const loadPreset = (preset: PRPreset) => {
    setEGrid(preset.eGrid);
    setGii(preset.gii);
    setPNomPV(preset.pNomPV);
    setActivePreset(preset.name);
  };

  const fields = [
    {
      id: 'eGrid',
      label: 'Delivered Energy (E_Grid)',
      symbol: 'E_Grid',
      unit: 'kWh',
      description: 'Actual metered AC energy fed to facility switchgear / grid',
      value: eGrid,
      setter: setEGrid,
      placeholder: '98784',
      color: 'text-orange-400',
    },
    {
      id: 'gii',
      label: 'Plane-of-Array Irradiance (GII)',
      symbol: 'GII',
      unit: 'kWh/m²',
      description: 'Cumulative global in-plane irradiation measured by pyranometer',
      value: gii,
      setter: setGii,
      placeholder: '1800',
      color: 'text-blue-400',
    },
    {
      id: 'pNomPV',
      label: 'Installed DC Capacity (P_nomPV)',
      symbol: 'P_nomPV',
      unit: 'kWp',
      description: 'Total nameplate STC rating of PV panels',
      value: pNomPV,
      setter: setPNomPV,
      placeholder: '70',
      color: 'text-emerald-400',
    },
  ];

  const totalLoss = Math.max(0, 100 - pr);
  const tempLoss = +(totalLoss * 0.42).toFixed(1);
  const inverterLoss = +(totalLoss * 0.18).toFixed(1);
  const soilingLoss = +(totalLoss * 0.16).toFixed(1);
  const wiringLoss = +(totalLoss * 0.12).toFixed(1);
  const otherLoss = +(totalLoss - (tempLoss + inverterLoss + soilingLoss + wiringLoss)).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          One-Click Real-World Audit Presets:
        </span>
        <button
          onClick={() => {
            setEGrid('98784');
            setGii('1800');
            setPNomPV('70');
            setActivePreset('Campus Green Audit 70 kWp System');
          }}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground self-start sm:self-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Campus Audit Default</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {prPresets.map((preset) => {
          const Icon = preset.icon;
          const isSelected = activePreset === preset.name && eGrid === preset.eGrid && pNomPV === preset.pNomPV;
          return (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-orange-500/15 border-orange-500/60 shadow-sm'
                  : 'glass-card border-border hover:border-orange-500/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-muted-foreground'}`} />
                <span className="text-xs font-bold text-foreground truncate">{preset.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{preset.sub}</p>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Inputs vs PR Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* Formula display */}
          <div className="glass-card p-3.5 rounded-xl border border-border bg-muted/20">
            <p className="text-[11px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wider">
              Governing Standard: IEC 61724-1 Photovoltaic System Performance
            </p>
            <div className="font-mono text-xs sm:text-sm text-foreground bg-muted/40 p-2 rounded-lg border border-border/50">
              <span className="text-orange-400 font-bold">PR (%)</span>
              <span className="text-muted-foreground"> = [ </span>
              <span className="text-orange-400 font-bold">E_Grid</span>
              <span className="text-muted-foreground"> / ( </span>
              <span className="text-blue-400 font-bold">GII</span>
              <span className="text-muted-foreground"> × </span>
              <span className="text-emerald-400 font-bold">P_nomPV</span>
              <span className="text-muted-foreground"> ) ] × 100</span>
            </div>
          </div>

          {fields.map((f) => (
            <div key={f.id} className="glass-card p-3.5 rounded-xl border border-border space-y-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <label htmlFor={f.id} className={cn('font-mono font-bold text-xs', f.color)}>
                    {f.symbol}
                  </label>
                  <p className="text-[11px] text-muted-foreground">{f.description}</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded">
                  {f.unit}
                </span>
              </div>
              <input
                id={f.id}
                type="number"
                value={f.value}
                onChange={(e) => {
                  f.setter(e.target.value);
                  setActivePreset('');
                }}
                placeholder={f.placeholder}
                className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition"
              />
            </div>
          ))}
        </div>

        {/* Gauge & Loss Waterfall */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="glass-card p-5 rounded-xl border border-border flex flex-col items-center justify-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Performance Ratio Evaluation
            </span>
            <PRGauge value={pr} />

            {pr > 0 && (
              <div className="w-full space-y-1.5 mt-2 border-t border-border/60 pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Useful Yield (Y_f / Y_r):</span>
                  <span className="font-mono text-emerald-400 font-bold">{pr.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Balance-of-System Losses:</span>
                  <span className="font-mono text-rose-400 font-bold">{(100 - pr).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campus Benchmark:</span>
                  <span className="font-mono text-foreground font-semibold">78.4% (IEC Tier A)</span>
                </div>
              </div>
            )}
          </div>

          {/* Loss Waterfall Breakdown */}
          {pr > 0 && (
            <div className="glass-card p-4 rounded-xl border border-border space-y-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                Estimated Loss Partitioning
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                {[
                  { label: 'Thermal Derating', pct: tempLoss, color: 'text-rose-400', bg: 'bg-rose-500' },
                  { label: 'Inverter & Clipping', pct: inverterLoss, color: 'text-amber-400', bg: 'bg-amber-500' },
                  { label: 'Soiling & Particulates', pct: soilingLoss, color: 'text-orange-400', bg: 'bg-orange-500' },
                  { label: 'Cable & Ohmic Drop', pct: wiringLoss, color: 'text-blue-400', bg: 'bg-blue-500' },
                  { label: 'Mismatch & Shading', pct: otherLoss, color: 'text-purple-400', bg: 'bg-purple-500' },
                ].map((loss) => (
                  <div key={loss.label} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{loss.label}</span>
                      <span className={loss.color}>{loss.pct}%</span>
                    </div>
                    <div className="w-full bg-muted/60 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${loss.bg}`} style={{ width: `${Math.min(100, loss.pct * 4)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
