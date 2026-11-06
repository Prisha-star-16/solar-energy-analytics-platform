'use client';

import { motion } from 'framer-motion';
import { Zap, Info, CheckCircle } from 'lucide-react';
import IVCurveGenerator from '@/components/calculators/IVCurveGenerator';
import { techComparison } from '@/lib/pv-physics';

export default function FundamentalsPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h1 className="text-2xl font-bold text-foreground">
            PV <span className="gradient-text-solar">Fundamentals</span> & Modules
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Interactive I-V & P-V curve simulator · Single-diode Shockley model · STC & real-world conditions
        </p>
      </motion.div>

      {/* Core concepts banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Voc', desc: 'Open-circuit voltage at zero current', formula: 'V when I = 0', color: 'text-orange-400' },
          { label: 'Isc', desc: 'Short-circuit current at zero voltage', formula: 'I when V = 0', color: 'text-blue-400' },
          { label: 'MPP', desc: 'Maximum Power Point (Vmp × Imp)', formula: 'Pmax = Vmp × Imp', color: 'text-yellow-400' },
          { label: 'FF', desc: 'Fill Factor — curve squareness', formula: 'FF = Pmax / (Voc × Isc)', color: 'text-green-400' },
        ].map(({ label, desc, formula, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-3.5 rounded-xl border border-border"
          >
            <p className={`font-mono text-lg font-bold mb-0.5 ${color}`}>{label}</p>
            <p className="text-xs text-muted-foreground leading-snug mb-1.5">{desc}</p>
            <code className="text-xs bg-muted/50 px-2 py-0.5 rounded text-foreground/80 font-mono">{formula}</code>
          </motion.div>
        ))}
      </div>

      {/* Main I-V generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-orange-400 pulse-dot" />
          <h2 className="text-base font-semibold text-foreground">
            Interactive I-V & P-V Curve Generator
          </h2>
          <span className="text-xs text-muted-foreground ml-auto">Adjust sliders to see real-time response</span>
        </div>
        <IVCurveGenerator />
      </motion.div>

      {/* Technology comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <h2 className="text-base font-semibold text-foreground mb-4">
          Technology Comparison: Mono vs Poly vs Thin Film
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.entries(techComparison) as [string, typeof techComparison.mono][]).map(([key, tech]) => (
            <div
              key={key}
              className="glass-card p-4 rounded-xl border border-border"
              style={{ borderColor: `${tech.color}30` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }} />
                <h3 className="text-sm font-semibold text-foreground">{tech.label}</h3>
              </div>
              <div className="space-y-2 text-xs mb-3">
                {[
                  ['Efficiency', tech.efficiency],
                  ['Temp Coefficient', tech.tempCoefficient],
                  ['Degradation', tech.degradation],
                  ['Lifespan', tech.lifespan],
                  ['Module Cost', tech.cost],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1">
                <p className="text-xs font-medium text-green-400 mb-1">Advantages</p>
                {tech.pros.map((p) => (
                  <div key={p} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* STC info box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20"
      >
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground">
          <span className="text-blue-400 font-semibold">Standard Test Conditions (STC): </span>
          Irradiance = 1000 W/m², Cell Temperature = 25°C, Air Mass = AM1.5G.
          Real-world performance deviates due to NOCT (Nominal Operating Cell Temperature ~45–47°C), 
          soiling losses (~2–5%), wiring losses (~1–2%), and inverter efficiency (~96–98%).
        </div>
      </motion.div>
    </div>
  );
}
