'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Moon,
  Sun,
  Bell,
  Download,
  ChevronRight,
  Search,
  Command,
  X,
  Zap,
  BarChart3,
  Calculator,
  Building2,
  Wrench,
  ScrollText,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const breadcrumbMap: Record<string, string[]> = {
  '/dashboard/overview': ['Dashboard', 'Executive Overview'],
  '/dashboard/fundamentals': ['Dashboard', 'PV Fundamentals'],
  '/dashboard/system-design': ['Dashboard', 'System Design'],
  '/dashboard/campus-audit': ['Dashboard', 'Campus Audit'],
  '/dashboard/operations': ['Dashboard', 'O&M Skills'],
  '/dashboard/policies': ['Dashboard', 'Policies & Regulations'],
  '/dashboard/conclusion': ['Dashboard', 'Conclusion'],
};

const searchablePages = [
  { label: 'Executive Overview', desc: 'KPIs, IEA Energy Supply, Global Solar PV Growth', href: '/dashboard/overview', icon: BarChart3, badge: 'Overview' },
  { label: 'PV Fundamentals & I-V Curve Generator', desc: 'Single-diode Shockley simulation, Fill Factor, Technology comparison', href: '/dashboard/fundamentals', icon: Zap, badge: 'Physics' },
  { label: 'Performance Ratio (PR) Calculator', desc: 'IEC 61724-1 formula, Radial Gauge, Loss breakdown', href: '/dashboard/system-design', icon: Calculator, badge: 'Calculator' },
  { label: 'Array Sizing & Inverter Matching', desc: 'DC/AC oversizing ratio, string configuration, annual yield', href: '/dashboard/system-design', icon: Calculator, badge: 'Calculator' },
  { label: 'Campus Field Trip & Green Audit', desc: '50kW + 20kW Rooftop arrays, TANGEDCO vs Solar, Inverter inspection log', href: '/dashboard/campus-audit', icon: Building2, badge: 'Audit' },
  { label: 'Field Visit Photo Gallery', desc: '5 verified inspection photos: Rooftop array, Inverter room, Net meter, Thermal IR', href: '/dashboard/campus-audit', icon: Building2, badge: 'Gallery' },
  { label: 'Predictive Maintenance Matrix', desc: 'IEC 62446 checklist: Module cleaning, torque checks, earth resistance', href: '/dashboard/operations', icon: Wrench, badge: 'O&M' },
  { label: 'Voc / Isc Anomaly Diagnostics', desc: 'Decision tree for cell cracking, bypass diode shorts, ground faults', href: '/dashboard/operations', icon: Wrench, badge: 'Diagnostics' },
  { label: 'Tariff Bidding & Historical Deflation', desc: 'Section 63 Electricity Act 2003, ₹6.47 to ₹1.99/kWh decline', href: '/dashboard/policies', icon: ScrollText, badge: 'Policy' },
  { label: 'Government Solar Schemes Tracker', desc: 'PM-KUSUM, Rooftop Solar Phase II, Solar Parks, ISTS waivers', href: '/dashboard/policies', icon: ScrollText, badge: 'Schemes' },
  { label: 'Conclusion & Reference Repository', desc: '5 Core takeaways, IEA, MNRE, ISA citation hub, syllabus mapping', href: '/dashboard/conclusion', icon: BookOpen, badge: 'Repository' },
];

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const crumbs = breadcrumbMap[pathname] ?? ['Dashboard'];

  const filteredPages = searchablePages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase()) ||
    p.desc.toLowerCase().includes(query.toLowerCase()) ||
    p.badge.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-2.5 border-b border-border bg-card/60 backdrop-blur-xl">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm">
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />}
                <span
                  className={cn(
                    i === crumbs.length - 1
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground transition-colors'
                  )}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        </div>

        {/* Center: Search / Command Palette Trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border/70 bg-muted/30 hover:bg-muted/60 text-xs text-muted-foreground hover:text-foreground transition-all w-64 lg:w-80 group shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
          <span className="flex-1 text-left">Quick Search & Navigation...</span>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono font-medium text-muted-foreground">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Live Solar Telemetry Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
            <span className="text-orange-400 font-semibold">982 W/m²</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-foreground">28.5°C</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-emerald-400 font-semibold">68.4 kW Active</span>
          </div>

          {/* Live clock */}
          {mounted && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/40 font-mono text-xs text-muted-foreground border border-border/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {currentTime}
            </div>
          )}

          {/* Print / Export Report */}
          <button
            onClick={() => window.print()}
            title="Print / Save PDF Report"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/40 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Report</span>
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          )}

          {/* Course badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span className="text-xs font-mono font-bold text-orange-400">PHY2100</span>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-muted/20">
                <Search className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search topics, calculators, data, or schemes..."
                  autoFocus
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Results List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.label}
                        onClick={() => navigateTo(page.href)}
                        className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/15 transition-colors">
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground group-hover:text-orange-400 transition-colors truncate">
                              {page.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{page.desc}</p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground uppercase flex-shrink-0">
                          {page.badge}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No results found for &quot;{query}&quot;.
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Navigate directly across all 7 field report sections</span>
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono">
                  ESC to close
                </kbd>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
