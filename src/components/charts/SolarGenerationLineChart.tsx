'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { solarGenerationData, regionColors } from '@/data/solar-generation';

const regions = ['china', 'usa', 'eu', 'india', 'restOfWorld'];
const regionLabels: Record<string, string> = {
  china: 'China', usa: 'United States', eu: 'European Union', india: 'India', restOfWorld: 'Rest of World',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const globalPt = solarGenerationData.find((d) => d.year === label);
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm min-w-44">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{regionLabels[p.name]}</span>
          </div>
          <span className="text-foreground font-mono font-medium">{p.value?.toFixed(0)} TWh</span>
        </div>
      ))}
      {globalPt && (
        <div className="border-t border-border mt-1.5 pt-1.5 flex justify-between text-xs">
          <span className="text-orange-400 font-medium">Global Total</span>
          <span className="text-orange-300 font-mono font-semibold">{globalPt.global.toFixed(0)} TWh</span>
        </div>
      )}
    </div>
  );
};

export default function SolarGenerationLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={solarGenerationData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}
          label={{ value: 'TWh', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6B7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ fontSize: 11, color: '#9CA3AF' }}>{regionLabels[value]}</span>}
          wrapperStyle={{ paddingTop: 12 }}
        />
        <ReferenceLine x={2015} stroke="rgba(249,115,22,0.3)" strokeDasharray="4 4" label={{ value: 'Paris Agreement', fontSize: 10, fill: '#F97316', position: 'top' }} />
        {regions.map((r) => (
          <Line
            key={r}
            type="monotone"
            dataKey={r}
            stroke={regionColors[r]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
