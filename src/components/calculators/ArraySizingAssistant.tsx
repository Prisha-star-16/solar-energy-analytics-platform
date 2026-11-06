'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Layers,
  Zap,
  Info,
  Building,
  Sparkles,
  TreePine,
  CloudSun,
  Flame,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { calculateArraySizing } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface FacilityPreset {
  name: string;
  sub: string;
  load: string;
  psh: string;
  panel: string;
  eff: string;
}

const facilityPresets: FacilityPreset[] = [
  {
    name: 'Campus Main Block (Field Trip)',
    sub: '70 kWp rooftop installation with 50kW + 20kW inverters',
    load: '350',
    psh: '5.5',
    panel: '360',
    eff: '78',
  },
  {
    name: 'Central Admin & Library',
    sub: '120 kWp high-efficiency mono PERC installation',
    load: '600',
    psh: '5.5',
    panel: '540',
    eff: '80',
  },
  {
    name: 'Hostel Residential Dorms',
    sub: '25 kWp decentralized rooftop array',
    load: '125',
    psh: '5.5',
    panel: '360',
    eff: '78',
  },
  {
    name: 'Auditorium & Sports Complex',
    sub: '50 kWp curved roof mounting structure',
    load: '250',
    psh: '5.5',
    panel: '400',
    eff: '79',
  },
];

