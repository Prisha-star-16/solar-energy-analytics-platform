'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { governmentSchemes } from '@/data/government-schemes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const scheme = payload[0]?.payload;
  return (
    <div className="bg-card/95 border border-border rounded-xl p-3 shadow-xl backdrop-blur-sm max-w-64">
      <p className="text-sm font-semibold text-foreground mb-1">{scheme.name}</p>
      <p className="text-xs text-muted-foreground mb-2">{scheme.fullName}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Target</p>
          <p className="text-foreground font-mono font-semibold">{scheme.targetGW} GW</p>
        </div>
        <div>
          <p className="text-muted-foreground">Achieved</p>
          <p className="font-mono font-semibold" style={{ color: scheme.color }}>{scheme.achievedGW} GW</p>
        </div>
        <div>
          <p className="text-muted-foreground">Progress</p>
          <p className="text-foreground font-mono font-semibold">
            {((scheme.achievedGW / scheme.targetGW) * 100).toFixed(0)}%
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Budget</p>
          <p className="text-foreground font-mono text-xs">{scheme.budget}</p>
        </div>
      </div>
    </div>
  );
};

export default function GovernmentSchemeChart() {
  const data = governmentSchemes.map((s) => ({
    ...s,
    progress: +((s.achievedGW / s.targetGW) * 100).toFixed(1),
    remaining: +(100 - (s.achievedGW / s.targetGW) * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
        barSize={16}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="progress" radius={[0, 4, 4, 0]} stackId="a">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <LabelList
            dataKey="progress"
            position="right"
            formatter={(v: any) => `${v}%`}
            style={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'monospace' }}
          />
        </Bar>
        <Bar dataKey="remaining" radius={[0, 4, 4, 0]} fill="rgba(255,255,255,0.05)" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
