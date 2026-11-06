'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  gradient: 'solar' | 'blue' | 'green' | 'purple';
  delay?: number;
  description?: string;
}

const gradientMap = {
  solar:  'kpi-gradient-solar border-orange-500/20',
  blue:   'kpi-gradient-blue border-blue-500/20',
  green:  'kpi-gradient-green border-green-500/20',
  purple: 'kpi-gradient-purple border-purple-500/20',
};

const iconBgMap = {
  solar:  'bg-orange-500/20 text-orange-400',
  blue:   'bg-blue-500/20 text-blue-400',
  green:  'bg-green-500/20 text-green-400',
  purple: 'bg-purple-500/20 text-purple-400',
};

export default function KPICard({
  title, value, unit, change, changeLabel, icon, gradient, delay = 0, description,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 glass-card cursor-default',
        gradientMap[gradient]
      )}
    >
      {/* Background glow orb */}
      <div
        className={cn(
          'absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20',
          gradient === 'solar' && 'bg-orange-400',
          gradient === 'blue'  && 'bg-blue-400',
          gradient === 'green' && 'bg-green-400',
          gradient === 'purple'&& 'bg-purple-400',
        )}
      />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground leading-tight">{title}</p>
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', iconBgMap[gradient])}>
            {icon}
          </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl font-bold font-mono text-foreground tracking-tight">{value}</span>
          {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}

        {/* Change indicator */}
        {change !== undefined && (
          <div className="flex items-center gap-1.5">
            {isPositive && <TrendingUp className="w-3.5 h-3.5 text-green-400" />}
            {isNegative && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
            {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5 text-muted-foreground" />}
            <span
              className={cn(
                'text-xs font-semibold',
                isPositive && 'text-green-400',
                isNegative && 'text-red-400',
                !isPositive && !isNegative && 'text-muted-foreground'
              )}
            >
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