export default function ArraySizingAssistant() {
  const [dailyLoad, setDailyLoad] = useState<string>('350');
  const [peakSunHours, setPeakSunHours] = useState<string>('5.5');
  const [panelWattage, setPanelWattage] = useState<string>('360');
  const [efficiency, setEfficiency] = useState<string>('78');
  const [activePreset, setActivePreset] = useState<string>('Campus Main Block (Field Trip)');

  const result = useMemo(() => {
    const load = parseFloat(dailyLoad);
    const psh = parseFloat(peakSunHours);
    const pw = parseFloat(panelWattage);
    const eff = parseFloat(efficiency) / 100;
    if (!load || !psh || !pw || !eff) return null;
    return calculateArraySizing(load, psh, pw, eff);
  }, [dailyLoad, peakSunHours, panelWattage, efficiency]);

  const loadPreset = (p: FacilityPreset) => {
    setDailyLoad(p.load);
    setPeakSunHours(p.psh);
    setPanelWattage(p.panel);
    setEfficiency(p.eff);
    setActivePreset(p.name);
  };

  const inputs = [
    {
      id: 'dailyLoad',
      label: 'Daily Energy Consumption (E_d)',
      unit: 'kWh/day',
      value: dailyLoad,
      setter: setDailyLoad,
      placeholder: '350',
      description: 'Average 24-hr facility energy demand',
    },
    {
      id: 'peakSunHours',
      label: 'Peak Sun Hours (PSH)',
      unit: 'h/day',
      value: peakSunHours,
      setter: setPeakSunHours,
      placeholder: '5.5',
      description: 'Equivalent hours of 1000 W/m² (India: 5.0–6.0)',
    },
    {
      id: 'panelWattage',
      label: 'Single Module Rating (P_mod)',
      unit: 'Wp',
      value: panelWattage,
      setter: setPanelWattage,
      placeholder: '360',
      description: 'Rated STC wattage per individual PV panel',
    },
    {
      id: 'efficiency',
      label: 'System Performance Factor (PR)',
      unit: '%',
      value: efficiency,
      setter: setEfficiency,
      placeholder: '78',
      description: 'Overall BOS efficiency accounting for losses',
    },
  ];

  // Derived roof area & environmental metrics
  const roofAreaM2 = result ? Math.round(result.panelCount * 1.95) : 0;
  const roofAreaSqFt = Math.round(roofAreaM2 * 10.764);
  const co2AvoidedTonnes = result ? +((result.estimatedAnnualGen * 0.82) / 1000).toFixed(1) : 0;
  const treesEquivalent = Math.round(co2AvoidedTonnes * 45);

  return (
    <div className="space-y-6">
      {/* Preset selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Facility Sizing Presets:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {facilityPresets.map((p) => {
            const isSelected = activePreset === p.name && dailyLoad === p.load;
            return (
              <button
                key={p.name}
                onClick={() => loadPreset(p)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-500/15 border-blue-500/60 shadow-sm'
                    : 'glass-card border-border hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Building className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-muted-foreground'}`} />
                  <span className="text-xs font-bold text-foreground truncate">{p.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{p.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Design Input Parameters
          </p>
          {inputs.map((f) => (
            <div key={f.id} className="glass-card p-3.5 rounded-xl border border-border space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <label htmlFor={f.id} className="text-xs font-bold text-foreground">
                    {f.label}
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
                className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 font-mono text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Calculated Sizing & Array Topology
          </p>

          {result ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {/* Primary KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass-card p-3.5 rounded-xl border border-border bg-orange-500/10">
                  <div className="flex items-center gap-2 mb-1 text-orange-400">
                    <Layers className="w-4 h-4" />
                    <span className="text-[11px] font-semibold uppercase">Total Modules</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-orange-400">{result.panelCount}</p>
                  <p className="text-[11px] text-muted-foreground">@ {panelWattage}Wp per panel</p>
                </div>

                <div className="glass-card p-3.5 rounded-xl border border-border bg-blue-500/10">
                  <div className="flex items-center gap-2 mb-1 text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-[11px] font-semibold uppercase">DC Array Power</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-blue-400">{result.totalDCPower}</p>
                  <p className="text-[11px] text-muted-foreground">kWp Peak Rating</p>
                </div>

                <div className="glass-card p-3.5 rounded-xl border border-border bg-emerald-500/10">
                  <div className="flex items-center gap-2 mb-1 text-emerald-400">
                    <Server className="w-4 h-4" />
                    <span className="text-[11px] font-semibold uppercase">Inverter Size</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-emerald-400">{result.inverterKVA}</p>
                  <p className="text-[11px] text-muted-foreground">kVA (DC/AC: {result.dcAcRatio})</p>
                </div>
              </div>

              {/* Visual Array Topology Card */}
              <div className="glass-card p-4 rounded-xl border border-border space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs font-bold text-foreground">Electrical String Arrangement</span>
                  <span className="text-[10px] font-mono text-muted-foreground">CEA / IEEE 1547 Compliant</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                    <p className="font-mono text-lg font-bold text-foreground">{result.stringCount}</p>
                    <p className="text-[11px] text-muted-foreground">Parallel Strings</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                    <p className="font-mono text-lg font-bold text-foreground">{result.modulesPerString}</p>
                    <p className="text-[11px] text-muted-foreground">Modules / String</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                    <p className="font-mono text-lg font-bold text-amber-400">{result.dcAcRatio}</p>
                    <p className="text-[11px] text-muted-foreground">DC/AC Sizing Ratio</p>
                  </div>
                </div>

                {/* Topology visual schematic */}
                <div className="p-3 rounded-lg bg-muted/20 border border-border/60 flex items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 font-bold">
                      {result.panelCount} Panels
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 font-bold">
                      {result.stringCount} Strings × {result.modulesPerString}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 font-bold">
                      {result.inverterKVA} kVA Inverter
                    </span>
                  </div>
                </div>
              </div>

              {/* Roof Area & Environmental Impact Dual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Roof Area */}
                <div className="glass-card p-3.5 rounded-xl border border-border space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-xs font-bold text-foreground">Required Rooftop Space</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-sky-400">
                    {roofAreaM2.toLocaleString()} m²{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({roofAreaSqFt.toLocaleString()} sq.ft)
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Based on standard 1.95 m² / module spacing and inter-row shade clearance.
                  </p>
                </div>

                {/* Environmental Offsets */}
                <div className="glass-card p-3.5 rounded-xl border border-border space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <TreePine className="w-4 h-4" />
                    <span className="text-xs font-bold text-foreground">Annual Sustainability Impact</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-emerald-400">
                    {co2AvoidedTonnes} tonnes CO₂/yr
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Equivalent to planting <span className="font-semibold text-foreground">{treesEquivalent} mature trees</span> each year.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-8 rounded-xl border border-dashed border-border flex flex-col items-center gap-3 text-center">
              <Info className="w-8 h-8 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Enter daily load to calculate system requirements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
