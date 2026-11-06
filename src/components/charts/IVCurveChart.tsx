'use client';

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { PVCurvePoint } from '@/lib/pv-physics';

interface IVCurveChartProps {
  data: PVCurvePoint[];
  pmax: number;
  vmp: number;
  imp: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs text-muted-foreground mb-1.5">V = {Number(label).toFixed(2)} V</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-mono font-semibold text-foreground">
            {p.value?.toFixed(3)} {p.name === 'Current (A)' ? 'A' : 'W'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function IVCurveChart({ data, pmax, vmp, imp }: IVCurveChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="voltage"
          type="number"
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -2, style: { fontSize: 11, fill: '#6B7280' } }}
        />
        <YAxis
          yAxisId="current"
          orientation="left"
          tick={{ fontSize: 11, fill: '#F97316' }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Current (A)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#F97316' } }}
        />
        <YAxis
          yAxisId="power"
          orientation="right"
          tick={{ fontSize: 11, fill: '#22C55E' }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Power (W)', angle: 90, position: 'insideRight', style: { fontSize: 11, fill: '#22C55E' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ fontSize: 11, color: '#9CA3AF' }}>{value}</span>}
          wrapperStyle={{ paddingTop: 12 }}
        />
        {/* I-V Curve */}
        <Line
          yAxisId="current"
          type="monotone"
          dataKey="current"
          name="Current (A)"
          stroke="#F97316"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
        />
        {/* P-V Curve */}
        <Line
          yAxisId="power"
          type="monotone"
          dataKey="power"
          name="Power (W)"
          stroke="#22C55E"
          strokeWidth={2}
          dot={false}
          strokeDasharray="6 2"
          activeDot={{ r: 5 }}
        />
        {/* MPP Marker */}
        <ReferenceDot
          yAxisId="current"
          x={vmp}
          y={imp}
          r={7}
          fill="#FBBF24"
          stroke="#F97316"
          strokeWidth={2}
          label={{ value: 'MPP', position: 'top', fontSize: 11, fill: '#FBBF24' }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
