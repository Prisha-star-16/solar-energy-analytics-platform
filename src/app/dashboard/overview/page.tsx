'use client';

import { motion } from 'framer-motion';
import { Globe, Zap, TrendingDown, Sun, Leaf, BarChart3 } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import InsightsBanner from '@/components/dashboard/InsightsBanner';
import EnergySupplyAreaChart from '@/components/charts/EnergySupplyAreaChart';
import SolarGenerationLineChart from '@/components/charts/SolarGenerationLineChart';

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-bold gradient-text-solar">Executive Overview</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Global energy transition metrics · IEA Data & Statistics · Solar PV Generation Trends
        </p>
      </motion.div>

      {/* Insights banner */}
      <InsightsBanner />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="Global Solar PV Generation"
          value="2,050"
          unit="TWh (2024)"
          change={25.8}
          changeLabel="vs 2023"
          icon={<Globe className="w-4 h-4" />}
          gradient="solar"
          delay={0}
          description="Up from 1,631 TWh in 2023 — fastest growing energy source"
        />
        <KPICard
          title="India Solar Tariff"
          value="₹2.14"
          unit="/kWh (2024 avg)"
          change={-3.2}
          changeLabel="vs ₹6.47 in 2010"
          icon={<TrendingDown className="w-4 h-4" />}
          gradient="blue"
          delay={0.1}
          description="69% decline from JNNSM Phase 1 benchmark"
        />
        <KPICard
          title="Campus System PR"
          value="78.4"
          unit="%"
          change={1.2}
          changeLabel="vs last year"
          icon={<Zap className="w-4 h-4" />}
          gradient="green"
          delay={0.2}
          description="70 kWp rooftop system · IEC 61724-1 compliant"
        />
        <KPICard
          title="Campus Solar Yield"
          value="1,24,320"
          unit="kWh/yr"
          change={4.6}
          changeLabel="vs last year"
          icon={<Sun className="w-4 h-4" />}
          gradient="purple"
          delay={0.3}
          description="Avoids 73.4 t CO₂/yr · Net metering enabled"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* TES chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5 rounded-2xl border border-border"
        >
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">World Total Energy Supply by Source</h2>
            <p className="text-xs text-muted-foreground">IEA World Energy Balances · 1990–2024 · Exajoules (EJ)</p>
          </div>
          <EnergySupplyAreaChart />
        </motion.div>

        {/* Solar gen chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5 rounded-2xl border border-border"
        >
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">Global Solar PV Electricity Generation</h2>
            <p className="text-xs text-muted-foreground">IEA Electricity Information · 1990–2024 · TWh · By Region</p>
          </div>
          <SolarGenerationLineChart />
        </motion.div>
      </div>

      {/* Quick stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'India Installed Solar', value: '73.3 GW', sub: 'as of Dec 2024', color: 'text-orange-400', icon: Sun },
          { label: 'Solar LCOE (India)', value: '₹2.00–2.50', sub: '/kWh · cheapest source', color: 'text-green-400', icon: TrendingDown },
          { label: 'Global Renewable Share', value: '30.3%', sub: 'of total electricity 2023', color: 'text-blue-400', icon: Leaf },
          { label: 'Campus CO₂ Avoided', value: '73.4 t', sub: '/year from 70 kWp system', color: 'text-purple-400', icon: Leaf },
        ].map(({ label, value, sub, color, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="glass-card p-4 rounded-xl border border-border flex items-start gap-3"
          >
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`font-mono text-lg font-bold ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xs text-muted-foreground text-center py-2"
      >
        Data sourced from IEA World Energy Balances 2024, MNRE Annual Report 2023–24, and campus Green Audit report (PHY2100 Field Study)
      </motion.div>
    </div>
  );
}
