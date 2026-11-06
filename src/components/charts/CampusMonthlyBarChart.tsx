'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { campusMonthlyData } from '@/data/campus-audit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm min-w-44">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="text-foreground font-mono font-medium">{p.value?.toLocaleString('en-IN')} kWh</span>
        </div>
      ))}
    </div>
  );
};

export default function CampusMonthlyBarChart() {
  const data = campusMonthlyData.map((d) => ({
    month: d.monthShort,
    'TANGEDCO Grid': d.tangedcoImport,
    'Solar PV': d.solarGeneration,
    'Wind': d.windGeneration,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          label={{ value: 'kWh', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6B7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ fontSize: 11, color: '#9CA3AF' }}>{value}</span>}
          wrapperStyle={{ paddingTop: 12 }}
        />
        <Bar dataKey="TANGEDCO Grid" fill="#6B7280" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Solar PV" fill="#F97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Wind" fill="#06B6D4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
