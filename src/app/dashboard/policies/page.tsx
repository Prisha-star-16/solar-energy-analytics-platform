'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  TrendingDown,
  Award,
  Layers,
  Scale,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import TariffDeclineChart from '@/components/charts/TariffDeclineChart';
import GovernmentSchemeChart from '@/components/charts/GovernmentSchemeChart';
import {
  governmentSchemes,
  policyFramework,
  indiaSolarTargets,
  GovernmentScheme,
} from '@/data/government-schemes';
import { keyMilestones } from '@/data/tariff-timeline';

export default function PoliciesPage() {
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(governmentSchemes[0]);
  const [activeTab, setActiveTab] = useState<'schemes' | 'regulations' | 'tariffs'>('schemes');

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl font-bold text-foreground">
            Policies, <span className="gradient-text-solar">Regulations</span> & Course Outcomes
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Tariff-Based Competitive Bidding (TBCB) · Electricity Act 2003 · MNRE Gazettes & National Schemes
        </p>
      </motion.div>

      {/* Target Roadmap KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: 'Current Installed Solar',
            value: `${indiaSolarTargets.current2024} GW`,
            sub: 'Dec 2024 (MNRE CEA Data)',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
          },
          {
            label: '2030 RE Capacity Target',
            value: `${indiaSolarTargets.target2030} GW`,
            sub: 'Non-fossil fuel pledge (COP26)',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Rooftop Solar Installed',
            value: `${indiaSolarTargets.rooftop2024} GW`,
            sub: `Target: ${indiaSolarTargets.rooftopTarget} GW by 2026`,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Lowest Bid Tariff',
            value: '₹1.99',
            sub: '/kWh (SECI Rajasthan 2021)',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
          },
        ].map(({ label, value, sub, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card p-4 rounded-xl border border-border ${bg}`}
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className={`font-mono text-xl font-bold ${color}`}>{value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Tariff Decline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-orange-400" />
              Tariff-Based Competitive Bidding (TBCB) & Historical Deflation
            </h2>
            <p className="text-xs text-muted-foreground">
              Decline from ₹6.47/kWh (JNNSM 2010) to ₹1.99/kWh (2021) driven by Section 63 of Electricity Act 2003
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-orange-500/15 text-orange-400 font-semibold self-start sm:self-auto">
            69.2% Overall Reduction
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-8">
            <TariffDeclineChart />
          </div>

          <div className="xl:col-span-4 space-y-2.5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Key Policy & Bidding Milestones
            </h3>
            <div className="space-y-2">
              {keyMilestones.map((m) => (
                <div
                  key={m.year + m.event}
                  className="p-2.5 rounded-xl border border-border bg-muted/20 flex items-start gap-3 text-xs"
                >
                  <span className="font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-[11px]">
                    {m.year}
                  </span>
                  <span className="text-foreground leading-snug">{m.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Government Schemes & Park Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              Flagship Government Schemes: Targets vs. Achievements
            </h2>
            <p className="text-xs text-muted-foreground">
              PM-KUSUM, Rooftop Solar Phase II, Solar Parks (40 GW target), ISTS waivers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7">
            <GovernmentSchemeChart />
          </div>

          <div className="xl:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Active Scheme Deep Dive
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {governmentSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    selectedScheme.id === scheme.id
                      ? 'bg-blue-500/15 border-blue-500/60 shadow-sm'
                      : 'border-border bg-muted/20 hover:border-border/80'
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mb-1.5"
                    style={{ backgroundColor: scheme.color }}
                  />
                  <p className="text-xs font-bold text-foreground truncate">{scheme.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{scheme.achievedGW} / {scheme.targetGW} GW</p>
                </button>
              ))}
            </div>

            {/* Selected Scheme Card */}
            <div
              className="p-4 rounded-xl border bg-muted/30 space-y-3"
              style={{ borderColor: `${selectedScheme.color}50` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{selectedScheme.fullName}</h4>
                  <p className="text-xs text-muted-foreground">{selectedScheme.ministry} • Launched {selectedScheme.year}</p>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted/60 text-foreground font-semibold">
                  {selectedScheme.budget}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{selectedScheme.description}</p>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
                  Program Highlights:
                </p>
                {selectedScheme.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="pt-1">
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-muted-foreground">Execution Progress</span>
                  <span className="text-foreground font-bold">
                    {Math.round((selectedScheme.achievedGW / selectedScheme.targetGW) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: selectedScheme.color,
                      width: `${Math.min(100, Math.round((selectedScheme.achievedGW / selectedScheme.targetGW) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Regulatory Frameworks & Gazette Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-2xl border border-border space-y-4"
      >
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            Statutory Acts, Gazette Notifications & Technical Compliance
          </h2>
          <p className="text-xs text-muted-foreground">
            Core legal provisions governing solar installations, open access, and grid interconnections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policyFramework.map((pf) => (
            <div
              key={pf.id}
              className="p-4 rounded-xl border border-border bg-muted/15 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {pf.section}
                  </span>
                  <span className="text-[11px] text-muted-foreground">Statutory Rule</span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{pf.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pf.description}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <span className="font-semibold block mb-0.5 text-[11px]">Engineering Impact:</span>
                {pf.relevance}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
