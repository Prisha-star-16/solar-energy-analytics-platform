'use client';

import { motion } from 'framer-motion';
import { Calculator, Server, Info } from 'lucide-react';
import PRCalculator from '@/components/calculators/PRCalculator';
import ArraySizingAssistant from '@/components/calculators/ArraySizingAssistant';

export default function SystemDesignPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-400" />
          <h1 className="text-2xl font-bold text-foreground">
            System <span className="gradient-text-blue">Design</span> & Calculations
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Performance Ratio calculator · Array sizing · Inverter matching · IEC 61724-1 framework
        </p>
      </motion.div>

      {/* PR Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Performance Ratio (PR) Calculator</h2>
            <p className="text-xs text-muted-foreground">IEC 61724-1 · Live calculation with gauge output</p>
          </div>
        </div>
        <PRCalculator />
      </motion.div>

      {/* System losses breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <h2 className="text-base font-semibold text-foreground mb-4">Typical System Loss Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Soiling / Dust', value: '2–5%', color: '#F97316' },
            { name: 'Temperature', value: '5–8%', color: '#EF4444' },
            { name: 'Wiring & Resistance', value: '1–2%', color: '#F59E0B' },
            { name: 'Inverter Losses', value: '2–4%', color: '#3B82F6' },
            { name: 'Module Mismatch', value: '1–3%', color: '#8B5CF6' },
            { name: 'Shading', value: '0–10%', color: '#6B7280' },
            { name: 'MPPT Errors', value: '0–2%', color: '#06B6D4' },
            { name: 'Degradation (annual)', value: '~0.4%', color: '#22C55E' },
          ].map(({ name, value, color }) => (
            <div key={name} className="glass-card p-3 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium text-foreground">{name}</span>
              </div>
              <p className="font-mono text-base font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Array sizing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center">
            <Server className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Array Sizing & Inverter Matching Assistant</h2>
            <p className="text-xs text-muted-foreground">DC/AC ratio · String configuration · Annual yield estimate</p>
          </div>
        </div>
        <ArraySizingAssistant />
      </motion.div>

      {/* Design rules */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="glass-card p-5 rounded-2xl border border-border"
      >
        <h2 className="text-base font-semibold text-foreground mb-4">Key Design Rules & Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'DC/AC Ratio',
              rule: '1.1 – 1.3 (optimal)',
              note: 'Higher ratio increases capacity factor but risks clipping. India climate: 1.15–1.25 recommended.',
              color: '#F97316',
            },
            {
              title: 'String Voltage',
              rule: '< 600V (India residential), < 1000V (utility)',
              note: 'CEA (Technical Standards) Regulations 2010 mandate max 600V DC for rooftop in India.',
              color: '#3B82F6',
            },
            {
              title: 'Minimum Cable Size',
              rule: '4 mm² DC, 10 mm² AC (up to 70 kWp)',
              note: 'Copper conductors preferred; voltage drop < 1% on DC side, < 1.5% on AC side.',
              color: '#22C55E',
            },
            {
              title: 'Earthing',
              rule: 'Copper plate earth, R < 1 Ω',
              note: 'IEEE 142 & IS:3043 — separate earthing for PV array frame, inverter, and AC system.',
              color: '#8B5CF6',
            },
          ].map(({ title, rule, note, color }) => (
            <div key={title} className="glass-card p-4 rounded-xl border border-border" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
              <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
              <p className="font-mono text-xs text-foreground/90 mb-1.5" style={{ color }}>{rule}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
