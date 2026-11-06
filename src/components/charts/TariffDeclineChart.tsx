'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  Area, AreaChart,
} from 'recharts';
import { tariffTimeline, keyMilestones } from '@/data/tariff-timeline';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const milestone = keyMilestones.find((m) => m.year === label);
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm max-w-64">
      <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-orange-400 font-mono font-bold">₹{payload[0]?.value?.toFixed(2)}</span>
        <span className="text-muted-foreground">per kWh</span>
      </div>
      {payload[0]?.payload?.project && (
        <p className="text-xs text-muted-foreground mt-1">{payload[0].payload.project}</p>
      )}
      {milestone && (
        <p className="text-xs text-orange-300 mt-1.5 border-t border-border pt-1.5">{milestone.event}</p>
      )}
    </div>
  );
};

export default function TariffDeclineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={tariffTimeline} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="tariffGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#F97316" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
          tickFormatter={(v) => `₹${v}`}
          domain={[1, 7]}
          label={{ value: '₹/kWh', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6B7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={2} stroke="rgba(34,197,94,0.4)" strokeDasharray="4 4"
          label={{ value: '₹2/kWh threshold', fontSize: 10, fill: '#22C55E', position: 'right' }} />
        <Area
          type="monotone"
          dataKey="tariff"
          stroke="#F97316"
          strokeWidth={2.5}
          fill="url(#tariffGrad)"
          dot={{ r: 4, fill: '#F97316', strokeWidth: 0 }}
          activeDot={{ r: 7, fill: '#F97316', strokeWidth: 2, stroke: '#FCD34D' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
