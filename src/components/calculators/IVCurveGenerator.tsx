'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Thermometer,
  Sun,
  Info,
  Download,
  RotateCcw,
  Sparkles,
  Gauge,
  Sliders,
  CheckCircle,
  Flame,
} from 'lucide-react';
import { computePVMetrics, generateIVCurve, techComparison } from '@/lib/pv-physics';
import IVCurveChart from '@/components/charts/IVCurveChart';
import { cn } from '@/lib/utils';

type TechType = 'mono' | 'poly' | 'thinfilm';

interface ScenarioPreset {
  label: string;
  sub: string;
  temp: number;
  irrad: number;
  icon: string;
}

const scenarioPresets: ScenarioPreset[] = [
  { label: 'Standard Test Conditions (STC)', sub: '25°C · 1000 W/m² (AM1.5G)', temp: 25, irrad: 1000, icon: '☀️' },
  { label: 'Peak Summer Afternoon', sub: '65°C · 1050 W/m² (High thermal loss)', temp: 65, irrad: 1050, icon: '🔥' },
  { label: 'Winter Morning', sub: '15°C · 650 W/m² (High Voc)', temp: 15, irrad: 650, icon: '❄️' },
  { label: 'Monsoon Overcast', sub: '28°C · 350 W/m² (Diffuse light)', temp: 28, irrad: 350, icon: '☁️' },
];

