'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { ieaEnergySupply, energySourceColors } from '@/data/iea-energy-supply';

const sources = ['solar', 'wind', 'hydro', 'nuclear', 'biofuels', 'naturalGas', 'oil', 'coal'];

const sourceLabels: Record<string, string> = {
  solar: 'Solar PV',
  wind: 'Wind',
  hydro: 'Hydro',
  nuclear: 'Nuclear',
  biofuels: 'Biofuels/Waste',
  naturalGas: 'Natural Gas',
  oil: 'Oil',
  coal: 'Coal',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum: number, p: { value: number }) => sum + (p.value || 0), 0);
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm min-w-48">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      {payload.slice().reverse().map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{sourceLabels[p.name] || p.name}</span>
          </div>
          <span className="text-foreground font-mono font-medium">{p.value?.toFixed(1)} EJ</span>
        </div>
      ))}
      <div className="border-t border-border mt-1.5 pt-1.5 flex justify-between text-xs">
        <span className="text-muted-foreground">Total</span>
        <span className="text-foreground font-mono font-semibold">{total.toFixed(1)} EJ</span>
      </div>
    </div>
  );
};

export default function EnergySupplyAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={ieaEnergySupply} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <defs>
          {sources.map((src) => (
            <linearGradient key={src} id={`grad-${src}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={energySourceColors[src]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={energySourceColors[src]} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground, #6B7280)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground, #6B7280)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}`}
          label={{ value: 'EJ', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6B7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ fontSize: 11, color: '#9CA3AF' }}>{sourceLabels[value] || value}</span>}
          wrapperStyle={{ paddingTop: 12 }}
        />
        {sources.map((src) => (
          <Area
            key={src}
            type="monotone"
            dataKey={src}
            stackId="1"
            stroke={energySourceColors[src]}
            fill={`url(#grad-${src})`}
            strokeWidth={1.5}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
