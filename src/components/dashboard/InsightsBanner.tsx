'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap, TrendingDown, Globe, Leaf } from 'lucide-react';

const insights = [
  { icon: Globe, text: 'Solar PV surpassed 2,000 TWh global generation in 2024 — a 26× increase since 2010' },
  { icon: TrendingDown, text: 'India solar tariff dropped from ₹6.47/kWh (2010) to ₹1.99/kWh (2021) — a 69% decline' },
  { icon: Zap, text: 'Campus rooftop system avoids 73.4 tonnes of CO₂ annually — equivalent to 32 cars off road' },
  { icon: Leaf, text: 'Renewables share of global electricity generation reached 30.3% in 2023, up from 21% in 2015' },
  { icon: Globe, text: 'China leads global solar with 850 TWh (2024), followed by USA (310 TWh) and EU (290 TWh)' },
  { icon: Zap, text: 'India targets 500 GW renewable capacity by 2030 — requiring 50 GW/year additions' },
  { icon: Leaf, text: 'PM-KUSUM scheme aims to solarize 34.2 GW for farmers, reducing diesel pump dependence by 90%' },
  { icon: TrendingDown, text: 'Solar LCOE fell below coal in India by 2017 — now the cheapest source of new electricity' },
];

export default function InsightsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
        setIsVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentIndex];
  const Icon = insight.icon;

  return (
    <div className="relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/8 via-amber-500/5 to-orange-500/8 px-5 py-3">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-orange-400" />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex-shrink-0">
            Global Insight
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <div
            className="flex items-center gap-2 transition-all duration-400 overflow-hidden"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}
          >
            <Icon className="w-3.5 h-3.5 text-orange-300 flex-shrink-0" />
            <p className="text-sm text-foreground/90 truncate">{insight.text}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1 flex-shrink-0">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-orange-400 w-4' : 'bg-orange-400/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