export default function IVCurveGenerator() {
  const [temperature, setTemperature] = useState(25);
  const [irradiance, setIrradiance] = useState(1000);
  const [techType, setTechType] = useState<TechType>('mono');
  const [activePreset, setActivePreset] = useState<string>('Standard Test Conditions (STC)');

  const metrics = useMemo(
    () => computePVMetrics({ temperature, irradiance, techType }),
    [temperature, irradiance, techType]
  );

  const curveData = useMemo(
    () => generateIVCurve({ temperature, irradiance, techType }, 80),
    [temperature, irradiance, techType]
  );

  const tech = techComparison[techType];

  const applyPreset = (preset: ScenarioPreset) => {
    setTemperature(preset.temp);
    setIrradiance(preset.irrad);
    setActivePreset(preset.label);
  };

  const handleDownloadCSV = () => {
    const headers = 'Voltage (V),Current (A),Power (W)\n';
    const rows = curveData.map((d) => `${d.voltage.toFixed(2)},${d.current.toFixed(3)},${d.power.toFixed(2)}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IV_Curve_${techType}_${temperature}C_${irradiance}W.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Technology & Scenario Presets Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Tech selector */}
        <div className="flex gap-2 flex-wrap">
          {(Object.entries(techComparison) as [TechType, typeof techComparison.mono][]).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTechType(key)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border',
                techType === key
                  ? 'border-transparent text-white shadow-md'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
              )}
              style={techType === key ? { backgroundColor: t.color, boxShadow: `0 0 16px ${t.color}40` } : {}}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: techType === key ? '#fff' : t.color }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* CSV Export & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span>Export Curve CSV</span>
          </button>
          <button
            onClick={() => {
              setTemperature(25);
              setIrradiance(1000);
              setActivePreset('Standard Test Conditions (STC)');
            }}
            className="p-1.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            title="Reset to STC"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Scenario Presets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {scenarioPresets.map((sc) => (
          <button
            key={sc.label}
            onClick={() => applyPreset(sc)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activePreset === sc.label && temperature === sc.temp && irradiance === sc.irrad
                ? 'bg-orange-500/15 border-orange-500/50 shadow-sm'
                : 'glass-card border-border/80 hover:border-orange-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{sc.icon}</span>
              <p className="text-xs font-semibold text-foreground truncate">{sc.label}</p>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono truncate">{sc.sub}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Temperature slider */}
          <div className="glass-card p-4 rounded-xl border border-border space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-semibold text-foreground">Cell Temperature (T)</span>
              </div>
              <span className="font-mono text-base font-bold text-rose-400">{temperature}°C</span>
            </div>
            <input
              type="range"
              min={0}
              max={75}
              step={1}
              value={temperature}
              onChange={(e) => {
                setTemperature(Number(e.target.value));
                setActivePreset('');
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>0°C (Cold)</span>
              <span className="text-foreground font-semibold">STC 25°C</span>
              <span>75°C (Extreme)</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {temperature > 25 ? (
                <span className="text-rose-400">
                  ⚠️ {temperature - 25}°C above STC — Voc decreased by {((temperature - 25) * 0.29).toFixed(1)}%
                </span>
              ) : temperature < 25 ? (
                <span className="text-sky-400">
                  ❄️ {25 - temperature}°C below STC — Voc increased by {((25 - temperature) * 0.29).toFixed(1)}%
                </span>
              ) : (
                <span className="text-emerald-400">✓ Nominal STC calibration baseline</span>
              )}
            </p>
          </div>

          {/* Irradiance slider */}
          <div className="glass-card p-4 rounded-xl border border-border space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-foreground">Solar Irradiance (G)</span>
              </div>
              <span className="font-mono text-base font-bold text-amber-400">{irradiance} W/m²</span>
            </div>
            <input
              type="range"
              min={100}
              max={1200}
              step={25}
              value={irradiance}
              onChange={(e) => {
                setIrradiance(Number(e.target.value));
                setActivePreset('');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>100 W/m²</span>
              <span className="text-foreground font-semibold">1000 W/m²</span>
              <span>1200 W/m²</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Isc scales linearly with flux: <code className="text-amber-400 font-mono">{metrics.isc} A</code> (9.4A at 1000 W/m²)
            </p>
          </div>

          {/* Live Metrics Grid */}
          <div className="glass-card p-4 rounded-xl border border-border space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-foreground">Shockley Model Metrics</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Live Solver</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-[10px] text-muted-foreground block">Open-Circuit (Voc)</span>
                <span className="font-mono text-sm font-bold text-orange-400">{metrics.voc} V</span>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-[10px] text-muted-foreground block">Short-Circuit (Isc)</span>
                <span className="font-mono text-sm font-bold text-blue-400">{metrics.isc} A</span>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-[10px] text-muted-foreground block">Voltage at MPP (Vmp)</span>
                <span className="font-mono text-sm font-bold text-amber-400">{metrics.vmp} V</span>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-[10px] text-muted-foreground block">Current at MPP (Imp)</span>
                <span className="font-mono text-sm font-bold text-cyan-400">{metrics.imp} A</span>
              </div>
            </div>

            {/* Pmax Spotlight Card */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  Peak Power (Pmax)
                </span>
                <span className="font-mono text-xl font-bold text-emerald-400">
                  {metrics.pmax} <span className="text-xs font-normal">Watts</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground block">Efficiency (η)</span>
                <span className="font-mono text-sm font-bold text-foreground">{metrics.efficiency}%</span>
              </div>
            </div>

            {/* Fill Factor Gauge */}
            <div className="pt-1">
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-muted-foreground text-[11px]">Fill Factor (FF):</span>
                <span className="text-purple-400 font-bold">{metrics.ff}%</span>
              </div>
              <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, metrics.ff)}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                {metrics.ff >= 78 ? '✓ Optimal high-quality crystalline cell' : '⚠️ Lower FF indicating higher series resistance'}
              </span>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card p-5 rounded-2xl border border-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tech.color }} />
                  I-V & P-V Characteristic Curves — {tech.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Simulating single-diode Shockley equation at T = {temperature}°C and G = {irradiance} W/m²
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded bg-orange-400" />
                  <span className="text-muted-foreground">Current (A)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded bg-emerald-400" />
                  <span className="text-muted-foreground">Power (W)</span>
                </div>
              </div>
            </div>

            <IVCurveChart data={curveData} pmax={metrics.pmax} vmp={metrics.vmp} imp={metrics.imp} />
          </div>

          {/* Module Specs Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Efficiency Range', val: tech.efficiency, color: 'text-emerald-400' },
              { label: 'Temp Coefficient', val: tech.tempCoefficient, color: 'text-rose-400' },
              { label: 'Annual Degradation', val: tech.degradation, color: 'text-amber-400' },
              { label: 'Module Lifespan', val: tech.lifespan, color: 'text-blue-400' },
            ].map((item) => (
              <div key={item.label} className="glass-card p-3 rounded-xl border border-border">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">{item.label}</span>
                <span className={`font-mono text-sm font-bold mt-0.5 block ${item.color}`}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
